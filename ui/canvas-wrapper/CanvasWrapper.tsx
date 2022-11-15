import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

interface Props {
  children: React.ReactNode;
}

export const CanvasWrapper: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Canvas
      camera={{
        position: [0, 0, 1],
      }}
    >
      {children}
    </Canvas>
  );
};
