import Link from 'next/link';
import React from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body className='bg-gray-50 text-gray-800'>
        <header className='border-b border-gray-200 p-4'>
          <Link href='/'>
            <h1 className='text-lg font-semibold'>DeskNest</h1>
          </Link>
        </header>
        <main className='p-4'>{children}</main>
      </body>
    </html>
  );
}
