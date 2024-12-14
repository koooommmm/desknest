'use client';
import React, { useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { CiCirclePlus } from 'react-icons/ci';

interface Marker {
  x: number;
  y: number;
  text: string;
}

interface PreviewProps {
  file: File;
}

const Preview: React.FC<PreviewProps> = ({ file }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  // SVGアイコンをCanvas用の画像データに変換
  const createIconImage = async () => {
    const svgString = renderToString(<CiCirclePlus size={25} color='white' />);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.src = url;

    return new Promise<HTMLImageElement>((resolve) => {
      img.onload = () => {
        URL.revokeObjectURL(url); // メモリリーク防止のため解放
        resolve(img);
      };
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const dstWidth = 1024;
      const scale = dstWidth / img.width;
      const dstHeight = img.height * scale;

      canvas.width = dstWidth;
      canvas.height = dstHeight;

      // 背景画像を描画
      ctx.drawImage(img, 0, 0, dstWidth, dstHeight);

      // マーカーを描画
      const iconImage = await createIconImage();
      drawMarkers(ctx, markers, iconImage);
    };

    return () => {
      URL.revokeObjectURL(img.src);
    };
  }, [file, markers]);

  const drawMarkers = (
    ctx: CanvasRenderingContext2D,
    markers: Marker[],
    iconImage: HTMLImageElement
  ) => {
    markers.forEach((marker) => {
      const iconSize = 25;
      const gradient = ctx.createLinearGradient(
        marker.x - iconSize / 2,
        marker.y - iconSize / 2,
        marker.x + iconSize / 2,
        marker.y + iconSize / 2
      );
      gradient.addColorStop(0, '#800080');
      gradient.addColorStop(1, '#fad0c4');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(marker.x, marker.y, iconSize / 2, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();

      ctx.drawImage(
        iconImage,
        marker.x - iconSize / 2,
        marker.y - iconSize / 2,
        iconSize,
        iconSize
      );
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const text = prompt('Enter text for marker:');
    if (text) {
      setMarkers([...markers, { x, y, text }]);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <canvas
        ref={canvasRef}
        className='border border-gray-300 rounded-lg shadow-lg'
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default Preview;
