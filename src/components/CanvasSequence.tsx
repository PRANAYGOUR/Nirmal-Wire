import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CanvasSequenceProps {
  frameCount: number;
  onLoadProgress: (progress: number) => void;
  onLoaded: () => void;
}

const CanvasSequence: React.FC<CanvasSequenceProps> = ({ frameCount, onLoadProgress, onLoaded }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    // Preload all images
    for (let i = 1; i <= frameCount; i++) {
      if (isCancelled) break;
      const img = new Image();
      // ezgif-frame-001.png format
      const frameIndex = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameIndex}.png`;
      
      img.onload = () => {
        if (isCancelled) return;
        loadedCount++;
        onLoadProgress((loadedCount / frameCount) * 100);
      };

      img.onerror = () => {
        if (isCancelled) return;
        console.error(`Failed to load frame ${frameIndex}`);
        loadedCount++; // Increment anyway to prevent hanging
        onLoadProgress((loadedCount / frameCount) * 100);
      };
      
      // We assign it to the array by index
      loadedImages[i - 1] = img;
    }
    
    let checkInterval = setInterval(() => {
      if (isCancelled) {
        clearInterval(checkInterval);
        return;
      }
      if (loadedCount === frameCount) {
        clearInterval(checkInterval);
        setImages(loadedImages);
        onLoaded();
      }
    }, 100);

    return () => {
      isCancelled = true;
      clearInterval(checkInterval);
    };
  }, [frameCount]);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    // The frames are likely horizontal, we can match window innerWidth/innerHeight, 
    // but object-fit: contain in CSS will handle scaling if we set canvas native size.
    // Let's set the canvas resolution to the first image's resolution
    canvas.width = images[0].width || 1920;
    canvas.height = images[0].height || 1080;

    let lastRenderedIndex = -1;

    const render = (index: number) => {
      if (index === lastRenderedIndex) return;

      const img = images[index];
      if (img && img.complete && img.naturalWidth !== 0) {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate aspect ratio to draw image covering or containing
        // We'll draw it scaled to fit or fill. Since object-fit: contain is on the canvas,
        // we can just draw it at native size.
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        lastRenderedIndex = index;
      }
    };

    // Render first frame
    render(0);

    // ScrollTrigger setup
    const animationObj = { frame: 0 };
    
    const scrollTrigger = gsap.to(animationObj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Extremely smooth, slow scrubbing
      },
      onUpdate: () => {
        render(Math.round(animationObj.frame));
      }
    });

    // Handle window resize
    const handleResize = () => {
      // Re-render current frame to fix any scale issues, though CSS object-fit handles most.
      render(Math.round(animationObj.frame));
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      scrollTrigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [images, frameCount]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
      <div className="watermark-hider"></div>
    </div>
  );
};

export default CanvasSequence;
