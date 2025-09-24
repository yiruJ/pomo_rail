import * as THREE from "three";

export function Walls() {
    const BG_COLOUR = "#C4DDA3";  
    return (
        <>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[1000, 1000]} />  {/* width, height */}
                <meshStandardMaterial color={BG_COLOUR} side={THREE.DoubleSide} />
            </mesh>
            {/* Left wall (along Z) */}
            <mesh position={[0, 0, -50]} castShadow receiveShadow>
                <boxGeometry args={[10000, 10000]} />
                <meshStandardMaterial color={BG_COLOUR} side={THREE.DoubleSide}/>
            </mesh>

            {/* Back wall (along X) */}
            <mesh position={[100, 0, 0]}  rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[1000, 10000]} />
                <meshStandardMaterial color={BG_COLOUR} />
            </mesh>
        </>
    )
}