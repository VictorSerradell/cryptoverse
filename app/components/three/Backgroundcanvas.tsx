"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 30;

    // Nodes
    const NODES = 120;
    const nodeGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(NODES * 3);
    const nodeData: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
    }[] = [];

    for (let i = 0; i < NODES; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 40;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      nodeData.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.01,
      });
    }

    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.3,
      transparent: true,
      opacity: 0.7,
    });
    scene.add(new THREE.Points(nodeGeo, nodeMat));

    // Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.07,
    });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    function updateLines() {
      lineGroup.clear();
      for (let i = 0; i < NODES; i++) {
        for (let j = i + 1; j < NODES; j++) {
          const dx = nodeData[i].x - nodeData[j].x;
          const dy = nodeData[i].y - nodeData[j].y;
          const dz = nodeData[i].z - nodeData[j].z;
          if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 15) {
            const geo = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(nodeData[i].x, nodeData[i].y, nodeData[i].z),
              new THREE.Vector3(nodeData[j].x, nodeData[j].y, nodeData[j].z),
            ]);
            lineGroup.add(new THREE.Line(geo, lineMat));
          }
        }
      }
    }

    let mouseX = 0,
      mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    let frame = 0;
    let rafId: number;

    function animate() {
      rafId = requestAnimationFrame(animate);
      frame++;

      for (let i = 0; i < NODES; i++) {
        nodeData[i].x += nodeData[i].vx;
        nodeData[i].y += nodeData[i].vy;
        nodeData[i].z += nodeData[i].vz;
        if (Math.abs(nodeData[i].x) > 40) nodeData[i].vx *= -1;
        if (Math.abs(nodeData[i].y) > 30) nodeData[i].vy *= -1;
        if (Math.abs(nodeData[i].z) > 20) nodeData[i].vz *= -1;
        positions[i * 3] = nodeData[i].x;
        positions[i * 3 + 1] = nodeData[i].y;
        positions[i * 3 + 2] = nodeData[i].z;
      }
      nodeGeo.attributes.position.needsUpdate = true;
      if (frame % 20 === 0) updateLines();

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    updateLines();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
