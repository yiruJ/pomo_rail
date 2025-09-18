import { Canvas  } from "@react-three/fiber";
import { OrbitControls, Environment  } from "@react-three/drei";
import MainStationModel from "../components/MainStationModel";
import TrainModel from "../components/TrainModel";
import { FaArrowUp, FaArrowDown, FaHatWizard } from "react-icons/fa";
import * as THREE from "three";
import handleTimer, { TIMER } from "../hooks/handleTimer";

export default function Home() {    
    const { timerType, currentMinutes, setTimerType, updateTimer } = handleTimer();

    function startSession() {
        
    }

    return (
        <div className="relative">
        <Canvas 
            shadows
            style={{ width: '100%', height: '100vh' }}
            camera={{ position: [3.5, 74, 12], fov: 50 }}
            gl={{ shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap } }}>

            {/* lights */}
            <directionalLight 
                position={[10, 20, 10]} 
                intensity={2} 
                color={"#ffe0b2"}
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
                intensity={4} 
                color={"#b388eb"} // soft purple accent
            />
            <ambientLight 
                intensity={0.3} 
                color={"#88aaff"} 
            />
            <hemisphereLight args={["#fff0f0", "#8888ff", 0.6]} />

            {/* your Blender model */}
            <MainStationModel castShadow scale={1} position={[0, 0, 0]}/>
            <TrainModel castShadow scale={1.5} position={[0, 0, 18]}/>

            {/* bg */}
            {/* <color attach="background" args={["#ddaca3"]} /> */}

            <Environment preset="city" /> 

            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[1000, 1000]} />  {/* width, height */}
                <meshStandardMaterial color="#8f6861" side={THREE.DoubleSide} />
            </mesh>

            {/* controls */}
            <OrbitControls 
                target={[0, 77, 0]}
                // enableZoom={false}
                // enableRotate={false}
            />
    
        </Canvas>
            {/* panel mode */}
            <div className="absolute top-16 justify-center -translate-x-3 w-full z-20 flex gap-36">
                <button
                    onClick={() => setTimerType(TIMER.POMO)}
                >
                    <p className="text-white font-quickSand text-2xl font-bold">Pomodoro</p>
                </button>
                <button
                    onClick={() => setTimerType(TIMER.BREAK)}
                >
                    <p className="text-white font-quickSand text-2xl font-bold">Break</p>
                </button>
            </div>

            <FaHatWizard className={`z-20 absolute top-10 ${timerType === "pomo" ? "left-6/14" : "right-6/14" } w-6 h-6 text-white/70 animate-bounce`}/>

            {/* timer panel*/}
            <div
                className="h-80 w-1/3 bg-red-50/40 z-10 absolute top-28 
                        left-1/2 -translate-x-1/2 rounded-4xl border-4 
                        border-white shadow-xl"
            >
                <div className="flex flex-col items-center gap-10 h-full justify-center">
                    {/* pomo timer */}
                    <div id="pomo" className={timerType === "pomo" ? "" : "hidden"}>
                        <p className="text-9xl text-white font-quickSand font-extrabold">
                            {currentMinutes}<span className="text-4xl">mins</span>
                        </p>
                    </div>

                    {/* break timer */}
                    <div id="break" className={timerType === "break" ? "" : "hidden"}>
                        <p className="text-9xl text-white font-quickSand font-extrabold">
                            {currentMinutes}<span className="text-4xl">mins</span>
                        </p>
                    </div>

                    {/* update timer */}
                    <div className="flex flex-row gap-10 ">
                        <button onClick={() => updateTimer("up")}>
                            <FaArrowUp 
                                className="text-white w-12 h-12 transform transition-transform 
                                          duration-100 hover:scale-125"
                            />
                        </button>
                        <button onClick={() => updateTimer("down")}>
                            <FaArrowDown 
                                className="text-white w-12 h-12 transform transition-transform 
                                          duration-100 hover:scale-125" 
                            />
                        </button>
                    </div>
                </div>   
            </div>
            {/* title */}
            <p className="font-quickSand text-9xl left-30 top-1/2 absolute z-10
                       text-white font-medium -translate-y-1/2">
                Pomo  <br/> Rail
            </p>
            {/* start button */}
            <button
                onClick = {() => startSession()}
            >
                <p className="font-quickSand text-6xl right-50 top-1/2 absolute z-10
                        text-white font-bold -translate-y-1/2 transform transition-transform 
                        duration-100 hover:scale-125">
                    start
                </p>
            </button>
        </div>
    );
}

