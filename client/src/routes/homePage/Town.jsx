import { Suspense, useEffect } from "react";
import { Canvas,  } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";
import { Color } from "three";
import "./homePage.scss";
import {motion, useScroll  } from "framer-motion"


const Vecna = () => {
  const { scene, animations } = useGLTF("/mining_town/scene.gltf"); 
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions) {
      const action = actions["Animation"]; 
      if (action) {
        action.play();
        action.timeScale = 0.5; 
      }
    }
  }, []);

  return (
    <primitive
      object={scene}
      scale={1}
      position={[-1, -8, 13]}
      rotation={[0, 3.1 , 0]}
    />
  );
};

export default function Town() {

  const { scrollYProgress } = useScroll()
  

  return (
    <div className="town">
     <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div/>
      <Canvas
      id="canvas"
        shadows
        frameloop="demand"
        dpr={[1, 2]}  
        style={{ background: '#4bb0f4' }} 
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          position: [0, 0, -10]
        }}
      >
        <ambientLight intensity={2} /> 
        {/* <pointLight
          name="redLight"
          position={[0, 5, 6]} 
          color={new Color('red')}
          intensity={100}
          distance={100}
          decay={1}
        />
        <pointLight
          name="blueLight"
          position={[0,-1,4]}
          color={new Color('blue')}
          intensity={50} 
          distance={40}
          decay={1}
        /> */}
        <Suspense fallback={null}>
        <OrbitControls
            // enableZoom={false}
            // maxPolarAngle={Math.PI / 2} // Limit vertical rotation slightly below 90 degrees
            // minPolarAngle={Math.PI / 2 } // Limit vertical rotation slightly above 90 degrees
            // maxAzimuthAngle={-Math.PI / 1.2} // Limit horizontal rotation to +30 degrees
            // minAzimuthAngle={Math.PI / 1.2} // Limit horizontal rotation to -30 degrees
          />
          <Vecna position={[0, 5, 6]} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
