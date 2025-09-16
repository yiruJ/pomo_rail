import { Canvas  } from "@react-three/fiber";
import { OrbitControls, Environment  } from "@react-three/drei";
import MainStationModel from "../components/MainStationModel";
import { FaArrowUp, FaArrowDown, FaHatWizard } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
    const [pomoDigitOne, setPomoDigitOne] = useState(2);
    const [pomoDigitTwo, setPomoDigitTwo] = useState(5);

    const [breakDigitOne, setBreakDigitOne] = useState(0);
    const [breakDigitTwo, setBreakDigitTwo] = useState(5);

    const [currTimer, setCurrTimer] = useState("pomo");

    function showBreakTimer() {
        setCurrTimer("break");
    }

    function showPomoTimer() {
        setCurrTimer("pomo");
    }

    function updateTimer(direction) {
        currTimer === "break" ? updateBreakTimer(direction) : updatePomoTimer(direction);
    }

    function updatePomoTimer(direction) {
        console.log("hi");
        if (direction === "up") {
            if (pomoDigitOne === 5 && pomoDigitTwo === 5) return;

            if (pomoDigitTwo === 5) {
                setPomoDigitTwo(0);
                setPomoDigitOne(pomoDigitOne + 1);
            } else {
                setPomoDigitTwo(5);
            }
        } else {
            if (pomoDigitOne === 1 && pomoDigitTwo === 0) return;

            if (pomoDigitTwo === 0) {
                setPomoDigitTwo(5);
                setPomoDigitOne(pomoDigitOne - 1);
            } else {
                setPomoDigitTwo(0);
            }
        }
    }

    function updateBreakTimer(direction) {
        if (direction === "up") {
            if (breakDigitOne === 3 && breakDigitTwo === 0) return;

            if (breakDigitTwo === 5) {
                setBreakDigitTwo(0);
                setBreakDigitOne(breakDigitOne + 1);
            } else {
                setBreakDigitTwo(5);
            }
        } else {
            if (breakDigitOne === 0 && breakDigitTwo === 5) return;

            if (breakDigitTwo === 0) {
                setBreakDigitTwo(5);
                setBreakDigitOne(breakDigitOne - 1);
            } else {
                setBreakDigitTwo(0);
            }
        }
    }

    return (
        <div className="relative">
        <Canvas 
            style={{ width: '100%', height: '100vh' }}
            camera={{ position: [3.5, 74, 12], fov: 50 }}>

            {/* marker at world origin */}
            <axesHelper args={[5]} />

            {/* optional grid */}
            <gridHelper args={[50, 50, 50]} />

            {/* lights */}
            <directionalLight 
                position={[5, 5, 5]} 
                intensity={3} 
                color={"#ffe0b2"} 
            />
            <directionalLight 
                position={[-5, 3, 20]} 
                intensity={4} 
                color={"#b388eb"} // soft purple accent
            />
            <ambientLight 
                intensity={2} 
                color={"#88aaff"} 
            />
            <hemisphereLight args={["#fff0f0", "#8888ff", 0.6]} />

            {/* your Blender model */}
            <MainStationModel scale={1} position={[0, 0, 0]}/>

            {/* bg */}
            <color attach="background" args={["#ddaca3"]} />

            <Environment preset="city" /> 

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
                    onClick={() => showPomoTimer()}
                >
                    <p className="text-white font-quickSand text-2xl font-bold">Pomodoro</p>
                </button>
                <button
                    onClick={() => showBreakTimer()}
                >
                    <p className="text-white font-quickSand text-2xl font-bold">Break</p>
                </button>
            </div>

            <FaHatWizard className={`z-20 absolute top-10 ${currTimer === "pomo" ? "left-6/14" : "right-6/14" } w-6 h-6 text-white/70 animate-bounce`}/>

            {/* timer panel*/}
            <div
                className="h-80 w-1/3 bg-red-50/40 z-10 absolute top-28 
                        left-1/2 -translate-x-1/2 rounded-4xl border-4 
                        border-white shadow-xl"
            >
                <div className="flex flex-col items-center gap-10 h-full justify-center">
                    {/* pomo timer */}
                    <div id="pomo" className={currTimer === "pomo" ? "" : "hidden"}>
                        <p className="text-9xl text-white font-quickSand font-extrabold">
                            {pomoDigitOne}{pomoDigitTwo} : 00
                        </p>
                    </div>

                    {/* break timer */}
                    <div id="break" className={currTimer === "break" ? "" : "hidden"}>
                        <p className="text-9xl text-white font-quickSand font-extrabold">
                            {breakDigitOne}{breakDigitTwo} : 00
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
            <button>
                <p className="font-quickSand text-6xl right-50 top-1/2 absolute z-10
                        text-white font-bold -translate-y-1/2 transform transition-transform 
                        duration-100 hover:scale-125">
                    start
                </p>
            </button>
        </div>
    );
}

