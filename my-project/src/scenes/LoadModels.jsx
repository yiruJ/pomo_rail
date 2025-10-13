import MainStationModel from "../components/MainStationModel";
import TrainModel from "../components/TrainModel";
import TrackSetModel from "../components/TrackSetModel";
import TreeTwoModel from "../components/TreeTwoModel";
import { useRef } from "react";

export default function LoadModels( {mainStationRef, trackSetArrRef, treeSetArrRef, isVisible} ) {
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
            <LoadTreeSets treeSetArrRef={treeSetArrRef} />
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
                    rotation={[0, Math.PI, 0]}
                    scale={1}
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