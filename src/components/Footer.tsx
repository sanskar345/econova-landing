import type { Footer } from '@/types/contentful';
import React from 'react';

export default function Footer({ copyright }: Footer) {
  return (
    <footer className="bg-green-700 text-gray-300 py-2">
      <div className="container flex justify-center items-center">
        <div className="text-sm">{copyright}</div>
      </div>
    </footer>
  );
}