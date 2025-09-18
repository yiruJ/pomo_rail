import { Canvas  } from "@react-three/fiber";
import { OrbitControls, Environment  } from "@react-three/drei";
import MainStationModel from "../components/MainStationModel";
import TrainModel from "../components/TrainModel";
import { FaArrowUp, FaArrowDown, FaHatWizard } from "react-icons/fa";
import * as THREE from "three";
import handleTimer, { TIMER } from "../hooks/handleTimer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {    
    const { timerType, currentMinutes, setTimerType, updateTimer } = handleTimer();

    const SESSION = {
        HOME: "home",
        START: "start",
        PAUSE: "pause",
        ONGOING: "ongoing",
        END: "end"
    };

    const [sessionState, setSessionState] = useState(SESSION.HOME);

    function startSession() {
        setSessionState(SESSION.START);
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
                position={[10, 5, 10]} 
                intensity={2} 
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

            <Environment preset="city" /> 

            {/* floor */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[10000, 10000]} />  {/* width, height */}
                <meshStandardMaterial color="#8f6861" side={THREE.DoubleSide} />
            </mesh>
            {/* Left wall (along Z) */}
            <mesh position={[0, 0, -500]} castShadow receiveShadow>
                <boxGeometry args={[10000, 10000]} />
                <meshStandardMaterial color="#8f6861" side={THREE.DoubleSide}/>
            </mesh>

            {/* Back wall (along X) */}
            <mesh position={[500, 0, 0]}  rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[10000, 10000]} />
                <meshStandardMaterial color="#8f6861" />
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

            <motion.div
                className="z-20 absolute top-10"
                animate={{ left: timerType === "pomo" ? "43%" : "55.6%" }} 
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
                <FaHatWizard className="w-6 h-6 text-white/70" />
            </motion.div>
            
            {/* timer panel */}
            <AnimatePresence
                mode="wait"
            >
                <motion.div
                    key={sessionState}
                    className="h-80 w-1/3 bg-red-50/40 z-10 absolute
                                rounded-4xl border-4 border-white shadow-xl
                                -translate-x-1/2"
                    style={{
                        left: sessionState === SESSION.HOME ? "50%" : "20%",
                        top:  sessionState === SESSION.HOME ? "12%" : "5%",
                    }}
                    initial={{ opacity: 0, scale: 1, y:12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -16 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex flex-col items-center gap-10 h-full justify-center">
                        <div id="pomo" className={timerType === TIMER.POMO ? "" : "hidden"}>
                            <p className="text-9xl text-white font-quickSand font-extrabold">
                                {currentMinutes}<span className="text-4xl">mins</span>
                            </p>
                        </div>
                        <div id="break" className={timerType === TIMER.BREAK ? "" : "hidden"}>
                            <p className="text-9xl text-white font-quickSand font-extrabold">
                                {currentMinutes}<span className="text-4xl">mins</span>
                            </p>
                        </div>
                        <AnimatePresence initial={false}> 
                            {sessionState === SESSION.HOME && (
                                <motion.div
                                    key="timer-controls"
                                    className="flex flex-row gap-10"
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                <button onClick={() => updateTimer("up")}>
                                    <FaArrowUp className="text-white w-12 h-12 transition-transform duration-100 hover:scale-125" />
                                </button>
                                <button onClick={() => updateTimer("down")}>
                                    <FaArrowDown className="text-white w-12 h-12 transition-transform duration-100 hover:scale-125" />
                                </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </AnimatePresence>

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

