import React from 'react';
import PlusButton from './components/PlusButton';
import PostList from './components/PostList';

const Dashboard: React.FC = () => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <PostList />
      <PlusButton />
    </div>
  );
};

export default Dashboard;
