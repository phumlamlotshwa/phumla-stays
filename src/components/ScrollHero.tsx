"use client";

import { useEffect, useRef, useState } from "react";
import HeroStory from "@/components/HeroStory";

const FRAME_COUNT = 150;

// How long the film takes to play from start to finish, in seconds.
const PLAY_SECONDS = 12;

// How much bigger than the screen width the film is drawn on phones.
// 1 shows the whole width; higher zooms in and crops the sides a little.
const PHONE_ZOOM = 1.5;

// Start playing once this share of the frames is ready, or after MAX_WAIT_MS,
// whichever comes first. A slow or stuck download must never stop the film
// (and the buttons at the end of it) from showing.
const START_WHEN_READY = 0.6;
const MAX_WAIT_MS = 4000;

// The frames are 1600px wide, so a canvas sharper or wider than this only
// costs memory (a big 4K screen would otherwise get a 5120px canvas).
const MAX_PIXEL_RATIO = 2;
const MAX_CANVAS_WIDTH = 2400;

function framePath(folder: "desktop" | "mobile", index: number) {
  const number = String(index + 1).padStart(3, "0");
  return `/hero-frames/${folder}/${number}.webp`;
}

export default function ScrollHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backdropRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const backdrop = backdropRef.current;
    const backdropContext = backdrop?.getContext("2d");
    if (!canvas || !context) return;

    // phones get the smaller frames to save data
    const folder = window.innerWidth < 768 ? "mobile" : "desktop";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const frames: HTMLImageElement[] = [];
    const ready: boolean[] = new Array(FRAME_COUNT).fill(false);
    let readyCount = 0;
    let currentFrame = 0;
    let drawnFrame = -1;
    let started = false;
    let disposed = false;
    let animation = 0;
    let waitTimer = 0;

    // the closest frame at or before `index` that has finished downloading,
    // so a missing frame holds the previous picture instead of going blank
    function nearestReady(index: number) {
      for (let i = index; i >= 0; i--) if (ready[i]) return i;
      for (let i = index + 1; i < FRAME_COUNT; i++) if (ready[i]) return i;
      return -1;
    }

    // On wide screens the frame fills the canvas, cropping the edges if needed
    // (like object-fit: cover). On phones held upright that would blow up a thin
    // slice of the film, so instead the frame runs across the full width and a
    // blurred copy behind it fills the space above and below.
    function draw(index: number, force = false) {
      if (disposed || !canvas || !context) return;
      const frame = nearestReady(index);
      if (frame === -1 || (frame === drawnFrame && !force)) return;

      const image = frames[frame];
      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;
      const { width, height } = canvas;
      if (!imageWidth || !width || !height) return;
      drawnFrame = frame;

      context.clearRect(0, 0, width, height);
      context.imageSmoothingQuality = "high";

      if (height <= width) {
        const scale = Math.max(width / imageWidth, height / imageHeight);
        const w = imageWidth * scale;
        const h = imageHeight * scale;
        context.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
        return;
      }

      if (backdrop && backdropContext && backdrop.width && backdrop.height) {
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

    // Keeps the canvas sharp on high-resolution screens. Setting a canvas size
    // wipes it, so only do it when the size really changed (phones fire resize
    // events all the time as the address bar slides in and out).
    function resize() {
      if (!canvas) return;
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        MAX_PIXEL_RATIO,
        MAX_CANVAS_WIDTH / Math.max(canvas.clientWidth, 1),
      );
      const width = Math.round(canvas.clientWidth * ratio);
      const height = Math.round(canvas.clientHeight * ratio);
      if (width === canvas.width && height === canvas.height) return;

      canvas.width = width;
      canvas.height = height;
      if (backdrop) {
        // the backdrop is blurred anyway, so a small one is plenty
        backdrop.width = Math.max(1, Math.round(canvas.clientWidth / 4));
        backdrop.height = Math.max(1, Math.round(canvas.clientHeight / 4));
      }
      draw(currentFrame, true);
    }

    // plays the film once, from the first frame to the last, then rests on
    // the final scene with the buttons
    function play() {
      if (started || disposed) return;
      started = true;
      window.clearTimeout(waitTimer);
      let startTime: number | null = null;
      let lastProgress = -1;

      function step(time: number) {
        if (disposed) return;
        if (startTime === null) startTime = time;
        const value = Math.min((time - startTime) / (PLAY_SECONDS * 1000), 1);

        // the words only need updating about every 1% of the film
        const rounded = Math.round(value * 100) / 100;
        if (rounded !== lastProgress) {
          lastProgress = rounded;
          setProgress(value);
        }

        currentFrame = Math.round(value * (FRAME_COUNT - 1));
        draw(currentFrame);
        if (value < 1) animation = requestAnimationFrame(step);
      }

      animation = requestAnimationFrame(step);
    }

    // shows the last scene and its buttons without playing the film
    function showEnding() {
      if (disposed) return;
      window.clearTimeout(waitTimer);
      setProgress(1);
    }

    function frameSettled(i: number, ok: boolean) {
      if (disposed) return;
      if (ok) {
        ready[i] = true;
        readyCount++;
        // keep showing something sensible while the rest download
        if (i === nearestReady(currentFrame)) draw(currentFrame);
      }
      if (reduceMotion) showEnding();
      else if (readyCount >= FRAME_COUNT * START_WHEN_READY) play();
    }

    // decode() finishes the image work off the main thread before we draw,
    // so the first run through the film doesn't stutter
    function load(i: number) {
      const image = new Image();
      image.src = framePath(folder, i);
      frames[i] = image;
      image.decode().then(
        () => frameSettled(i, true),
        () => frameSettled(i, false),
      );
    }

    resize();

    if (reduceMotion) {
      // people who've asked for less motion get the last scene straight away,
      // and only download that one picture
      currentFrame = FRAME_COUNT - 1;
      load(currentFrame);
      waitTimer = window.setTimeout(showEnding, MAX_WAIT_MS);
    } else {
      for (let i = 0; i < FRAME_COUNT; i++) load(i);
      waitTimer = window.setTimeout(play, MAX_WAIT_MS);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(animation);
      window.clearTimeout(waitTimer);
      observer.disconnect();
      // stop any downloads that haven't finished yet
      for (const image of frames) if (image && !image.complete) image.src = "";
    };
  }, []);

  return (
    <section id="hero-film" className="relative h-svh bg-charcoal">
      <div className="relative h-full overflow-hidden">
        <canvas
          ref={backdropRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 blur-2xl brightness-75"
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="relative h-full w-full"
        />
        <HeroStory progress={progress} />
      </div>
    </section>
  );
}