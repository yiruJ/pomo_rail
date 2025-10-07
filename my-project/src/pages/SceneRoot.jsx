import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, CameraControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { WorldLights } from "../scenes/WorldLights";
import { Walls } from "../scenes/Walls";
import MainStationModel from "../components/MainStationModel";
import TrainModel from "../components/TrainModel";
import TrackSetModel from "../components/TrackSetModel";
import TitleUI from "./TitleUI";
import HomeUI from "./HomeUI";
import StartSession from "./StartSession";
import handleTimer from "../hooks/TimerSettings";
import OpenGate from "../movements/OpenGate";
import { CAMERA_POSES } from "../constants/CameraPoses";
import * as THREE from "three";
import { SESSION } from "../constants/Sessions";
import { AnimatePresence } from "framer-motion";
import { MainStationMovement } from "../movements/MainStationMovement";
import SpeedController from "../movements/SpeedController";
import TrackMovement from "../movements/TrackMovement";

function LoadModels( {mainStationRef, trackSetArrRef, isVisible}) {
    return (
        <>
            {isVisible.mainStation && (
                <MainStationModel 
                    castShadow 
                    scale={1} 
                    position={[0, -1, -3]} 
                    rotation={[0, Math.PI, 0]}
                    ref={mainStationRef}
                />
            )}
            <TrainModel 
                castShadow 
                scale={1} 
                position={[-10, 1.3, 20]} 
                rotation={[0, Math.PI, 0]}
            />
            
            <LoadTrackSets trackSetArrRef={trackSetArrRef} />
        </>
    )
}

function LoadTrackSets({ trackSetArrRef }) {
    return (
        <>
            {Array.from({ length: 3}, (_, i) => (
                <TrackSetModel
                    key={i}
                    ref={(trackSet) => {
                        if (trackSet) trackSetArrRef.current[i] = trackSet;
                    }}
                    position={[i * 212.5 - 200, 0, 18.5]}
                    rotation={[0, Math.PI, 0]}
                    scale={1}
                />
            ))

            }
        </>
    )
}

function RotateTrackSets({ trackSetArrRef }) {
    useFrame((_, delta) => {
        trackSetArrRef.current.forEach((trackSet) => {
            if (trackSet.position.x >= 212.5 + 225) {
                trackSet.position.x = -200.1;
                return;
            }
        })
    })
}

export default function Title() {
    const { timerType, currentMinutes, setTimerType, updateTimer } = handleTimer();
    const camCtrlRef = useRef(null);
    const mainStationRef = useRef(null);
    const trackSetArrRef = useRef([]);
    const speedRef = useRef(0);
    const [sessionState, setSessionState] = useState(SESSION.TITLE);
    const [isVisible, setIsVisible] = useState({
        mainStation: true,
        train: true,
        tracks: true,
    });

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
                <LoadModels mainStationRef={mainStationRef} trackSetArrRef={trackSetArrRef} isVisible={isVisible}/>
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
                <SpeedController sessionState={sessionState} speedRef={speedRef}/>
                <OpenGate gateRef={mainStationRef} active={sessionState === SESSION.START}/>
                <MainStationMovement speedRef={speedRef} mainStationRef={mainStationRef} sessionState={sessionState} setIsVisible={setIsVisible} />
                <TrackMovement speedRef={speedRef} trackSetArrRef={trackSetArrRef}/>
                <RotateTrackSets trackSetArrRef={trackSetArrRef}/>
            </Canvas>

            {/* Overlays */}
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
        </div>
    );
}

