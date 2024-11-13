'use client';
import React, { useState } from 'react';
import DragAndDropForm from './components/DragAndDropForm';
const Post: React.FC = () => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  return (
    <section className='container mx-auto p-4 max-w-md'>
      <DragAndDropForm></DragAndDropForm>

      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder='Enter a description for your post...'
        className='mt-4 w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-100 placeholder-gray-500 text-gray-700'
      />

      <button
        type='submit'
        className='mt-6 w-full py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150'
      >
        Post
      </button>
    </section>
  );
};

export default Post;
