"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiX, FiZoomIn } from "react-icons/fi";

type GalleryImage = {
  src: string;
  alt: string;
};

export function ImageLightboxGallery({
  images,
}: {
  images: GalleryImage[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage =
    activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        {images.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group/lightbox overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-left transition hover:-translate-y-0.5 hover:border-[var(--accent-border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label={`Open larger image: ${item.alt}`}
          >
            <div className="relative aspect-[16/10] bg-white">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain transition duration-300 group-hover/lightbox:scale-[1.015]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="pointer-events-none absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/90 text-zinc-800 opacity-0 shadow-sm backdrop-blur transition group-hover/lightbox:opacity-100 group-focus-visible/lightbox:opacity-100">
                <FiZoomIn className="h-4 w-4" />
              </div>
            </div>

            <div className="border-t border-[var(--border)] px-4 py-3 text-xs text-[var(--muted)]">
              {item.alt}
            </div>
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex max-h-[94vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#090b0f] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
              <p className="min-w-0 truncate text-sm font-medium text-zinc-200">
                {activeImage.alt}
              </p>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                aria-label="Close image"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="relative min-h-[60vh] flex-1 bg-black">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
