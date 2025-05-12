"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function LoginScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#0f172a")

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    // Create particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: "#ffffff",
      transparent: true,
      opacity: 0.8,
    })

    // Create particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Create lines connecting particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.2,
    })

    const linesGeometry = new THREE.BufferGeometry()
    const linesPositions = []
    const linesCount = 100

    for (let i = 0; i < linesCount; i++) {
      const startIndex = Math.floor(Math.random() * particlesCount)
      const endIndex = Math.floor(Math.random() * particlesCount)

      const startX = posArray[startIndex * 3]
      const startY = posArray[startIndex * 3 + 1]
      const startZ = posArray[startIndex * 3 + 2]

      const endX = posArray[endIndex * 3]
      const endY = posArray[endIndex * 3 + 1]
      const endZ = posArray[endIndex * 3 + 2]

      linesPositions.push(startX, startY, startZ)
      linesPositions.push(endX, endY, endZ)
    }

    linesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linesPositions, 3))
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.add(lines)

    // Create floating cubes
    const cubes = []
    const cubeCount = 20

    for (let i = 0; i < cubeCount; i++) {
      const size = Math.random() * 0.2 + 0.1
      const geometry = new THREE.BoxGeometry(size, size, size)
      const material = new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.2,
        wireframe: true,
      })

      const cube = new THREE.Mesh(geometry, material)

      cube.position.x = (Math.random() - 0.5) * 8
      cube.position.y = (Math.random() - 0.5) * 8
      cube.position.z = (Math.random() - 0.5) * 8

      cube.rotation.x = Math.random() * Math.PI
      cube.rotation.y = Math.random() * Math.PI

      scene.add(cube)
      cubes.push({
        mesh: cube,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: Math.random() * 0.005 + 0.002,
        floatOffset: Math.random() * Math.PI * 2,
      })
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate particle system
      particlesMesh.rotation.y += 0.0005

      // Animate cubes
      cubes.forEach((cube, i) => {
        cube.mesh.rotation.x += cube.rotationSpeed.x
        cube.mesh.rotation.y += cube.rotationSpeed.y

        // Float up and down
        cube.mesh.position.y += Math.sin(Date.now() * cube.floatSpeed + cube.floatOffset) * 0.001
      })

      // Update controls
      controls.update()

      // Render scene
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose geometries and materials
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      linesGeometry.dispose()
      linesMaterial.dispose()

      cubes.forEach((cube) => {
        cube.mesh.geometry.dispose()
        cube.mesh.material.dispose()
      })
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}
