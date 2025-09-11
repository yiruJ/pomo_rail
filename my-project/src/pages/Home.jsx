import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TrainModel from "../components/TrainModel";

export default function Home() {
    return (
        <Canvas 
            style={{ width: '100%', height: '100vh' }}
            camera={{ position: [0, 0, 40], fov: 50 }}>
            {/* lights */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* your Blender model */}
            <TrainModel scale={1} position={[0, 0, 0]} />

            {/* controls */}
            <OrbitControls target={[0, 0, 0]}/>
        </Canvas>
    );
}

