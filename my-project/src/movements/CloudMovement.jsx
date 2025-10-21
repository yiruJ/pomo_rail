import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function CloudMovement({ cloudRef, speedRef, setIsVisible }) {
    const timeRef = useRef(0);
    const initialRef = useRef(null);
    const hasStarted = useRef(false);
    const isFinishing = useRef(false);
    const scaleLim = 1;
        const wasMoving = useRef(false); // Track if we were moving before pause

    useFrame((_, delta) => {
        if (!cloudRef.current) return;
        
        // Store initial position once cloud is visible and positioned
        if (!initialRef.current && !hasStarted.current) {
            initialRef.current = {
                x: cloudRef.current.position.x,
                y: cloudRef.current.position.y,
                z: cloudRef.current.position.z,
                s: {
                    x: cloudRef.current.scale.x,
                    y: cloudRef.current.scale.y,
                    z: cloudRef.current.scale.z
                }
            };
            hasStarted.current = true;
            return;
        }

        if (!initialRef.current) return;

        // Track if we're currently moving
        const isMoving = speedRef.current > 0;
        
        // If we were moving and now paused, start finishing mode
        if (wasMoving.current && !isMoving && !isFinishing.current && timeRef.current > 0) {
            isFinishing.current = true;
        }
        
        // Update wasMoving for next frame
        wasMoving.current = isMoving;

        // Continue animation if finishing or if speed > 0
        if (isFinishing.current) {
            timeRef.current += delta * 2; // Use constant speed when finishing
        } else if (speedRef.current > 0) {
            timeRef.current += delta * 2; // Normal animation
        } else {
            return; // Paused and not finishing, don't animate
        }
        const initial = initialRef.current;
        
        // Timing parameters
        const fadeInStartTime = 0;
        const fadeInEndTime = 1;
        const fadeOutStartTime = 3;
        const fadeOutEndTime = 4;
        const cycleDuration = 5;
        
        // Reset cycle when complete
        if (timeRef.current > cycleDuration) {
            timeRef.current = 0;
            isFinishing.current = false; // Reset finishing state
            
            // Reset position to initial
            cloudRef.current.position.x = initial.x;
            cloudRef.current.position.y = initial.y;
            cloudRef.current.position.z = initial.z;
            
            // Reset scale to initial
            cloudRef.current.scale.x = initial.s.x;
            cloudRef.current.scale.y = initial.s.y;
            cloudRef.current.scale.z = initial.s.z;
            
            return;
        }
        
        // Move backwards (positive x direction since train faces backwards)
        cloudRef.current.position.x = initial.x + timeRef.current * 5;
        
        // Parabolic upward curve
        cloudRef.current.position.y = initial.y + Math.sqrt(timeRef.current) * 5;

        // Gradually increase size
        const growthFactor = Math.min(timeRef.current * 0.6, scaleLim - initial.s.x);
        cloudRef.current.scale.x = initial.s.x + growthFactor;
        cloudRef.current.scale.y = initial.s.y + growthFactor;
        cloudRef.current.scale.z = initial.s.z + growthFactor;

        // Calculate opacity based on time
        let opacity = 1.0;
        
        // Fade in at the beginning
        if (timeRef.current < fadeInEndTime) {
            const fadeInProgress = (timeRef.current - fadeInStartTime) / (fadeInEndTime - fadeInStartTime);
            opacity = Math.min(1, fadeInProgress);
        }
        // Fade out at the end
        else if (timeRef.current > fadeOutStartTime) {
            const fadeOutProgress = (timeRef.current - fadeOutStartTime) / (fadeOutEndTime - fadeOutStartTime);
            opacity = Math.max(0, 1 - fadeOutProgress);
        }
        
        // Apply opacity
        cloudRef.current.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.opacity = opacity;
            }
        });
    });

    return null;
}