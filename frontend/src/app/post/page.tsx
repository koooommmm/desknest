// src/app/post/page.tsx
'use client';

import React, { useState } from 'react';

const PostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  return <div></div>;
};

export default PostPage;
