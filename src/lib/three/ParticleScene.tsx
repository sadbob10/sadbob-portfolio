import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleScene(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)

    // ── Scene & Camera ──
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      70,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      200
    )
    camera.position.z = 32

    // ── Galaxy Particles ──
    const COUNT = 2200
    const pos   = new Float32Array(COUNT * 3)
    const col   = new Float32Array(COUNT * 3)

    const palette: THREE.Color[] = [
      new THREE.Color('#00e5ff'),
      new THREE.Color('#a259ff'),
      new THREE.Color('#f72585'),
      new THREE.Color('#eef2ff'),
      new THREE.Color('#7b61ff'),
    ]

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 12 + Math.pow(Math.random(), 0.5) * 28

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi) - 10

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3))

    const pMat = new THREE.PointsMaterial({
      size: 0.13,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ── Floating Wireframe Shapes ──
    interface ShapeDef {
      geo: THREE.BufferGeometry
      color: string
      x: number
      y: number
      z: number
    }

    const shapeDefs: ShapeDef[] = [
      { geo: new THREE.IcosahedronGeometry(3.5, 0), color: '#00e5ff', x:  14, y:  4,  z:  -8 },
      { geo: new THREE.OctahedronGeometry(2.5,  0), color: '#a259ff', x: -16, y: -3,  z:  -6 },
      { geo: new THREE.TetrahedronGeometry(3,    0), color: '#f72585', x:   8, y: -8,  z: -12 },
      { geo: new THREE.IcosahedronGeometry(1.8,  0), color: '#7b61ff', x:  -8, y:  9,  z:  -5 },
      { geo: new THREE.OctahedronGeometry(1.4,   0), color: '#00e5ff', x:   2, y: -12, z:  -3 },
    ]

    const shapes: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>[] = []

    shapeDefs.forEach(({ geo, color, x, y, z }) => {
      const mat  = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.10,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, y, z)
      scene.add(mesh)
      shapes.push(mesh)
    })

    // ── Torus Rings ──
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(18, 0.04, 2, 80),
      new THREE.MeshBasicMaterial({ color: '#a259ff', transparent: true, opacity: 0.06 })
    )
    ring1.rotation.x = Math.PI / 2.8
    scene.add(ring1)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(22, 0.04, 2, 80),
      new THREE.MeshBasicMaterial({ color: '#00e5ff', transparent: true, opacity: 0.04 })
    )
    ring2.rotation.x = Math.PI / 3.5
    ring2.rotation.z = 0.4
    scene.add(ring2)

    // ── Mouse Parallax ──
    interface Mouse { x: number; y: number; tx: number; ty: number }
    const mouse: Mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const onMove = (e: MouseEvent): void => {
      mouse.tx =  (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    // ── Resize ──
    const onResize = (): void => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // ── Animation Loop ──
    let raf: number
    let t = 0

    const animate = (): void => {
      raf = requestAnimationFrame(animate)
      t  += 0.004

      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04

      particles.rotation.y =  t * 0.06 + mouse.x * 0.18
      particles.rotation.x = -mouse.y  * 0.08

      shapes.forEach((s, i) => {
        s.rotation.x       += 0.0025 + i * 0.001
        s.rotation.y       += 0.004  + i * 0.0015
        s.position.y       += Math.sin(t * 0.9 + i * 1.3) * 0.012
        s.material.opacity  = 0.07   + Math.sin(t + i)    * 0.04
      })

      ring1.rotation.z =  t * 0.04
      ring2.rotation.z = -t * 0.03

      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.025
      camera.position.y += (mouse.y * 1.8 - camera.position.y) * 0.025
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
      }}
    />
  )
}