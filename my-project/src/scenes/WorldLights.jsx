export function WorldLights() {
    return (
        <>
            <directionalLight 
                position={[10, 5, 10]} 
                intensity={1} 
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={100}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
                shadow-bias={-0.0001}
            />
            <directionalLight 
                position={[-5, 3, 20]} 
                intensity={0} 
                color={"#b388eb"} // soft purple accent
            />
            <ambientLight 
                intensity={0} 
                color={"#88aaff"} 
            />
            <hemisphereLight args={["#fff0f0", "#8888ff", 0.6]} />
        </>
    )
}