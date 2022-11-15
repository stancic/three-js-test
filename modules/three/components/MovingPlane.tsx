import { useFrame } from '@react-three/fiber';
import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import { Color, Vector2 } from 'three';
import fragmentShader from '../shaders/fragmentShader';
import vertexShader from '../shaders/vertexShader';

export const MovingPlane: React.FC = () => {
  const mesh = useRef<PlaneGeometryComponent>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const vpRatio = window.innerWidth / window.innerHeight;
    mousePosition.current = {
      x: (e.clientX / window.innerWidth) * vpRatio,
      y: 1 - e.clientY / window.innerHeight,
    };
  }, []);

  const resetMousePosition = useCallback(() => {
    console.log('reset');
    mousePosition.current = { x: -1, y: -1 };
  }, []);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0,
      },
      u_resolution: {
        type: 'v2',
        value: new Vector2(
          window.innerWidth,
          window.innerHeight
        ).multiplyScalar(window.devicePixelRatio),
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_colorMouse: { value: new Color('#FEFDFE') },
      u_colorB: { value: new Color('#3B4C6A') },
      u_bg: { value: new Color('#4A287C') },
      u_colorA: { value: new Color('#212649') },
    }),
    []
  );

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, false);
    window.addEventListener('resize', resetMousePosition, false);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition, false);
      window.addEventListener('resize', resetMousePosition, false);
    };
  }, [updateMousePosition, resetMousePosition]);

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.material.uniforms.u_time.value += 0.05;
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
      mousePosition.current.x,
      mousePosition.current.y
    );
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[6, 6, 120, 120]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
