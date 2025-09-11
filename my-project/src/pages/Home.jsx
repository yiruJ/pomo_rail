import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TrainModel from "../components/TrainModel";

export default function Home() {
    return (
        <Canvas 
            camera={{ position: [0, 3, 3], fov: 50 }}>
            {/* lights */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* your Blender model */}
            <TrainModel scale={0.5} position={[0, 0, 0]} />

            {/* controls */}
            <OrbitControls target={[0, 3, 0]}/>
        </Canvas>
    );
}

