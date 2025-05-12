"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#000814")

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

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64)
    const earthMaterial = new THREE.MeshBasicMaterial({
      color: "#1a237e",
      wireframe: true,
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)

    // Create connection points (cities)
    const cities: THREE.Vector3[] = []
    const cityCount = 20
    const cityMeshes: THREE.Mesh[] = []

    for (let i = 0; i < cityCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / cityCount)
      const theta = Math.sqrt(cityCount * Math.PI) * phi

      const x = 2 * Math.sin(phi) * Math.cos(theta)
      const y = 2 * Math.sin(phi) * Math.sin(theta)
      const z = 2 * Math.cos(phi)

      cities.push(new THREE.Vector3(x, y, z))

      // Add point at city location
      const pointGeometry = new THREE.SphereGeometry(0.03, 16, 16)
      const pointMaterial = new THREE.MeshBasicMaterial({ color: "#4fc3f7" })
      const point = new THREE.Mesh(pointGeometry, pointMaterial)
      point.position.set(x, y, z)
      scene.add(point)
      cityMeshes.push(point)
    }

    // Create connections between cities
    const connectionCount = 30
    const connections: THREE.Line[] = []
    const connectionData: { curve: THREE.QuadraticBezierCurve3; progress: number; speed: number }[] = []

    for (let i = 0; i < connectionCount; i++) {
      const cityA = cities[Math.floor(Math.random() * cities.length)]
      const cityB = cities[Math.floor(Math.random() * cities.length)]

      if (cityA !== cityB) {
        // Create a curved line between points
        const midPoint = new THREE.Vector3().addVectors(cityA, cityB).multiplyScalar(0.5)
        const distance = cityA.distanceTo(cityB)
        midPoint.normalize().multiplyScalar(2 + distance * 0.2)

        const curve = new THREE.QuadraticBezierCurve3(cityA, midPoint, cityB)

        // Create initial line with partial points
        const lineGeometry = new THREE.BufferGeometry()
        const lineMaterial = new THREE.LineBasicMaterial({
          color: "#4fc3f7",
          transparent: true,
          opacity: 0.4,
        })
        const line = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(line)
        connections.push(line)

        // Store curve data for animation
        connectionData.push({
          curve,
          progress: Math.random(), // Start at random progress
          speed: 0.001 + Math.random() * 0.002, // Random speed
        })
      }
    }

    // Create data packets that travel along connections
    const packetGeometry = new THREE.SphereGeometry(0.02, 8, 8)
    const packetMaterial = new THREE.MeshBasicMaterial({ color: "#ffffff" })
    const packets: { mesh: THREE.Mesh; connectionIndex: number; progress: number; speed: number }[] = []

    for (let i = 0; i < 15; i++) {
      const packet = new THREE.Mesh(packetGeometry, packetMaterial)
      const connectionIndex = Math.floor(Math.random() * connectionData.length)

      if (connectionData[connectionIndex]) {
        const progress = Math.random()
        const point = connectionData[connectionIndex].curve.getPoint(progress)
        packet.position.copy(point)

        scene.add(packet)
        packets.push({
          mesh: packet,
          connectionIndex,
          progress,
          speed: 0.005 + Math.random() * 0.01,
        })
      }
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Add stars
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 1000
    const starPositions = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 100
      starPositions[i + 1] = (Math.random() - 0.5) * 100
      starPositions[i + 2] = (Math.random() - 0.5) * 100
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5, // set a fixed size
      sizeAttenuation: true,
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let intersectedObject: THREE.Object3D | null = null

    const onMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera)

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(cityMeshes)

      // Reset previous intersected object
      if (intersectedObject) {
        ; (intersectedObject as THREE.Mesh).scale.set(1, 1, 1)
        intersectedObject = null
      }

      // Handle new intersections
      if (intersects.length > 0) {
        intersectedObject = intersects[0].object
        intersectedObject.scale.set(2, 2, 2)
      }
    }

    window.addEventListener("mousemove", onMouseMove)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Rotate earth
      earth.rotation.y += 0.001

      // Animate city points (subtle pulsing)
      cityMeshes.forEach((city, index) => {
        const scale = 1 + 0.2 * Math.sin(elapsedTime * 2 + index)
        city.scale.set(scale, scale, scale)
      })

      // Animate connections
      connectionData.forEach((connection, index) => {
        // Update progress
        connection.progress += connection.speed
        if (connection.progress > 1) connection.progress = 0

        // Get points along the curve based on current progress
        const points = []
        for (let i = 0; i <= connection.progress; i += 0.01) {
          points.push(connection.curve.getPoint(i))
        }

        // Update line geometry
        connections[index].geometry.dispose()
        connections[index].geometry = new THREE.BufferGeometry().setFromPoints(points)
      })

      // Animate packets
      packets.forEach((packet) => {
        packet.progress += packet.speed
        if (packet.progress > 1) packet.progress = 0

        if (connectionData[packet.connectionIndex]) {
          const point = connectionData[packet.connectionIndex].curve.getPoint(packet.progress)
          packet.mesh.position.copy(point)
        }
      })

      // Animate stars (subtle twinkling)
      starMaterial.size = 0.5 + 0.2 * Math.sin(elapsedTime)

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
      window.removeEventListener("mousemove", onMouseMove)

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose geometries and materials
      earthGeometry.dispose()
      earthMaterial.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
      packetGeometry.dispose()
      packetMaterial.dispose()

      cityMeshes.forEach((mesh) => {
        mesh.geometry.dispose()
          ; (mesh.material as THREE.Material).dispose()
      })

      connections.forEach((connection) => {
        connection.geometry.dispose()
          ; (connection.material as THREE.Material).dispose()
      })

      packets.forEach((packet) => {
        packet.mesh.geometry.dispose()
          ; (packet.mesh.material as THREE.Material).dispose()
      })
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}