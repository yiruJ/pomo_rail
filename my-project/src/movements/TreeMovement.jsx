import { useRef, useState, useEffect, useCallback } from "react";
import { SESSION } from "../constants/Sessions";

export default function TreeMovement({ speedRef, treeSetArrRef, sessionState, setIsVisible }) {
    const hasShownTrees = useRef(false);

    useEffect(() => {
        if (sessionState === SESSION.START && !hasShownTrees.current) {
            hasShownTrees.current = true;
            
            const delay = setTimeout(() => {
                setIsVisible(prev => ({
                    ...prev,
                    trees: true,
                }));
            }, 4000);
            
            return () => clearTimeout(delay);
        }
    }, [sessionState, setIsVisible]);
    
    // useFrame((_, delta) => {
    // });

    return null;
}