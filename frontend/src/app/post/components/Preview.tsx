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
      // 16:9 アスペクト比の固定サイズ
      const ASPECT_WIDTH = 16;
      const ASPECT_HEIGHT = 9;
      const MAX_WIDTH = 400; // 固定の幅
      const MAX_HEIGHT = (MAX_WIDTH / ASPECT_WIDTH) * ASPECT_HEIGHT; // 高さは16:9に基づく

      canvas.width = MAX_WIDTH;
      canvas.height = MAX_HEIGHT;

      // 画像の縦横比
      const aspectRatio = img.width / img.height;

      let drawWidth = img.width;
      let drawHeight = img.height;

      // 縦横比を維持してリサイズ
      if (aspectRatio > ASPECT_WIDTH / ASPECT_HEIGHT) {
        // 横長画像の場合
        drawWidth = img.height * (ASPECT_WIDTH / ASPECT_HEIGHT);
        drawHeight = img.height;
      } else {
        // 縦長画像または正方形の場合
        drawWidth = img.width;
        drawHeight = img.width * (ASPECT_HEIGHT / ASPECT_WIDTH);
      }

      const offsetX = (canvas.width - drawWidth) / 2;
      const offsetY = (canvas.height - drawHeight) / 2;

      // 描画
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );
    };

    return () => {
      // メモリリーク防止
      URL.revokeObjectURL(img.src);
    };
  }, [file]);

  return (
    <canvas
      ref={canvasRef}
      className='border border-gray-300 rounded-lg shadow-lg'
    />
  );
};

export default Preview;
