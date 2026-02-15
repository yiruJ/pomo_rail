import MainStationModel from "../components/MainStationModel";
import TrainModel from "../components/TrainModel";
import TrackSetModel from "../components/TrackSetModel";
import TreeTwoModel from "../components/TreeTwoModel";
import MiniStationModel from "../components/MiniStationModel";
import CloudModel from "../components/CloudModel";
import { useRef, useEffect, useState } from "react";
import { MODEL_LOAD } from "../constants/Models";

export default function LoadModels( {miniStationRef, mainStationRef, trackSetArrRef, treeSetArrRef, cloudRef, isVisible} ) {
    const trainRef = useRef(null);

    return (
        <>
            {isVisible.mainStation && (
                <MainStationModel 
                    castShadow 
                    scale={MODEL_LOAD.MAIN.scale} 
                    position={MODEL_LOAD.MAIN.pos} 
                    rotation={MODEL_LOAD.MAIN.rotation}
                    ref={mainStationRef}
                />
            )}

            {isVisible.miniStation && (
                <MiniStationModel 
                    castShadow 
                    scale={MODEL_LOAD.MINI.scale} 
                    rotation={MODEL_LOAD.MINI.rotation}
                    ref={miniStationRef}
                />
            )}

            <TrainModel 
                castShadow 
                scale={MODEL_LOAD.TRAIN.scale} 
                position={MODEL_LOAD.TRAIN.pos} 
                rotation={MODEL_LOAD.TRAIN.rotation}
                ref={trainRef}
            />
            <LoadTrackSets trackSetArrRef={trackSetArrRef} />
            <LoadTreeSets treeSetArrRef={treeSetArrRef} />
            <LoadClouds trainRef={trainRef} isVisible={isVisible} cloudRef={cloudRef} />
        </>
    )
}

function LoadClouds({trainRef, isVisible, cloudRef }) {
    const [cloudPosition, setCloudPosition] = useState(null);

    useEffect(() => {
        const check = setInterval(() => {
            if (trainRef.current) {
                const funnelPos = trainRef.current.getFunnelPos();
                setCloudPosition([funnelPos.x, funnelPos.y, funnelPos.z]);
                clearInterval(check); 
            }
        }, 100);

        return () => clearInterval(check); 
    }, []); 

    if (!cloudPosition) return null;

    return (
        <CloudModel 
            castShadow 
            scale={MODEL_LOAD.CLOUD.scale} 
            position={cloudPosition} 
            rotation={MODEL_LOAD.CLOUD.rotation}
            visible={isVisible.cloud}
            ref={cloudRef}
        />
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
                    position={[-i * 212.7, 0, 18.5]}
                    rotation={MODEL_LOAD.TRACK_SET.rotation}
                    scale={MODEL_LOAD.TRACK_SET.scale}
                />
            ))

            }
        </>
    )
}

function LoadTreeSets({ treeSetArrRef }) {
    return (
        <>
            {Array.from({ length: 8}, (_, i) => (
                <TreeTwoModel
                    key={i}
                    ref={(treeSet) => {
                        if (treeSet) treeSetArrRef.current[i] = treeSet;
                    }}
                    position={useRandomTreeCoordinate()}
                    rotation={MODEL_LOAD.TREE.rotation}
                    scale={MODEL_LOAD.TREE.scale}
                />
            ))

            }
        </>
    )
}

export function useRandomTreeCoordinate() {
    const randomZ = useRef(getRandomNum(-50, -5)); 
    const randomX = useRef(getRandomNum(-140, -250)); 
    return [randomX.current, -0.2, randomZ.current];
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}