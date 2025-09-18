// CameraRail.jsx
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

function easeInOutCubic(t) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
}

export default function CameraRail({
  play,                 // boolean: start animation
  onDone,               // callback when finished
  duration = 4000,      // ms
  controlsRef,          // ref to <OrbitControls />
  lookAtTarget = new THREE.Vector3(0, 77, 0), // where to look
}) {
  const { camera } = useThree();
  const startRef = useRef(null);

  // Define the path once (edit these points to shape your arc/curve)
  const path = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(  3.5, 74, 12),  // current cam approx
        new THREE.Vector3( 10,   60,  8),  // mid control
        new THREE.Vector3(  6,   40, 18),  // lower & forward
        new THREE.Vector3(  0,   25, 30),  // final position
      ],
      false,           // closed
      "catmullrom",    // type
      0.5              // tension
    );
  }, []);

  // Optional: pre-sample path to debug or draw a line

  useEffect(() => {
    if (play) {
      startRef.current = performance.now();
      // lock controls while animating
      if (controlsRef?.current) controlsRef.current.enabled = false;
    }
  }, [play, controlsRef]);

  useFrame(() => {
    if (!play || startRef.current == null) return;
    const elapsed = performance.now() - startRef.current;
    const t = Math.min(1, elapsed / duration);
    const e = easeInOutCubic(t);

    const pos = path.getPointAt(e);     // camera position along curve
    camera.position.copy(pos);

    // Look either at a fixed target or along the path tangent
    camera.lookAt(lookAtTarget);
    camera.updateProjectionMatrix();

    if (t >= 1) {
      startRef.current = null;
      if (controlsRef?.current) controlsRef.current.enabled = true;
      onDone?.();
    }
  });

  return null;
}
