import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='text-center'>
      <h1 className='text-3xl font-bold my-8'>Welcome to DeskNest</h1>
      <p className='mb-4'>Sign in to see posts from other users.</p>
      <Link href='/dashboard' className='text-blue-500 underline'>
        Go to dashboard
      </Link>
    </div>
  );
}
