'use client';

import type { ReactNode } from 'react';

type WallpaperHeroProps = {
  children?: ReactNode;
  backgroundImage?: string;
};

/**
 * WallpaperHero — Full-width branded wallpaper section
 * Spans end-to-end on the main content
 */
export function WallpaperHero({
  children,
  backgroundImage = '/wallpaper.png',
}: WallpaperHeroProps) {
  return (
    <section
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden -mt-5 sm:-mt-6 lg:-mt-8"
      style={{
        aspectRatio: '16 / 9',
        minHeight: '400px',
        marginBottom: '4rem',
      }}
    >
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="img"
        aria-label="io Design System brand wallpaper"
      />

      {/* Content Container */}
      {children && (
        <div className="relative h-full flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16">
          {children}
        </div>
      )}
    </section>
  );
}
