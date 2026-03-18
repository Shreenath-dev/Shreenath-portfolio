"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Text } from "@react-three/drei";
import { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   PROCEDURAL IRON MAN BODY (Assembles on Unlock)
   ───────────────────────────────────────────── */
function ProceduralBody({ unlocked }: { unlocked: boolean }) {
  const bodyGroupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (bodyGroupRef.current) {
      // Body materializes out of the head when unlocked
      const targetScale = unlocked ? 1 : 0;
      bodyGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={bodyGroupRef} position={[0, -0.65, 0]}>
      {/* 1. Torso / Core Armor */}
      <mesh castShadow position={[0, -0.1, 0]}>
        <capsuleGeometry args={[0.25, 0.45, 16, 16]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Arc Reactor Centerpiece */}
      <mesh position={[0, 0.05, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} />
        <meshBasicMaterial color="#3a7bd5" />
        <pointLight color="#3a7bd5" intensity={1.5} distance={3} />
      </mesh>

      {/* 2. Shoulders & Arms (Sweeping backward for supersonic flight) */}
      <group position={[-0.35, 0.1, -0.1]} rotation={[Math.PI / 3, 0, Math.PI / 8]}>
        <mesh>
          <capsuleGeometry args={[0.1, 0.4, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Left Hand Repulsor Thruster */}
        <mesh position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial color="#3a7bd5" />
        </mesh>
      </group>

      <group position={[0.35, 0.1, -0.1]} rotation={[Math.PI / 3, 0, -Math.PI / 8]}>
        <mesh>
          <capsuleGeometry args={[0.1, 0.4, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Right Hand Repulsor Thruster */}
        <mesh position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial color="#3a7bd5" />
        </mesh>
      </group>

      {/* 3. Jetpack / Boot Thrusters */}
      <group position={[0, -0.4, -0.1]} rotation={[Math.PI / 12, 0, 0]}>
        {/* Left Leg */}
        <mesh position={[-0.15, -0.25, 0]}>
          <capsuleGeometry args={[0.12, 0.4, 16, 16]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.6} roughness={0.2} />
          {/* Flame Nozzle */}
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.15, 16]} />
            <meshBasicMaterial color="#f5a623" />
            <pointLight color="#f5a623" intensity={2} distance={4} />
          </mesh>
        </mesh>
        
        {/* Right Leg */}
        <mesh position={[0.15, -0.25, 0]}>
          <capsuleGeometry args={[0.12, 0.4, 16, 16]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.6} roughness={0.2} />
          {/* Flame Nozzle */}
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.15, 16]} />
            <meshBasicMaterial color="#f5a623" />
            <pointLight color="#f5a623" intensity={2} distance={4} />
          </mesh>
        </mesh>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────
   PROCEDURAL AI ROBOT (Floating Cyber Drone)
   ───────────────────────────────────────────── */
function AIRobotNode({ unlocked, initialPosition, onLock }: { unlocked: boolean, initialPosition: [number, number, number], onLock: () => void }) {
  const robotRef = useRef<THREE.Group>(null);
  const innerRobotRef = useRef<THREE.Group>(null);
  const eyePivotRef = useRef<THREE.Group>(null);
  const leftEarRef = useRef<THREE.Mesh>(null);
  const rightEarRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Independent roaming and tracking logic
  const wanderTarget = useRef(new THREE.Vector3());
  const lookAtTarget = useRef(new THREE.Vector3());
  const dummyObj = useRef(new THREE.Object3D());

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (robotRef.current && innerRobotRef.current) {
      if (!unlocked) {
        // LOCKED STATE: Upright anchor orientation with gentle hover
        robotRef.current.position.lerp(new THREE.Vector3(...initialPosition), 0.1);
        robotRef.current.position.y += Math.sin(t * 2) * 0.002;
        
        // Reset flight posture back to standing
        innerRobotRef.current.rotation.x = THREE.MathUtils.lerp(innerRobotRef.current.rotation.x, 0, 0.1);
        innerRobotRef.current.rotation.z = THREE.MathUtils.lerp(innerRobotRef.current.rotation.z, 0, 0.1);

        lookAtTarget.current.set(initialPosition[0], initialPosition[1], 5);
        robotRef.current.lookAt(lookAtTarget.current);
        
        robotRef.current.rotation.y += Math.sin(t * 0.8) * 0.2;
        robotRef.current.rotation.x += Math.cos(t * 0.5) * 0.15;
      } else {
        // FREEDOM STATE: Fluid Iron Man Flight 
        
        // Endless continuous flight algorithms spanning the Hero viewport
        wanderTarget.current.x = Math.sin(t * 0.4) * 6; 
        wanderTarget.current.y = Math.sin(t * 0.5) * 3 + Math.cos(t * 0.3) * 1.5; 
        wanderTarget.current.z = Math.sin(t * 0.6) * 1.5; 
        
        // Velocity extraction for dynamic banking
        const velocityX = wanderTarget.current.x - robotRef.current.position.x;

        robotRef.current.position.lerp(wanderTarget.current, 0.02);
        
        // Track the user cursor smoothly
        const pointerX = (state.pointer.x * state.viewport.width) / 2;
        const pointerY = (state.pointer.y * state.viewport.height) / 2;
        
        // Placed firmly behind the camera so the Drone permanently looks directly AT the user
        lookAtTarget.current.lerp(new THREE.Vector3(pointerX, pointerY, 8), 0.1);
        
        dummyObj.current.position.copy(robotRef.current.position);
        dummyObj.current.lookAt(lookAtTarget.current);
        robotRef.current.quaternion.slerp(dummyObj.current.quaternion, 0.05);

        // FLIGHT POSTURE DYNAMICS
        // Lean deeply forward into a horizontal flight posture
        innerRobotRef.current.rotation.x = THREE.MathUtils.lerp(innerRobotRef.current.rotation.x, Math.PI / 3, 0.05);
        // Bank / Barrel Roll dynamically left and right into corners based on X velocity
        innerRobotRef.current.rotation.z = THREE.MathUtils.lerp(innerRobotRef.current.rotation.z, velocityX * 0.25, 0.05);
      }
    }

    // Visor Scanner
    if (eyePivotRef.current) {
      const scanSpeed = unlocked ? 6 : 3;
      eyePivotRef.current.rotation.y = Math.sin(t * scanSpeed) * 0.45;
    }

    // Dynamic Antenna physics
    if (leftEarRef.current && rightEarRef.current) {
      leftEarRef.current.position.y = Math.cos(t * 2 + 1) * 0.06;
      rightEarRef.current.position.y = Math.cos(t * 2 + 2) * 0.06;
    }
  });

  return (
    <group 
      ref={robotRef} 
      scale={0.6} // Reduced scale down further
      onPointerDown={(e) => {
        if (unlocked) {
          e.stopPropagation();
          onLock();
          document.body.style.cursor = 'none';
        }
      }}
      onPointerOver={(e) => {
        if (unlocked) {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'crosshair';
        }
      }}
      onPointerOut={() => {
        if (unlocked) {
          setHovered(false);
          document.body.style.cursor = 'none';
        }
      }}
    >
      {/* Wrapper that handles the dynamic leaning flight posture without breaking mouse look tracking */}
      <group ref={innerRobotRef}>
        {/* === THE ROBOT HEAD MESHES === */}
        <mesh castShadow>
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.2} envMapIntensity={1.5} />
        </mesh>
        
        <mesh position={[0, 0.08, 0.18]} scale={[1.1, 0.5, 0.8]}>
          <sphereGeometry args={[0.42, 64, 64]} />
          <meshStandardMaterial color="#050505" metalness={1.0} roughness={0.0} envMapIntensity={2.0} />
        </mesh>
        
        <group ref={eyePivotRef}>
          <mesh position={[0, 0.08, 0.52]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.015, 0.15, 8, 16]} />
            <meshBasicMaterial color="#f5a623" />
            <pointLight color="#f5a623" intensity={0.5} distance={2} />
          </mesh>
        </group>
        
        <group position={[-0.6, 0, 0]}>
          <mesh ref={leftEarRef}>
            <capsuleGeometry args={[0.06, 0.25, 16, 16]} />
            <meshStandardMaterial color="#2a2a3a" metalness={0.9} roughness={0.2} />
            <mesh position={[0, 0.15, 0]}>
              <sphereGeometry args={[0.02]} />
              <meshBasicMaterial color={unlocked ? (hovered ? "#ff3333" : "#3a7bd5") : "#e8c84a"} />
            </mesh>
          </mesh>
        </group>
        
        <group position={[0.6, 0, 0]}>
          <mesh ref={rightEarRef}>
            <capsuleGeometry args={[0.06, 0.25, 16, 16]} />
            <meshStandardMaterial color="#2a2a3a" metalness={0.9} roughness={0.2} />
            <mesh position={[0, 0.15, 0]}>
              <sphereGeometry args={[0.02]} />
              <meshBasicMaterial color={unlocked ? (hovered ? "#ff3333" : "#3a7bd5") : "#e8c84a"} />
            </mesh>
          </mesh>
        </group>

        {/* Neck connector */}
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 0.2, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        
        {/* Neck Glow Ring */}
        <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.015, 16, 64]} />
          <meshBasicMaterial color={unlocked ? "#3a7bd5" : "#f5a623"} transparent opacity={0.8} />
          <pointLight color={unlocked ? "#3a7bd5" : "#e8c84a"} intensity={1.5} distance={4} />
        </mesh>

        {/* === THE ROBOT BODY (Transforms purely upon unlock) === */}
        <ProceduralBody unlocked={unlocked} />
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────
   CONTAINMENT TECH CAGE (Shell & Rings)
   ───────────────────────────────────────────── */
function ContainmentCage({ position, scale, unlocked, onHit }: { position: [number, number, number], scale: number, unlocked: boolean, onHit: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const shellCageRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      if (unlocked) {
        groupRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.15);
        groupRef.current.rotation.x += 0.05;
        groupRef.current.rotation.y += 0.05;
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
        groupRef.current.rotation.y = t * 0.1;
        groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.05;
      }
    }

    if (!unlocked) {
      if (shellCageRef.current) {
        shellCageRef.current.children[0].rotation.y = t * 0.2;
        shellCageRef.current.children[0].rotation.z = Math.sin(t * 0.1) * 0.1;
      }

      if (ringsRef.current) {
        ringsRef.current.children.forEach((ring, i) => {
          ring.rotation.x = Math.sin(t * 0.1 + i) * 0.3;
          ring.rotation.y = t * (0.15 + i * -0.1);
          if (hovered) {
             ring.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1);
          } else {
             ring.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          }
        });
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group 
        ref={groupRef} 
        position={position} 
        onPointerDown={(e) => {
           if (!unlocked) {
             e.stopPropagation();
             onHit();
             setHovered(false);
             document.body.style.cursor = 'none';
           }
        }}
        onPointerOver={(e) => {
           if (!unlocked) {
             e.stopPropagation();
             setHovered(true);
             document.body.style.cursor = 'crosshair';
           }
        }}
        onPointerOut={() => {
           if (!unlocked) {
             setHovered(false);
             document.body.style.cursor = 'none';
           }
        }}
      >
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} color="#ffffff" />
        </mesh>

        <group ref={shellCageRef}>
          <mesh>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshStandardMaterial
              color="#2a2a3a"
              emissive={hovered ? "#ff3333" : "#f5a623"}
              emissiveIntensity={hovered ? 0.4 : 0.15}
              metalness={1.0}
              roughness={0.15}
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>

        <group ref={ringsRef}>
          {[1.9, 2.6].map((radius, i) => (
            <mesh key={i} rotation={[Math.PI / 2 + i * 0.5, 0, 0]}>
              <torusGeometry args={[radius, 0.003, 16, 100]} />
              <meshBasicMaterial 
                color={hovered ? "#ff3333" : (i === 1 ? "#c8c8c8" : "#f5a623")} 
                transparent 
                opacity={0.35} 
              />
            </mesh>
          ))}
        </group>

        {hovered && !unlocked && (
          <Text 
            position={[0, -2.5, 0]} 
            fontSize={0.25} 
            color="#ff3333" 
            letterSpacing={0.2} 
          >
            [ CLICK TO UNLOCK ]
          </Text>
        )}
      </group>
    </Float>
  );
}

/* ─────────────────────────────────────────────
   SCENE CONTROLLER
   ───────────────────────────────────────────── */
function SceneController() {
  const [unlocked, setUnlocked] = useState(false);
  const initialAnchor: [number, number, number] = [3.5, 0.4, 0];

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />

      <ContainmentCage 
        position={initialAnchor} 
        scale={0.7} 
        unlocked={unlocked} 
        onHit={() => setUnlocked(true)} 
      />

      <AIRobotNode 
        initialPosition={initialAnchor} 
        unlocked={unlocked} 
        onLock={() => setUnlocked(false)}
      />

      <Environment preset="city" />
    </>
  );
}

/* ─────────────────────────────────────────────
   MAIN SCENE CANVAS
   ───────────────────────────────────────────── */
export default function HeroScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        eventPrefix="client"
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ pointerEvents: "none" }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneController />
        </Suspense>
      </Canvas>
    </div>
  );
}
