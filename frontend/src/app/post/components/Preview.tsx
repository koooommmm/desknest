'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Marker {
  x: number;
  y: number;
  text: string;
  visible: boolean;
}

interface PreviewProps {
  file: File;
}

const Preview: React.FC<PreviewProps> = ({ file }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const ASPECT_WIDTH = 16;
      const ASPECT_HEIGHT = 9;
      const MAX_WIDTH = 400;
      const MAX_HEIGHT = (MAX_WIDTH / ASPECT_WIDTH) * ASPECT_HEIGHT;

      canvas.width = MAX_WIDTH;
      canvas.height = MAX_HEIGHT;

      const aspectRatio = img.width / img.height;
      let drawWidth = img.width;
      let drawHeight = img.height;

      if (aspectRatio > ASPECT_WIDTH / ASPECT_HEIGHT) {
        drawWidth = img.height * (ASPECT_WIDTH / ASPECT_HEIGHT);
        drawHeight = img.height;
      } else {
        drawWidth = img.width;
        drawHeight = img.width * (ASPECT_HEIGHT / ASPECT_WIDTH);
      }

      const offsetX = (canvas.width - drawWidth) / 2;
      const offsetY = (canvas.height - drawHeight) / 2;

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

      drawMarkers(ctx, markers);
    };

    return () => {
      URL.revokeObjectURL(img.src);
    };
  }, [file, markers]);

  const drawMarkers = (ctx: CanvasRenderingContext2D, markers: Marker[]) => {
    markers.forEach((marker) => {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(marker.x, marker.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedMarkerIndex = markers.findIndex(
      (marker) => Math.sqrt((marker.x - x) ** 2 + (marker.y - y) ** 2) < 10 // マーカー半径内を判定
    );

    if (clickedMarkerIndex !== -1) {
      setSelectedMarkerIndex(clickedMarkerIndex); // 既存マーカーを選択
      const newMarkers = markers.map((marker, index) => ({
        ...marker,
        visible: index === clickedMarkerIndex, // 選択したマーカーのみ表示
      }));
      setMarkers(newMarkers);
    } else {
      const newMarkers = markers.map((marker) => ({
        ...marker,
        visible: false, // 既存のテキストボックスを非表示
      }));
      setMarkers([...newMarkers, { x, y, text: '', visible: true }]);
      setSelectedMarkerIndex(markers.length); // 新しいマーカーを選択
      console.log(selectedMarkerIndex);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newMarkers = [...markers];
    newMarkers[index].text = e.target.value;
    setMarkers(newMarkers);
  };

  const handleDeleteMarker = (index: number) => {
    setMarkers((prev) => prev.filter((_, i) => i !== index));
    setSelectedMarkerIndex(null);
  };

  const handleToggleVisibility = (index: number) => {
    const newMarkers = markers.map((marker, i) =>
      i === index ? { ...marker, visible: !marker.visible } : marker
    );
    setMarkers(newMarkers);
    setSelectedMarkerIndex(null); // 非表示にした場合選択状態を解除
  };

  return (
    <div className='relative'>
      <canvas
        ref={canvasRef}
        className='border border-gray-300 rounded-lg shadow-lg'
        onClick={handleCanvasClick}
      />
      {markers.map((marker, index) =>
        marker.visible ? (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: marker.y - 10,
              left: marker.x + 10,
            }}
            className='absolute bg-white border border-gray-300 rounded px-2 py-1 text-sm shadow-lg'
          >
            <input
              type='text'
              value={marker.text}
              onChange={(e) => handleInputChange(e, index)}
              className='w-40'
            />
            <button
              onClick={() => handleDeleteMarker(index)}
              className='ml-2 bg-red-500 text-white px-2 py-1 rounded text-xs'
            >
              DELETE
            </button>
            <button
              onClick={() => handleToggleVisibility(index)}
              className='ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs'
            >
              OK
            </button>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Preview;
