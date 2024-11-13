import Link from 'next/link';
import React from 'react';

const PlusButton: React.FC = () => {
  return (
    <Link href='/post'>
      <button
        className='fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-blue-600'
        aria-label='Add Post'
      >
        +
      </button>
    </Link>
  );
};

export default PlusButton;
