import React from 'react';

type Post = {
  id: number;
  title: string;
  image: string;
  description: string;
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className='border rounded-lg overflow-hidden shadow-lg'>
      <img
        src={post.image}
        alt={post.title}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h2 className='text-lg font-semibold'>{post.title}</h2>
        <p className='text-sm text-gray-600'>{post.description}</p>
      </div>
    </div>
  );
};

export default PostCard;
