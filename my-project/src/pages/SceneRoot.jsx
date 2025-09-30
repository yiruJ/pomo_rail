import { Canvas } from "@react-three/fiber";
import { Environment, CameraControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { WorldLights } from "../scenes/WorldLights";
import { Walls } from "../scenes/Walls";
import MainStationModel from "../components/MainStationModel";
import TrainModel from "../components/TrainModel";
import TitleUI from "./TitleUI";
import HomeUI from "./HomeUI";
import handleTimer, { TIMER } from "../hooks/handleTimer";
import { SESSION, CAMERA_POSES } from "../scenes/CameraPoses";
import * as THREE from "three";

export default function Title() {
    const { timerType, currentMinutes, setTimerType, updateTimer } = handleTimer();
    const camCtrlRef = useRef(null);
    const SESSION = {
        TITLE: "title",
        HOME: "home",
        START: "start",
        PAUSE: "pause",
        ONGOING: "ongoing",
        END: "end"
    };
    const [sessionState, setSessionState] = useState(SESSION.TITLE);

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
                    position={[-5, 0, 20]} 
                    rotation={[0, Math.PI, 0]}
                />
            </>
        )
    }

    function handleCamera(inst) {
        if (inst && sessionState === SESSION.TITLE) {
            inst.camera.up.set(0, 1, 0);
            return inst.setLookAt(-5.5, 70.8, 12.6,  -5.2, 81.3, -19,  false);
        } else if (inst && sessionState === SESSION.HOME) {
            return inst.setLookAt(-65, 80, 100, -50, 55, 45, true);
        }
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
          timerType={timerType}
          currentMinutes={currentMinutes}
          setTimerType={setTimerType}
          updateTimer={updateTimer}
          onStart={() => setSessionState(SESSION.HOME)}
        />
      )}
      {sessionState === SESSION.HOME && (
        <HomeUI
          timerType={timerType}
          setTimerType={setTimerType}
          currentMinutes={currentMinutes}
          onStart={() => setSessionState(SESSION.START)}
        />
      )}
        </div>
    );
}

