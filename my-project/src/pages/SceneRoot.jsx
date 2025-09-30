import { Canvas } from "@react-three/fiber";
import { Environment, CameraControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { WorldLights } from "../scenes/WorldLights";
import { Walls } from "../scenes/Walls";
import MainStationModel from "../components/MainStationModel";
import TrainModel from "../components/TrainModel";
import TrackModel from "../components/TrackModel";
import TitleUI from "./TitleUI";
import HomeUI from "./HomeUI";
import StartSession from "./StartSession";
import handleTimer from "../hooks/TimerSettings";
import { CAMERA_POSES } from "../scenes/CameraPoses";
import * as THREE from "three";
import { SESSION } from "../constants/Sessions";

export default function Title() {
    const { timerType, currentMinutes, setTimerType, updateTimer } = handleTimer();
    const camCtrlRef = useRef(null);
    const [sessionState, setSessionState] = useState(SESSION.TITLE);

    function LoadTracks() {
        return (
            <>
                {Array.from({ length: 40 }, (_, i) => {
                    return (
                        <group
                            key={`track-${i}`}
                            position={[-240 + i * 17.7, 0, 18.5]}
                            rotation={[0, Math.PI, 0]}
                            scale={1.5}
                        >
                            <TrackModel />
                        </group>
                    );
                })}
            </>
        );
    }

    function LoadModels() {
        return (
            <>
                <MainStationModel 
                    castShadow 
                    scale={1} 
                    position={[0, 0, 0]} 
                    rotation={[0, Math.PI, 0]}
                />
                <TrainModel 
                    castShadow 
                    scale={1.5} 
                    position={[-5, 1, 20]} 
                    rotation={[0, Math.PI, 0]}
                />
                
                <LoadTracks/>
            </>
        )
    }

    function handleCamera(inst) {
        if (!inst) return;   
        inst.camera.up.set(0, 1, 0);
        const { pos, target, smooth } = CAMERA_POSES[sessionState]; 
        inst.setLookAt(...pos, ...target, smooth);
    }

    function CameraLogger() {
        useFrame(() => {
            const c = camCtrlRef.current;
            if (c) {
            const pos = new THREE.Vector3();
            const tgt = new THREE.Vector3();
            c.getPosition(pos);
            c.getTarget(tgt);
            console.log("Camera pos:", pos, "Target:", tgt);
            }
        });
        return null;
    }

    return (
        <div className="relative">
            <Canvas
                dpr={[1, 2]}
                shadows
                style={{ width: '100%', height: '100vh'}}
                camera={{ position: [-5.5, 70.8, 12.6], fov: 50 }}
                gl={{ shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap } }}>
                {/* <CameraLogger /> */}
                <WorldLights/>
                <LoadModels/>
                <Environment preset="lobby" /> 
                <Walls/>
                <CameraControls  
                    ref={(inst) => {
                        camCtrlRef.current = inst;
                        handleCamera(inst);
                    }}
                    smoothTime={1.0} 
                    enabled={true}
                    enablePan={true}
                    enableZoom={true} 
                    enableRotate={true}
                /> 
            </Canvas>
            {/* Overlays */}
            {sessionState === SESSION.TITLE && (
                <TitleUI
                    onStart={() => setSessionState(SESSION.HOME)}
                />
            )}
            {sessionState === SESSION.HOME && (
                <HomeUI
                    timerType={timerType}
                    setTimerType={setTimerType}
                    updateTimer={updateTimer}
                    currentMinutes={currentMinutes}
                    onStart={() => setSessionState(SESSION.START)}
                />
            )}
            {(sessionState === SESSION.START || sessionState === SESSION.PLAY || sessionState === SESSION.PAUSE) && (
                <StartSession
                    timerType={timerType}
                    setTimerType={setTimerType}
                    currentMinutes={currentMinutes}
                    onPause={() => setSessionState(SESSION.PAUSE)}
                    onPlay={() => setSessionState(SESSION.PLAY)}
                    sessionState={sessionState}
                />
            )}
        </div>
    );
}

