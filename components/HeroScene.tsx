"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Text } from "@react-three/drei";
import { useRef, Suspense, useState } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   ALIEN DRONE SHIP (Extraterrestrial Saucer)
   ───────────────────────────────────────────── */
function AlienSaucer({ unlocked, saucerRef }: { unlocked: boolean, saucerRef: React.RefObject<THREE.Group> }) {
  
  useFrame(() => {
    // Cinematic Alien Vessel Approach Algorithm
    if (saucerRef.current) {
      if (unlocked) {
        const targetScale = 1;
        // Saucer swoops in to anchor exactly 1.0 unit BELOW the drone head, creating a massive hovering gap
        saucerRef.current.position.lerp(new THREE.Vector3(0, -1.0, 0), 0.08);
        saucerRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      } else {
        const targetScale = 0;
        // Saucer evacuates and vanishes into deep space at supersonic speed
        saucerRef.current.position.lerp(new THREE.Vector3(8, 15, -25), 0.08);
        saucerRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
      }
    }
  });

  return (
    <group ref={saucerRef} position={[8, 15, -25]} scale={[0, 0, 0]}>
      {/* 1. Main Obsidian Hull (Now extremely wide and completely detached from the drone head) */}
      <mesh castShadow>
        <cylinderGeometry args={[0.9, 0.7, 0.15, 32]} />
        <meshStandardMaterial color="#111111" metalness={1.0} roughness={0.1} />
      </mesh>
      
      {/* 2. Sloped Alien Underbelly */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.7, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 3. Alien Plasma Reactor Ring (Deep Purple Glow) */}
      <mesh position={[0, 0.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.02, 16, 64]} />
        <meshBasicMaterial color="#9d4edd" />
        <pointLight color="#9d4edd" intensity={3} distance={6} />
      </mesh>
      
      {/* 4. Peripheral Nav Beacons (Toxic Green Outer Nodes) */}
      {[...Array(6)].map((_, i) => (
        <group key={i} rotation={[0, i * (Math.PI / 3), 0]}>
          <mesh position={[0.85, 0.1, 0]}>
            <sphereGeometry args={[0.03]} />
            <meshBasicMaterial color="#00ffcc" />
          </mesh>
        </group>
      ))}

      {/* 5. Central Tractor Beam Emitter / Core Engine */}
      <mesh position={[0, -0.1, 0]} rotation={[0, 0, Math.PI]}>
        <sphereGeometry args={[0.2, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.8} />
        <pointLight color="#00ffcc" intensity={2} distance={4} />
      </mesh>
      
      {/* 6. MAGNETIC TRACTOR BEAM PILLAR (Bridges the 1.0 physical gap perfectly up to the Robot Head) */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.15, 0.35, 0.7, 32]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* 7. Docking Ring surface emitter */}
      <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.05, 16, 32]} />
        <meshBasicMaterial color="#00ffcc" />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   PROCEDURAL AI ROBOT (Floating Cyber Drone)
   ───────────────────────────────────────────── */
function AIRobotNode({ unlocked, initialPosition, onLock }: { unlocked: boolean, initialPosition: [number, number, number], onLock: () => void }) {
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const neckRef = useRef<THREE.Group>(null);
  const eyePivotRef = useRef<THREE.Group>(null);
  const saucerRef = useRef<THREE.Group>(null);
  const leftEarRef = useRef<THREE.Mesh>(null);
  const rightEarRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Independent roaming and tracking logic
  const wanderTarget = useRef(new THREE.Vector3());
  const lookAtTarget = useRef(new THREE.Vector3());
  const dummyObj = useRef(new THREE.Object3D());

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Smooth responsive anchor based on the page's native scroll
    const isClient = typeof window !== "undefined";
    const scY = isClient ? window.scrollY : 0;
    const vH = isClient ? window.innerHeight : 1000;
    const scrollOffset = (scY / vH) * state.viewport.height;
    const currentAnchorY = initialPosition[1] + scrollOffset;

    // --- SEQUENTIAL BOARDING LOGIC ---
    let isBoarded = false;
    if (unlocked && saucerRef.current) {
      // Calculates mathematical distance to the new -1.0 offset (massive gap)
      const dist = saucerRef.current.position.distanceTo(new THREE.Vector3(0, -1.0, 0));
      if (dist < 0.1) isBoarded = true; // The ship has successfully positioned under the drone
    }
    
    if (robotRef.current && headRef.current) {
      // Physical Docking Animation (Drone drops slightly, locking purely into the Tractor beam gap)
      const targetHeadY = isBoarded ? -0.15 : 0;
      headRef.current.position.lerp(new THREE.Vector3(0, targetHeadY, 0), 0.15);
      
      // Withdraw physical neck logic entirely when airborne in the beam
      if (neckRef.current) {
        const neckScale = isBoarded ? 0 : 1;
        neckRef.current.scale.lerp(new THREE.Vector3(neckScale, neckScale, neckScale), 0.15);
      }

      if (!unlocked || !isBoarded) {
        // PHASE 1: Locked, or hovering eager for Ship Arrival
        const targetAnchor = new THREE.Vector3(initialPosition[0], currentAnchorY, initialPosition[2]);
        robotRef.current.position.lerp(targetAnchor, 0.1);
        robotRef.current.position.y += Math.sin(t * 2) * 0.002;
        
        robotRef.current.quaternion.slerp(new THREE.Quaternion(), 0.1);

        lookAtTarget.current.set(initialPosition[0], currentAnchorY, 5);
        headRef.current.lookAt(lookAtTarget.current);
        headRef.current.rotation.y += Math.sin(t * 0.8) * 0.2;
        headRef.current.rotation.x += Math.cos(t * 0.5) * 0.15;
      } else {
        // PHASE 2: UFO Escape Flight
        wanderTarget.current.x = Math.sin(t * 0.35) * 6; 
        wanderTarget.current.y = Math.sin(t * 0.45) * 2.5 + Math.cos(t * 0.25) * 1.5; 
        wanderTarget.current.z = Math.sin(t * 0.5) * 2 - 1; 

        robotRef.current.position.lerp(wanderTarget.current, 0.015);
        
        // UFO Hover/Banking Dynamics (Disks lean gently)
        const velocityX = wanderTarget.current.x - robotRef.current.position.x;
        const velocityZ = wanderTarget.current.z - robotRef.current.position.z;
        dummyObj.current.rotation.set(velocityZ * 0.15, 0, -velocityX * 0.15);
        robotRef.current.quaternion.slerp(dummyObj.current.quaternion, 0.08);

        // Independent "Owl" Tracking - Head stares at User cursor irrespective of Saucer banking
        const pointerX = (state.pointer.x * state.viewport.width) / 2;
        const pointerY = (state.pointer.y * state.viewport.height) / 2;
        const userWorldPos = new THREE.Vector3(pointerX, pointerY, 8);
        headRef.current.lookAt(userWorldPos);
      }
    }

    if (eyePivotRef.current) {
      const scanSpeed = unlocked ? 6 : 3;
      eyePivotRef.current.rotation.y = Math.sin(t * scanSpeed) * 0.45;
    }
    if (leftEarRef.current && rightEarRef.current) {
      leftEarRef.current.position.y = Math.cos(t * 2 + 1) * 0.06;
      rightEarRef.current.position.y = Math.cos(t * 2 + 2) * 0.06;
    }
  });

  return (
    <group 
      ref={robotRef} 
      scale={0.65}
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
      {/* === THE ALIEN SHIP === */}
      <AlienSaucer unlocked={unlocked} saucerRef={saucerRef} />

      {/* === THE ROBOT HEAD === */}
      <group ref={headRef}>
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
              <meshBasicMaterial color={unlocked ? (hovered ? "#ff3333" : "#00ffcc") : "#e8c84a"} />
            </mesh>
          </mesh>
        </group>
        
        <group position={[0.6, 0, 0]}>
          <mesh ref={rightEarRef}>
            <capsuleGeometry args={[0.06, 0.25, 16, 16]} />
            <meshStandardMaterial color="#2a2a3a" metalness={0.9} roughness={0.2} />
            <mesh position={[0, 0.15, 0]}>
              <sphereGeometry args={[0.02]} />
              <meshBasicMaterial color={unlocked ? (hovered ? "#ff3333" : "#00ffcc") : "#e8c84a"} />
            </mesh>
          </mesh>
        </group>

        {/* Retractable Neck System */}
        <group ref={neckRef}>
          <mesh position={[0, -0.42, 0]}>
            <cylinderGeometry args={[0.2, 0.15, 0.2, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.015, 16, 64]} />
            <meshBasicMaterial color={unlocked ? "#00ffcc" : "#f5a623"} transparent opacity={0.8} />
            <pointLight color={unlocked ? "#00ffcc" : "#e8c84a"} intensity={1.5} distance={4} />
          </mesh>
        </group>
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
    
    const isClient = typeof window !== "undefined";
    const scY = isClient ? window.scrollY : 0;
    const vH = isClient ? window.innerHeight : 1000;
    const scrollOffset = (scY / vH) * state.viewport.height;
    
    const currentAnchorY = position[1] + scrollOffset;
    
    if (groupRef.current) {
      if (unlocked) {
        groupRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.15);
        groupRef.current.rotation.x += 0.05;
        groupRef.current.rotation.y += 0.05;
        groupRef.current.position.y = currentAnchorY;
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
        groupRef.current.rotation.y = t * 0.1;
        groupRef.current.position.y = currentAnchorY + Math.sin(t * 1.5) * 0.05;
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
