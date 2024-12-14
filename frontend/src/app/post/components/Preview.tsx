'use client';
import React, { useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { CiCirclePlus } from 'react-icons/ci';

interface Marker {
  x: number;
  y: number;
  title: string;
  description: string;
}

interface PreviewProps {
  file: File;
}

const Preview: React.FC<PreviewProps> = ({ file }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

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

    const clickedMarkerIndex = markers.findIndex(
      (marker) => Math.sqrt((marker.x - x) ** 2 + (marker.y - y) ** 2) < 10 // マーカー半径内を判定
    );
    if (clickedMarkerIndex !== -1) {
      // マーカーをクリックした場合、モーダルを開く
      setSelectedMarker(markers[clickedMarkerIndex]);
      setModalTitle(markers[clickedMarkerIndex].title);
      setModalDescription(markers[clickedMarkerIndex].description);
      setIsModalOpen(true);
    } else {
      const marker = { x, y, title: '', description: '' };
      setMarkers([...markers, marker]);
      setSelectedMarker(marker);
      setModalTitle('');
      setModalDescription('');
      setIsModalOpen(true);
    }
  };

  const handleModalSave = () => {
    // 既存のマーカーを更新
    const updatedMarkers = markers.map((marker) =>
      marker === selectedMarker
        ? { ...marker, title: modalTitle, description: modalDescription }
        : marker
    );
    setMarkers(updatedMarkers);
    closeModal();
  };

  const handleModalDelete = () => {
    const updatedMarkers = markers.filter(
      (marker) => marker !== selectedMarker
    );
    setMarkers(updatedMarkers);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMarker(null);
  };

  return (
    <div
      className='flex justify-center items-center relative'
      ref={containerRef}
      style={{ width: '1024px', height: 'auto' }}
    >
      <canvas
        ref={canvasRef}
        className='border border-gray-300 rounded-lg shadow-lg'
        onClick={handleCanvasClick}
      />
      {isModalOpen && selectedMarker && containerRef.current && (
        <div
          className='absolute bg-white border border-gray-300 rounded p-4 shadow-lg'
          style={{
            top: selectedMarker.y,
            left: selectedMarker.x + 10,
            zIndex: 10,
          }}
        >
          <label className='block mb-2'>Title</label>
          <input
            type='text'
            className='mb-4 p-2 border border-gray-300 rounded w-full'
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
          />
          <label className='block mb-2'>Description</label>
          <textarea
            className='mb-4 p-2 border border-gray-300 rounded w-full'
            value={modalDescription}
            onChange={(e) => setModalDescription(e.target.value)}
          />
          <button
            className='mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600'
            onClick={handleModalSave}
          >
            Save
          </button>
          <button
            className='ml-2 mt-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400'
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className='ml-2 mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
            onClick={handleModalDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Preview;
