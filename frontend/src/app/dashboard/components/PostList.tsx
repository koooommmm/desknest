import React from 'react';
import PostCard from './PostCard';

const dummyPosts = [
  {
    id: 1,
    title: 'First Post',
    image: '/images/sample1.jpg',
    description: 'This is the first post.',
  },
  {
    id: 2,
    title: 'Second Post',
    image: '/images/sample2.jpg',
    description: 'This is the second post.',
  },
];

const PostList: React.FC = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {dummyPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
