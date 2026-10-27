"use client";

import { useEffect, useRef, useState } from "react";
import HeroStory from "@/components/HeroStory";

const FRAME_COUNT = 150;

// How many screen-heights of scrolling the whole film takes.
// Lower = faster, higher = slower.
const SCROLL_SCREENS = 3;

// How much bigger than the screen width the film is drawn on phones.
// 1 shows the whole width; higher zooms in and crops the sides a little.
const PHONE_ZOOM = 1.5;

function framePath(folder: "desktop" | "mobile", index: number) {
  const number = String(index + 1).padStart(3, "0");
  return `/hero-frames/${folder}/${number}.webp`;
}

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backdropRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const backdrop = backdropRef.current;
    const backdropContext = backdrop?.getContext("2d");
    if (!section || !canvas || !context) return;

    // phones get the smaller frames to save data
    const folder = window.innerWidth < 768 ? "mobile" : "desktop";
    const frames: HTMLImageElement[] = [];
    let currentFrame = 0;
    let pending = false;

    // On wide screens the frame fills the canvas, cropping the edges if needed
    // (like object-fit: cover). On phones held upright that would blow up a thin
    // slice of the film, so instead the frame runs across the full width and a
    // blurred copy behind it fills the space above and below.
    function draw(index: number) {
      const image = frames[index];
      if (!canvas || !context || !image?.complete || !image.naturalWidth)
        return;

      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;
      const { width, height } = canvas;

      context.clearRect(0, 0, width, height);
      context.imageSmoothingQuality = "high";

      if (height <= width) {
        const scale = Math.max(width / imageWidth, height / imageHeight);
        const w = imageWidth * scale;
        const h = imageHeight * scale;
        context.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
        return;
      }

      if (backdrop && backdropContext) {
        const scale = Math.max(
          backdrop.width / imageWidth,
          backdrop.height / imageHeight,
        );
        const w = imageWidth * scale;
        const h = imageHeight * scale;
        backdropContext.drawImage(
          image,
          (backdrop.width - w) / 2,
          (backdrop.height - h) / 2,
          w,
          h,
        );
      }

      const scale = (width / imageWidth) * PHONE_ZOOM;
      const w = imageWidth * scale;
      const h = imageHeight * scale;
      const y = height * 0.45 - h / 2;
      context.drawImage(image, (width - w) / 2, y, w, h);

      // soften the top and bottom edges of the sharp frame into the blur
      const fade = context.createLinearGradient(0, y, 0, y + h);
      fade.addColorStop(0, "rgba(0,0,0,0)");
      fade.addColorStop(0.2, "rgba(0,0,0,1)");
      fade.addColorStop(0.8, "rgba(0,0,0,1)");
      fade.addColorStop(1, "rgba(0,0,0,0)");
      context.globalCompositeOperation = "destination-in";
      context.fillStyle = fade;
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
    }

    // keeps the canvas sharp on high-resolution screens
    function resize() {
      if (!canvas) return;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      if (backdrop) {
        // the backdrop is blurred anyway, so a small one is plenty
        backdrop.width = Math.round(canvas.clientWidth / 4);
        backdrop.height = Math.round(canvas.clientHeight / 4);
      }
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
        <canvas
          ref={backdropRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 blur-2xl brightness-75"
        />
        <canvas ref={canvasRef} className="relative h-full w-full" />
        <HeroStory progress={progress} />
      </div>
    </section>
  );
}