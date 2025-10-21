import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, CameraControls } from "@react-three/drei";
import { useRef, useState, useEffect, useCallback } from "react";
import { WorldLights } from "../scenes/WorldLights";
import { Walls } from "../scenes/Walls";
import TitleUI from "./TitleUI";
import HomeUI from "./HomeUI";
import StartSession from "../sessions/StartSession";
import handleTimer from "../hooks/TimerSettings";
import OpenGate from "../movements/OpenGate";
import { CAMERA_POSES } from "../constants/CameraPoses";
import * as THREE from "three";
import { SESSION } from "../constants/Sessions";
import { AnimatePresence } from "framer-motion";
import { MainStationMovement } from "../movements/MainStationMovement";
import SpeedController from "../movements/SpeedController";
import TrackMovement from "../movements/TrackMovement";
import TreeMovement from "../movements/TreeMovement";
import { MiniStationMovement } from "../movements/MiniStationMovement";
import { CloudMovement } from "../movements/CloudMovement";
import LoadModels from "../scenes/LoadModels";
import UpdateTrackSetPos from "../scenes/UpdateTrackSetPos";
import UpdateTreeSetPos from "../scenes/UpdateTreeSetPos";
import BreakSession from "../sessions/BreakSession";
import { TIMER } from "../constants/Timers";

export default function Title() {
    const { timerType, currentMinutes, setTimerType, updateTimer } = handleTimer();
    const camCtrlRef = useRef(null);
    const mainStationRef = useRef(null);
    const miniStationRef = useRef(null);
    const trackSetArrRef = useRef([]);
    const treeSetArrRef = useRef([]);
    const cloudRef = useRef(null);
    const speedRef = useRef(0);
    const [sessionState, setSessionState] = useState(SESSION.TITLE);
    const [isVisible, setIsVisible] = useState({
        mainStation: true,
        train: true,
        tracks: true,
        trees: false,
        miniStation: true,
        cloud: false,
    });
    const [moveStation, setMoveStation] = useState(false);

    function handleCamera(inst) {
        if (!inst) return;   
        inst.camera.up.set(0, 1, 0);
        const { pos, target, smooth } = CAMERA_POSES[sessionState]; 
        inst.setLookAt(...pos, ...target, smooth);
    }

    return (
        <div className="relative">
            <Canvas
                dpr={[1, 2]}
                shadows
                style={{ width: '100%', height: '100vh'}}
                camera={{ position: [-5.5, 70.8, 12.6], fov: 50 }}
                gl={{ shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap } }}>
                <WorldLights/>
                <LoadModels miniStationRef={miniStationRef} mainStationRef={mainStationRef} trackSetArrRef={trackSetArrRef} treeSetArrRef={treeSetArrRef} isVisible={isVisible} cloudRef={cloudRef}/>
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
                <SpeedController sessionState={sessionState} speedRef={speedRef} setIsVisible={setIsVisible}/>
                <OpenGate gateRef={mainStationRef} active={sessionState === SESSION.START}/>
                <MainStationMovement speedRef={speedRef} mainStationRef={mainStationRef} setIsVisible={setIsVisible} />
                <MiniStationMovement miniStationRef={miniStationRef} speedRef={speedRef} moveStation={moveStation} setMoveStation={setMoveStation}/>
                <CloudMovement cloudRef={cloudRef} speedRef={speedRef} setIsVisible={setIsVisible}/>
                <TreeMovement speedRef={speedRef} treeSetArrRef={treeSetArrRef} sessionState={sessionState} setIsVisible={setIsVisible}/>
                <TrackMovement speedRef={speedRef} trackSetArrRef={trackSetArrRef}/>
                <UpdateTrackSetPos trackSetArrRef={trackSetArrRef}/>
                <UpdateTreeSetPos treeSetArrRef={treeSetArrRef}/>
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
                        onStart={() => {setSessionState(SESSION.START); setTimerType(TIMER.POMO)}}
                    />
                )}

                {(sessionState === SESSION.START || sessionState === SESSION.PLAY || sessionState === SESSION.PAUSE_START) && (
                    <StartSession
                        setTimerType={setTimerType}
                        currentMinutes={currentMinutes}
                        onPause={() => setSessionState(SESSION.PAUSE_START)}
                        onPlay={() => setSessionState(SESSION.PLAY)}
                        sessionState={sessionState}
                        setSessionState={setSessionState}
                        setIsVisible={setIsVisible}
                        setMoveStation={setMoveStation}
                    />
                )}

                {(sessionState === SESSION.BREAK || sessionState === SESSION.PAUSE_BREAK) && (
                    <BreakSession 
                        setTimerType={setTimerType}
                        currentMinutes={currentMinutes}
                        onPause={() => setSessionState(SESSION.PAUSE_BREAK)}
                        onResume={() => setSessionState(SESSION.BREAK)}
                        sessionState={sessionState}
                        setSessionState={setSessionState}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

