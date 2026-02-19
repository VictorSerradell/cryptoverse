"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function OrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(360, 320);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 360 / 320, 0.1, 100);
    camera.position.z = 5;

    // Core orb
    const orbMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 3),
      new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        emissive: 0x3730a3,
        specular: 0xa855f7,
        shininess: 80,
        transparent: true,
        opacity: 0.85,
      }),
    );
    scene.add(orbMesh);

    // Wireframe
    const wireMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.22, 3),
      new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    );
    scene.add(wireMesh);

    // Orbiting coins
    const coinConfigs = [
      { color: 0xf59e0b, angle: 0, speed: 0.005, radius: 2.0 },
      { color: 0x8b5cf6, angle: 1.26, speed: 0.006, radius: 2.4 },
      { color: 0x06b6d4, angle: 2.51, speed: 0.007, radius: 2.0 },
      { color: 0x10b981, angle: 3.77, speed: 0.008, radius: 2.4 },
      { color: 0xec4899, angle: 5.03, speed: 0.009, radius: 2.0 },
    ];
    const coins = coinConfigs.map(({ color, angle, speed, radius }) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 16, 16),
        new THREE.MeshPhongMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.4,
        }),
      );
      scene.add(mesh);
      return { mesh, angle, speed, radius };
    });

    // Lights
    scene.add(new THREE.AmbientLight(0x404060, 0.5));
    const light1 = new THREE.PointLight(0x6366f1, 2, 20);
    light1.position.set(3, 3, 3);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xec4899, 1, 20);
    light2.position.set(-3, -2, 2);
    scene.add(light2);

    let orbMouseX = 0,
      orbMouseY = 0;
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      orbMouseX = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 2;
      orbMouseY = (-(e.clientY - rect.top - rect.height / 2) / rect.height) * 2;
    };
    canvas.parentElement?.addEventListener("mousemove", onMouse);

    let rafId: number;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;

      orbMesh.rotation.y = t * 0.3 + orbMouseX * 0.5;
      orbMesh.rotation.x = t * 0.1 + orbMouseY * 0.2;
      wireMesh.rotation.y = -t * 0.15;
      wireMesh.rotation.x = t * 0.08;

      coins.forEach((c) => {
        c.angle += c.speed;
        c.mesh.position.set(
          Math.cos(c.angle) * c.radius,
          Math.sin(c.angle * 0.6) * 0.5,
          Math.sin(c.angle) * c.radius,
        );
      });

      light1.position.x = Math.cos(t * 0.5) * 4;
      light1.position.z = Math.sin(t * 0.5) * 4;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.parentElement?.removeEventListener("mousemove", onMouse);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-full"
      style={{ filter: "drop-shadow(0 0 40px rgba(99,102,241,0.3))" }}
    />
  );
}
