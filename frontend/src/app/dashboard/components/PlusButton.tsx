import Link from 'next/link';
import React from 'react';

const PlusButton: React.FC = () => {
  return (
    <Link href='/post'>
      <button
        className='fixed bottom-6 right-6 w-14 h-14 bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700'
        aria-label='Add Post'
      >
        +
      </button>
    </Link>
  );
};

export default PlusButton;
