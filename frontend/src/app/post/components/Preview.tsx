'use client';
import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  file: File;
}

const Preview: React.FC<PreviewProps> = ({ file }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const dstWidth = 1024;
      const scale = dstWidth / img.width;
      const dstHeight = img.height * scale;

      canvas.width = dstWidth;
      canvas.height = dstHeight;

      ctx.drawImage(img, 0, 0, dstWidth, dstHeight);
    };

    return () => {
      URL.revokeObjectURL(img.src);
    };
  }, [file]);

  return (
    <div className='flex justify-center items-center'>
      <canvas
        ref={canvasRef}
        className='border border-gray-300 rounded-lg shadow-lg'
      />
    </div>
  );
};

export default Preview;
