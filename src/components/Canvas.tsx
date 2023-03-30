import React from 'react'
import { useRef, useEffect, useState } from 'react'
import BG from '../images/bg.png'

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [squarePosition, setSquarePosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d')!;
    const image = new Image()
    image.src = BG;

    const drawSquare = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.fillStyle = 'blue';
      ctx.fillRect(squarePosition.x, squarePosition.y, 50, 50);
    };

    image.onload = function() {
      ctx.drawImage(image, 0, 0, canvas!.width, canvas!.height)
    }
    drawSquare();

  }, [squarePosition, BG]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (
      x >= squarePosition.x &&
      x <= squarePosition.x + 50 &&
      y >= squarePosition.y &&
      y <= squarePosition.y + 50
    ) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left - 25;
      const y = event.clientY - rect.top - 25;
      setSquarePosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  )
}

export default Canvas
