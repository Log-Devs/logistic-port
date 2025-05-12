"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#f5f5f5")

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = 0.5

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(2, 32, 32)
    const earthMaterial = new THREE.MeshBasicMaterial({
      color: "#e0f2fe",
      wireframe: false,
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)

    // Create continents (simplified)
    const continentGeometry = new THREE.SphereGeometry(2.01, 32, 32)
    const continentMaterial = new THREE.MeshBasicMaterial({
      color: "#0ea5e9",
      wireframe: false,
    })
    const continents = new THREE.Mesh(continentGeometry, continentMaterial)

    // Create a pattern for continents (simplified representation)
    const continentPattern = [
      { lat: 40, lng: -100, radius: 0.8 }, // North America
      { lat: 10, lng: -70, radius: 0.6 }, // South America
      { lat: 50, lng: 10, radius: 0.5 }, // Europe
      { lat: 10, lng: 20, radius: 0.7 }, // Africa
      { lat: 30, lng: 100, radius: 0.9 }, // Asia
      { lat: -25, lng: 135, radius: 0.5 }, // Australia
    ]

    // Apply the pattern by creating "holes" in the continent mesh
    continentPattern.forEach(({ lat, lng, radius }) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)

      const x = -2 * Math.sin(phi) * Math.cos(theta)
      const z = 2 * Math.sin(phi) * Math.sin(theta)
      const y = 2 * Math.cos(phi)

      const landGeometry = new THREE.CircleGeometry(radius, 32)
      const landMaterial = new THREE.MeshBasicMaterial({ color: "#22c55e" })
      const land = new THREE.Mesh(landGeometry, landMaterial)

      land.position.set(x, y, z)
      land.lookAt(0, 0, 0)
      scene.add(land)
    })

    // Add office location marker
    const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16)
    const markerMaterial = new THREE.MeshBasicMaterial({ color: "#ef4444" })
    const marker = new THREE.Mesh(markerGeometry, markerMaterial)

    // Position marker at a specific location (example: New York)
    const markerLat = 40.7128
    const markerLng = -74.006
    const markerPhi = (90 - markerLat) * (Math.PI / 180)
    const markerTheta = (markerLng + 180) * (Math.PI / 180)

    const markerX = -2.1 * Math.sin(markerPhi) * Math.cos(markerTheta)
    const markerZ = 2.1 * Math.sin(markerPhi) * Math.sin(markerTheta)
    const markerY = 2.1 * Math.cos(markerPhi)

    marker.position.set(markerX, markerY, markerZ)
    scene.add(marker)

    // Add pulse effect around marker
    const pulseGeometry = new THREE.CircleGeometry(0.1, 32)
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: "#ef4444",
      transparent: true,
      opacity: 0.6,
    })
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial)

    pulse.position.copy(marker.position)
    pulse.lookAt(0, 0, 0)
    scene.add(pulse)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate earth
      earth.rotation.y += 0.001

      // Pulse effect
      const time = Date.now() * 0.001
      pulse.scale.x = 1 + 0.2 * Math.sin(time * 2)
      pulse.scale.y = 1 + 0.2 * Math.sin(time * 2)

      // Update controls
      controls.update()

      // Render scene
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose geometries and materials
      earthGeometry.dispose()
      earthMaterial.dispose()
      continentGeometry.dispose()
      continentMaterial.dispose()
      markerGeometry.dispose()
      markerMaterial.dispose()
      pulseGeometry.dispose()
      pulseMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
