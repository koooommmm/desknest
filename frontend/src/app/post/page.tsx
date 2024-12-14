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
    <section className='container mx-auto'>
      <DragAndDropForm></DragAndDropForm>
      <section className='container mx-auto w-3/4'>
        <h4 className='text-lg font-semibold text-gray-800 mb-2 mt-4'>
          Description
        </h4>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder='Enter a description for your post...'
          className='w-full mt-2 p-4 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-100 placeholder-gray-500 text-gray-700'
        />
      </section>

      <div className='flex justify-center items-center mt-6'>
        <button
          type='submit'
          className='mt-6 w-1/5 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150'
        >
          Post
        </button>
      </div>
    </section>
  );
};

export default Post;
