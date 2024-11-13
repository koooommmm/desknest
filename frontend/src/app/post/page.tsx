'use client';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DragAndDropForm: React.FC = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
  });

  const [description, setDescription] = useState('');

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const files = acceptedFiles.map((file) => (
    <div
      key={file.path}
      className='w-24 h-24 overflow-hidden rounded-lg shadow-lg'
    >
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
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
          Drag 'n' drop some image files here, or click to select files
        </p>
      </div>

      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder='Enter a description for your post...'
        className='mt-4 w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-100 placeholder-gray-500 text-gray-700'
      />

      <aside className='mt-4'>
        <h4 className='text-lg font-semibold text-gray-800 mb-2'>Preview</h4>
        <div className='flex flex-wrap gap-4'>{files}</div>
      </aside>

      <button
        type='submit'
        className='mt-6 w-full py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150'
      >
        Post
      </button>
    </section>
  );
};

export default DragAndDropForm;