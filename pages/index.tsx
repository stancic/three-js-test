import { MovingPlane } from '@modules/three';
import { CanvasWrapper } from '@ui/canvas-wrapper';

export default function Home() {
  return (
    <CanvasWrapper>
      <ambientLight intensity={1} />
      <MovingPlane />
    </CanvasWrapper>
  );
}
