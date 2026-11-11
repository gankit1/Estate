"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { PropertyImage } from "@/types";

/* ── Lightbox ───────────────────────────────────────────────── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: PropertyImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const image = images[currentIndex];

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);

    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-modal bg-black/90 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Close gallery"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/70 text-sm font-mono">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Previous image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-full max-w-5xl aspect-[16/10] mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.url}
          alt={image.caption ?? `Image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Next image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Caption */}
      {image.caption && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
          {image.caption}
        </div>
      )}
    </div>
  );
}

/* ── PropertyGallery ────────────────────────────────────────── */
interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const next = React.useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, [images.length]);

  const prev = React.useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  if (images.length === 0) return null;

  const mainImage = images[0];
  const secondaryImages = images.slice(1, 5);
  const remaining = images.length - 5;

  return (
    <>
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-sm overflow-hidden bg-sand-100 border border-[#E5DFD7] shadow-[0_4px_24px_rgba(44,32,24,0.06)]">
        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider rounded-xs flex items-center gap-1.5 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Verified Listing
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-mono rounded-xs border border-white/20">
            {images.length} {images.length === 1 ? "Photo" : "Photos"}
          </span>
        </div>

        {images.length === 1 ? (
          /* Single Image: Full-width cinematic showcase */
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="relative w-full h-full overflow-hidden group cursor-pointer block"
            aria-label={`View ${mainImage.caption ?? title} in full size`}
          >
            <Image
              src={mainImage.url}
              alt={mainImage.caption ?? title}
              fill
              priority
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-xs bg-black/70 backdrop-blur-md text-white text-xs font-medium tracking-wide flex items-center gap-2 border border-white/20 hover:bg-black/90 transition-colors shadow-md">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              View Fullscreen Photo
            </div>
          </button>
        ) : images.length === 2 ? (
          /* 2 Images: 50 / 50 Luxury Split */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-full">
            {images.slice(0, 2).map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openLightbox(i)}
                className="relative w-full h-full overflow-hidden group cursor-pointer block"
                aria-label={`View photo ${i + 1} in full size`}
              >
                <Image
                  src={img.url}
                  alt={img.caption ?? `${title} photo ${i + 1}`}
                  fill
                  priority={i === 0}
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </button>
            ))}
          </div>
        ) : images.length === 3 ? (
          /* 3 Images: 65% Main + 35% Two Stacked */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full h-full">
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="relative md:col-span-8 w-full h-full overflow-hidden group cursor-pointer block"
              aria-label={`View ${mainImage.caption ?? title} in full size`}
            >
              <Image
                src={mainImage.url}
                alt={mainImage.caption ?? title}
                fill
                priority
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 65vw"
              />
            </button>
            <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-2 h-full">
              {images.slice(1, 3).map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => openLightbox(i + 1)}
                  className="relative w-full h-full overflow-hidden group cursor-pointer block"
                  aria-label={`View photo ${i + 2} in full size`}
                >
                  <Image
                    src={img.url}
                    alt={img.caption ?? `${title} photo ${i + 2}`}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    sizes="35vw"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* 4+ Images: Multi-tile luxury architectural grid */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 w-full h-full">
            {/* Main large image */}
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="relative md:col-span-7 lg:col-span-8 w-full h-full overflow-hidden group cursor-pointer block"
              aria-label={`View ${mainImage.caption ?? title} in full size`}
            >
              <Image
                src={mainImage.url}
                alt={mainImage.caption ?? title}
                fill
                priority
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </button>

            {/* Right side tiles */}
            <div className="hidden md:grid md:col-span-5 lg:col-span-4 grid-cols-2 grid-rows-2 gap-2 h-full">
              {secondaryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => openLightbox(i + 1)}
                  className="relative w-full h-full overflow-hidden group cursor-pointer block"
                  aria-label={`View ${img.caption ?? `photo ${i + 2}`} in full size`}
                >
                  <Image
                    src={img.url}
                    alt={img.caption ?? `${title} — photo ${i + 2}`}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    sizes="20vw"
                  />
                  {/* "+N more" overlay on last tile */}
                  {i === secondaryImages.length - 1 && remaining > 0 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-2">
                      <span className="font-display text-2xl font-light">+{remaining}</span>
                      <span className="text-2xs uppercase tracking-wider text-sand-200">More Photos</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Floating "View All Photos" Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-sm bg-black/70 backdrop-blur-md text-white text-xs font-medium tracking-wide flex items-center gap-2 border border-white/20 hover:bg-black/90 transition-all shadow-md"
            aria-label={`Open photo gallery with ${images.length} photos`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <span>View All {images.length} Photos</span>
          </button>
        )}
      </div>

      {/* Thumbnail strip below gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openLightbox(i)}
              className="relative w-20 h-14 rounded-sm overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-primary transition-all cursor-pointer opacity-80 hover:opacity-100"
              aria-label={`View photo ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.caption ?? ""}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={next}
          onPrev={prev}
        />
      )}
    </>
  );
}
