import { useGLTF } from "@react-three/drei";

export default function TrainModel(props) {
    // this hook loads the .glb file
    const { scene } = useGLTF("/models/train.glb"); // put train.glb in /public/models

    return <primitive object={scene} {...props} />;
}