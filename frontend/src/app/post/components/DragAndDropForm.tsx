'use client';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import Preview from './Preview';

const DragAndDropForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
    },
    maxFiles: 1,
    onDropAccepted: (files) => {
      setSelectedFile(files[0]);
      setErrorMessage(null); // Clear previous error
    },
    onDropRejected: () => {
      setErrorMessage('Please select only one image file.');
    },
  });

  return (
    <>
      {errorMessage && (
        <h3 className='text-red-500 text-center'>{errorMessage}</h3>
      )}

      <section className='container mx-auto p-4 max-w-md'>
        {/* Drag and Drop Area */}
        <div
          {...getRootProps({
            className:
              'border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center rounded-lg cursor-pointer transition duration-200 hover:bg-gray-100 focus:outline-none',
          })}
        >
          <input {...getInputProps()} />
          <p className='text-gray-500'>
            Drag and drop an image here, or click to select a file
          </p>
        </div>

        {/* Preview Section */}
        <aside className='mt-4'>
          <h4 className='text-lg font-semibold text-gray-800 mb-2'>Preview</h4>
          {selectedFile && <Preview file={selectedFile} />}
        </aside>
      </section>
    </>
  );
};

export default DragAndDropForm;
