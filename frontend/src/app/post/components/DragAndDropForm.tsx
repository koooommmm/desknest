'use client';
import Image from 'next/image';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const DragAndDropForm: React.FC = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
    },
    maxFiles: 2,
    onDropRejected(fileRejections) {
      const errors = fileRejections.map(({ errors }) =>
        errors.map((e) => e.message).join(', ')
      );
      console.error(errors);
    },
  });

  const images = acceptedFiles.map((file) => (
    <div
      key={file.path}
      className='relative w-24 h-24 overflow-hidden rounded-lg shadow-lg'
    >
      <Image
        src={URL.createObjectURL(file)}
        alt={file.name}
        layout='fill'
        objectFit='cover'
        className='object-cover w-full h-full'
      />
    </div>
  ));

  return (
    <section className='container mx-auto p-4 max-w-md'>
      <div
        {...getRootProps({
          className:
            'border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center rounded-lg cursor-pointer transition duration-200 hover:bg-gray-100 focus:outline-none',
        })}
      >
        <input {...getInputProps()} />
        <p className='text-gray-500'>
          Drag and drop some image files here, or click to select files
        </p>
      </div>
      <aside className='mt-4'>
        <h4 className='text-lg font-semibold text-gray-800 mb-2'>Preview</h4>
        <div className='flex flex-wrap gap-4'>{images}</div>
      </aside>
    </section>
  );
};

export default DragAndDropForm;
