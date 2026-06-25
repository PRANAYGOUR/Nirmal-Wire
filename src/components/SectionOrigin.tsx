import React, { useRef, useEffect, useState } from 'react';

interface SectionOriginProps {
  frameCount: number;
}

const SectionOrigin: React.FC<SectionOriginProps> = ({ frameCount }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Preload Images
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      const promises = [];
      for (let i = 1; i <= frameCount; i++) {
        if (isCancelled) break;
        const img = new Image();
        const frameIndex = i.toString().padStart(3, '0');
        
        const p = new Promise((resolve) => {
          img.onload = () => resolve(null);
          img.onerror = () => resolve(null);
        });
        
        img.src = `/sequence/ezgif-frame-${frameIndex}.png`;
        loadedImages[i - 1] = img;
        promises.push(p);

        // Immediately unblock the UI after the first frame loads so mobile users aren't stuck
        if (i === 1) {
          await p;
          if (!isCancelled) {
            setImages([...loadedImages]);
            setIsLoaded(true);
          }
        }
      }
      
      // Load the rest in the background in parallel
      await Promise.all(promises);
      if (!isCancelled) {
        setImages(loadedImages);
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, [frameCount]);

  // Video Playback Logic (30 FPS Loop)
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    canvas.width = 1280;
    canvas.height = 720;

    let animationFrameId: number;
    let lastTime = performance.now();
    let currentFrame = 0;
    const fps = 15; // Slowed down from 30 to 15 for a slower, cinematic feel
    const frameInterval = 1000 / fps;

    const playSequence = (time: number) => {
      const deltaTime = time - lastTime;

      if (deltaTime >= frameInterval) {
        currentFrame = (currentFrame + 1) % frameCount; // Loop back to 0
        const img = images[currentFrame];
        
        if (img && img.complete && img.naturalWidth !== 0) {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        
        lastTime = time - (deltaTime % frameInterval);
      }
      
      animationFrameId = requestAnimationFrame(playSequence);
    };

    animationFrameId = requestAnimationFrame(playSequence);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, images, frameCount]);

  return (
    <div 
      id="overview" 
      style={{ 
        position: 'relative', 
        width: '100%',
        backgroundColor: '#050505',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '2rem'
      }}
    >
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '90vh', 
          overflow: 'hidden',
          borderRadius: '30px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        
        {/* Canvas Video Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundColor: '#050505' }}>
          <canvas 
            ref={canvasRef} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 1s ease'
            }} 
          />
        </div>

        {/* Decorative badge covering watermark */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          padding: '1.2rem 2rem 1.2rem 3.5rem',
          backgroundColor: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTopLeftRadius: '25px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--accent-cyan)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          letterSpacing: '0.15em',
          zIndex: 10
        }}>
          EST. 1990
        </div>
        
        {/* Subtle vignette for better text readability */}
        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 150px rgba(5,5,5,0.9)', pointerEvents: 'none', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(5,5,5,0.8) 100%)', pointerEvents: 'none', zIndex: 1 }}></div>

        {/* Static Hero Text */}
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 className="text-hero" style={{ marginBottom: '1.5rem', textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
            Engineering Stronger Boundaries.
          </h1>
          <h2 className="text-h1" style={{ fontSize: '1.8rem', color: 'var(--accent-cyan)', marginBottom: '1.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
            Transforming galvanized wire into protection systems trusted across industries.
          </h2>
          <p className="text-body" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
            Every protection system begins with a single engineered material. From durability to security, every solution starts here.
          </p>
          <div style={{ marginTop: '3rem' }}>
            <a href="#products" className="btn-primary">Explore Systems</a>
          </div>
        </div>

        {/* Loading Indicator */}
        {!isLoaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505', zIndex: 100 }}>
            <div style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>Loading Cinematic Experience...</div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SectionOrigin;
