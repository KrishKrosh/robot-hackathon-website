import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei'
import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import { Mesh, Group, Vector3, Raycaster, Plane, MeshStandardMaterial, Color, TextureLoader, Vector2, RepeatWrapping } from 'three'

// Joint limits in radians
const JOINT_LIMITS = {
  baseRotation: { min: -Math.PI, max: Math.PI },
  shoulderRotation: { min: -Math.PI/2, max: Math.PI/2 },
  shoulderPitch: { min: -Math.PI/4, max: Math.PI/2 },
  elbow: { min: -Math.PI/3, max: Math.PI/3 },
  wristPitch: { min: -Math.PI/2, max: Math.PI/2 },
  wristRoll: { min: -Math.PI/2, max: Math.PI/2 },
  gripper: { min: 0, max: Math.PI }
};

// Helper functions
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function smoothDamp(current: number, target: number, smoothing: number): number {
  return current + (target - current) * (1 - Math.exp(-smoothing));
}

// Create a loading component that can be used in multiple places
function LoadingSpinner() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#f5f5f5] z-[-1]">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="font-['VCR_OSD_Mono'] tracking-wide text-black text-sm sm:text-base">
        LOADING...
      </div>
    </div>
  );
}

// Loading component for use within Canvas/Suspense
function CanvasLoadingSpinner() {
  return (
    <Html fullscreen>
      <LoadingSpinner />
    </Html>
  );
}

// Base props with optional transformations
interface BaseProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  baseRef?: React.RefObject<Group>;
  shoulderRotationRef?: React.RefObject<Group>;
  shoulderPitchRef?: React.RefObject<Group>;
  elbowRef?: React.RefObject<Group>;
  wristPitchRef?: React.RefObject<Group>;
  wristRollRef?: React.RefObject<Group>;
  gripperRef?: React.RefObject<Group>;
  jawRef?: React.RefObject<Group>;
}

// Custom silver material with gradient effect
function useSilverMaterial() {
  return useMemo(() => {
    // Create texture loader
    const textureLoader = new TextureLoader();
    
    // Load the new PNG textures that user has added
    const baseTexture = textureLoader.load('/textures/metal/worn-shiny-metal-albedo.png');
    const normalMap = textureLoader.load('/textures/metal/worn-shiny-metal-Normal-ogl.png');
    const roughnessMap = textureLoader.load('/textures/metal/worn-shiny-metal-Roughness.png');
    const metalnessMap = textureLoader.load('/textures/metal/worn-shiny-metal-Metallic.png');
    
    // Set texture wrapping and repeat for tiling effect
    [baseTexture, normalMap, roughnessMap, metalnessMap].forEach(texture => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(1, 1); // No tiling to prevent texture stretching
      texture.anisotropy = 4; // Reduced anisotropy to prevent artifacts
    });
    
    const material = new MeshStandardMaterial({
      color: new Color('#423c45'),    // Standard silver color
      map: baseTexture,               // Base color/diffuse texture
      normalMap: normalMap,           // Normal map for surface detail
      roughnessMap: roughnessMap,     // Roughness map for worn/eroded areas
      metalnessMap: metalnessMap,     // Metalness map for varying metallic properties
      metalness: 0.6,                 // Moderate metalness
      roughness: 0.7,                 // Moderate roughness
      envMapIntensity: 0.6,           // More subtle reflection intensity
      normalScale: new Vector2(0.3, 0.3), // Very subtle normal map effect
    });
    
    return material;
  }, []);
}

function MovingJaw(props: any) {
  const { jawRef } = props;
  const { nodes } = useGLTF('/glb/Moving_Jaw.glb')
  const silverMaterial = useSilverMaterial();
  
  return (
    <group {...props} ref={jawRef} dispose={null}>
      <mesh geometry={(nodes.Node1 as Mesh).geometry} material={silverMaterial} />
    </group>
  )
}

function FixedGripper(props: any) {
  const { gripperRef, jawRef } = props;
  const { nodes } = useGLTF('/glb/Fixed_Gripper.glb')
  const silverMaterial = useSilverMaterial();

  return (
    <group {...props} ref={gripperRef} dispose={null}>
      <mesh geometry={(nodes.Node1 as Mesh).geometry} material={silverMaterial} />
      <group 
        position={[0.027, 0.022, -0.001]} 
        rotation={[Math.PI/2, Math.PI, Math.PI]}
      >
        <MovingJaw jawRef={jawRef} />
      </group>
    </group>
  )
}

function WristPitchRoll(props: any) {
  const { wristPitchRef, wristRollRef, gripperRef, jawRef } = props;
  const { nodes } = useGLTF('/glb/Wrist_Pitch_Roll.glb')
  const silverMaterial = useSilverMaterial();
  
  return (
    <group {...props} ref={wristPitchRef} dispose={null}>
      <mesh geometry={(nodes.Node1 as Mesh).geometry} material={silverMaterial} />
      <group 
        position={[0, -0.03, -0.005]} 
        rotation={[Math.PI/2, -Math.PI/2, Math.PI]}
        ref={wristRollRef}
      >
        <FixedGripper gripperRef={gripperRef} jawRef={jawRef} />
      </group>
    </group>
  )
}

function LowerArm(props: BaseProps) {
  const { nodes } = useGLTF('/glb/Lower_Arm.glb')
  const silverMaterial = useSilverMaterial();
  
  return (
    <group {...props} dispose={null}>
      <mesh geometry={(nodes.Node1 as Mesh).geometry} material={silverMaterial} />
      <group 
        position={[-0.1102, 0.005375, 0]} 
        rotation={[Math.PI/2, Math.PI/2, 0]}
      >
        <WristPitchRoll {...props} />
      </group>
    </group>
  )
}

function UpperArm(props: BaseProps) {
  const { nodes } = useGLTF('/glb/Upper_Arm.glb')
  const silverMaterial = useSilverMaterial();
  
  return (
    <group {...props} dispose={null}>
      <mesh geometry={(nodes.Node1 as Mesh).geometry} material={silverMaterial} />
      <group 
        position={[-0.1138, 0.0005, -0.03]} 
        rotation={[0, Math.PI/4, Math.PI]}
      >
        <LowerArm {...props} />
      </group>
    </group>
  )
}

function ShoulderRotationPitch(props: BaseProps) {
  const { nodes } = useGLTF('/glb/Shoulder_Rotation_Pitch.glb')
  const silverMaterial = useSilverMaterial();
  
  return (
    <group {...props} dispose={null}>
      <mesh geometry={(nodes.Node1 as Mesh).geometry} material={silverMaterial} />
      <group 
        position={[0.000125, 0.001, -0.11]} 
        rotation={[0, 0, Math.PI]}
      >
        <UpperArm {...props}/>
      </group>
    </group>
  )
}

function Base(props: BaseProps) {
  const { nodes } = useGLTF('/glb/Base.glb')
  const silverMaterial = useSilverMaterial();
  
  // Calculate responsive scale based on window width
  const scale = useMemo(() => {
    if (typeof window === 'undefined') return [1.9, 1.9, 1.9] as const;
    const width = window.innerWidth;
    if (width < 768) return [1.3, 1.3, 1.3] as const;      // Mobile - increased from 1.0
    return [1.9, 1.9, 1.9] as const;                       // Laptop/Desktop
  }, []);

  return (
    <group {...props} dispose={null} scale={scale} position={[0, -0.2, 0]}>
      <mesh geometry={(nodes.Node1 as Mesh).geometry} material={silverMaterial} />
      <group 
        position={[0, 0.02, 0.05]}
        rotation={[Math.PI/2, 0, -Math.PI/2]}
      >
        <ShoulderRotationPitch {...props} />
      </group>
    </group>
  )
}

// Preload all models
useGLTF.preload('/glb/Base.glb')
useGLTF.preload('/glb/Shoulder_Rotation_Pitch.glb')
useGLTF.preload('/glb/Upper_Arm.glb')
useGLTF.preload('/glb/Lower_Arm.glb')
useGLTF.preload('/glb/Wrist_Pitch_Roll.glb')
useGLTF.preload('/glb/Fixed_Gripper.glb')
useGLTF.preload('/glb/Moving_Jaw.glb')

// Scene component that contains all 3D elements
function Scene() {
  const baseRef = useRef<Group>(null);
  const shoulderRotationRef = useRef<Group>(null);
  const shoulderPitchRef = useRef<Group>(null);
  const elbowRef = useRef<Group>(null);
  const wristPitchRef = useRef<Group>(null);
  const wristRollRef = useRef<Group>(null);
  const gripperRef = useRef<Group>(null);
  const jawRef = useRef<Group>(null);
  const modelWrapperRef = useRef<Group>(null); // New ref for the entire model wrapper
  
  const targetPosition = useMemo(() => new Vector3(), []);
  const [reachable, setReachable] = useState(true);
  
  const { camera, pointer } = useThree();
  const raycaster = useMemo(() => new Raycaster(), []);
  // Create a horizontal plane at y=0 for cursor intersection
  const plane = useMemo(() => new Plane(new Vector3(0, 1, 0), 0), []);
  
  useFrame((state, delta) => {
    // Update target position from mouse
    raycaster.setFromCamera(pointer, camera);
    const intersection = new Vector3();
    
    if (raycaster.ray.intersectPlane(plane, intersection)) {
      // Update target position
      targetPosition.copy(intersection);
      
      // Rotate the entire model based on cursor horizontal position
      if (modelWrapperRef.current) {
        // Get normalized cursor position (-1 to 1)
        const normalizedX = pointer.x;
        
        // Calculate target angle - full rotation from -PI to PI
        const targetAngle = normalizedX * Math.PI;
        
        // Apply smooth damping to the rotation
        modelWrapperRef.current.rotation.y = smoothDamp(
          modelWrapperRef.current.rotation.y,
          targetAngle,
          3 * delta // Smoothing factor
        );
      }
      
      // The original base rotation code is no longer needed since we're rotating the whole model
      // but we'll keep the joint movements below
      
      if (shoulderRotationRef.current) {
        // Calculate angle to target in XZ plane for shoulder rotation
        const angle = Math.atan2(intersection.x, intersection.z);
        shoulderRotationRef.current.rotation.y = clamp(
          angle,
          JOINT_LIMITS.shoulderRotation.min,
          JOINT_LIMITS.shoulderRotation.max
        );
      }
      
      // Update gripper and jaw based on distance to target
      if (gripperRef.current && jawRef.current) {
        const gripperPos = new Vector3();
        gripperRef.current.getWorldPosition(gripperPos);
        
        const distanceToTarget = gripperPos.distanceTo(targetPosition);
        const gripperAngle = clamp(
          (0.1 - distanceToTarget) * Math.PI, 
          JOINT_LIMITS.gripper.min,
          JOINT_LIMITS.gripper.max
        );
        
        // Smooth the gripper motion
        const smoothing = 5 * delta;
        
        // Update gripper rotation
        gripperRef.current.rotation.y = smoothDamp(
          gripperRef.current.rotation.y,
          gripperAngle,
          smoothing
        );
        
        // Update jaw rotation
        jawRef.current.rotation.y = smoothDamp(
          jawRef.current.rotation.y,
          gripperAngle,
          smoothing
        );
        
        // Update wrist pitch to point at target
        if (wristPitchRef.current) {
          const targetY = intersection.y - gripperPos.y;
          const targetDist = Math.sqrt(
            Math.pow(intersection.x - gripperPos.x, 2) +
            Math.pow(intersection.z - gripperPos.z, 2)
          );
          
          // Invert the angle calculation and clamp to prevent downward motion
          const wristAngle = -Math.atan2(targetY, targetDist);
          
          wristPitchRef.current.rotation.x = smoothDamp(
            wristPitchRef.current.rotation.x,
            clamp(
              wristAngle,
              JOINT_LIMITS.wristPitch.min,
              JOINT_LIMITS.wristPitch.max
            ),
            smoothing
          );
        }
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 5]} intensity={1.0} />
      <directionalLight position={[-3, -2, -4]} intensity={0.8} />
      <directionalLight position={[0, 5, -5]} intensity={0.8} />
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#666666" />
      
      <Environment preset="warehouse" />
      
      <RobotArmModel
        baseRef={baseRef}
        shoulderRotationRef={shoulderRotationRef}
        shoulderPitchRef={shoulderPitchRef}
        elbowRef={elbowRef}
        wristPitchRef={wristPitchRef}
        wristRollRef={wristRollRef}
        gripperRef={gripperRef}
        jawRef={jawRef}
        modelWrapperRef={modelWrapperRef}
      />
      {/* Add a transparent plane for cursor intersection */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial transparent opacity={0.0} />
      </mesh>
      <OrbitControls />
    </>
  );
}

// Robot arm model component
function RobotArmModel(props: any) {
  const {
    baseRef,
    shoulderRotationRef,
    shoulderPitchRef,
    elbowRef,
    wristPitchRef,
    wristRollRef,
    gripperRef,
    jawRef,
    modelWrapperRef
  } = props;

  return (
    <group ref={modelWrapperRef}>
      <Base 
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]}
        baseRef={baseRef}
        shoulderRotationRef={shoulderRotationRef}
        shoulderPitchRef={shoulderPitchRef}
        elbowRef={elbowRef}
        wristPitchRef={wristPitchRef}
        wristRollRef={wristRollRef}
        gripperRef={gripperRef}
        jawRef={jawRef}
      />
    </group>
  );
}

export default function RobotArm() {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  
  useEffect(() => {
    // Ensure GLB models are preloaded before rendering
    const modelPaths = [
      '/glb/Base.glb',
      '/glb/Shoulder_Rotation_Pitch.glb',
      '/glb/Upper_Arm.glb',
      '/glb/Lower_Arm.glb',
      '/glb/Wrist_Pitch_Roll.glb',
      '/glb/Fixed_Gripper.glb',
      '/glb/Moving_Jaw.glb'
    ];
    
    // Track loading progress
    let loadedCount = 0;
    const totalModels = modelPaths.length;
    
    Promise.all(
      modelPaths.map(url => 
        new Promise<void>((resolve, reject) => {
          try {
            // Preload the model
            useGLTF.preload(url);
            
            // Simulate a delay to ensure loading completes
            // In a real app, you'd use the GLTF loader's onLoad callback
            setTimeout(() => {
              loadedCount++;
              console.log(`Loaded ${loadedCount}/${totalModels} models`);
              resolve();
            }, 100);
          } catch (error) {
            console.error(`Error loading model ${url}:`, error);
            reject(error);
          }
        })
      )
    )
    .then(() => {
      console.log('All models loaded successfully');
      setIsModelsLoaded(true);
    })
    .catch(error => {
      console.error('Error loading models:', error);
      setLoadingError('Failed to load 3D models. Please refresh the page.');
    });
  }, []);

  // Show loading error if any
  if (loadingError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#f5f5f5]">
        <div className="text-red-500 font-['VCR_OSD_Mono'] tracking-wide text-sm sm:text-base mb-4">
          {loadingError}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="border-2 border-black bg-black text-white rounded-md px-4 py-2 text-xs sm:text-sm font-['VCR_OSD_Mono'] tracking-wide hover:bg-white hover:text-black transition-colors"
        >
          RELOAD PAGE
        </button>
      </div>
    );
  }

  // Show loading spinner while models are loading
  if (!isModelsLoaded) {
    return <LoadingSpinner />;
  }

  // Render the robot arm scene once models are loaded
  return (
    <div className="w-full h-screen flex items-center">
      <Canvas 
        camera={{ 
          position: [1.0, 0.6, 1.0],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        shadows={false}
      >
        <Suspense fallback={<CanvasLoadingSpinner />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}