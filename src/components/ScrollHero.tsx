"use client";

import { useEffect, useRef, useState } from "react";
import HeroStory from "@/components/HeroStory";
const FRAME_COUNT = 150;

// How many screen-heights of scrolling the whole film takes.
// Lower = faster, higher = slower.
const SCROLL_SCREENS = 3;

function framePath(folder: "desktop" | "mobile", index: number) {
  const number = String(index + 1).padStart(3, "0");
  return `/hero-frames/${folder}/${number}.webp`;
}

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!section || !canvas || !context) return;

    // phones get the smaller frames to save data
    const folder = window.innerWidth < 768 ? "mobile" : "desktop";
    const frames: HTMLImageElement[] = [];
    let currentFrame = 0;
    let pending = false;

    // draws a frame so it fills the canvas, cropping the edges if needed
    // (like object-fit: cover for an image)
    function draw(index: number) {
      const image = frames[index];
      if (!canvas || !context || !image?.complete || !image.naturalWidth) return;

      const scale = Math.max(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight,
      );
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
        context.imageSmoothingQuality = "high";

      context.drawImage(
        image,
        (canvas.width - width) / 2,
        (canvas.height - height) / 2,
        width,
        height,
      );
    }

    // keeps the canvas sharp on high-resolution screens
    function resize() {
      if (!canvas) return;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      draw(currentFrame);
    }

    // works out how far through the section we are (0 to 1)
    // and picks the matching frame
    function onScroll() {
      if (pending || !section) return;
      pending = true;

      requestAnimationFrame(() => {
        pending = false;
        const box = section.getBoundingClientRect();
        const scrollable = box.height - window.innerHeight;
        const progress = Math.min(Math.max(-box.top / scrollable, 0), 1);
        const index = Math.round(progress * (FRAME_COUNT - 1));
        setProgress(progress);

        if (index !== currentFrame) {
          currentFrame = index;
          draw(index);
        }
      });
    }

    // load every frame up front; the first one draws as soon as it arrives
    for (let i = 0; i < FRAME_COUNT; i++) {
      const image = new Image();
      image.src = framePath(folder, i);
      image.onload = () => {
        if (i === currentFrame) draw(i);
      };
      frames.push(image);
    }

    resize();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <section
        id="hero-film"
      ref={sectionRef}
      className="relative bg-charcoal"
      style={{ height: `${SCROLL_SCREENS * 100 + 100}vh` }}
    >
        <div className="sticky top-0 h-svh overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />
        <HeroStory progress={progress} />
      </div>
    </section>
  );
}