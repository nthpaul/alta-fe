'use client';

import React from 'react';
import TopNavbar from '@/components/layout/top-navbar';

export default function Home() {

  return (
    <div className="h-full w-full">
      <main className="flex flex-col gap-8 row-start-2 items-start">
        <TopNavbar title='Outfits' />
      </main>
    </div>
  );
}

