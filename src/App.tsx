import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from './components/Cursor';
import Navigation from './components/Navigation';
import SectionOrigin from './components/SectionOrigin';
import SectionEvolution from './components/SectionEvolution';
import SectionVideo from './components/SectionVideo';
import SectionApplications from './components/SectionApplications';
import SectionTimeline from './components/SectionTimeline';
import SectionProducts from './components/SectionProducts';
import SectionWhyNirmal from './components/SectionWhyNirmal';
import SectionCTA from './components/SectionCTA';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);

    // Initial Loading State
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
      <Cursor />
      <Navigation />



      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919444077615" 
        target="_blank" 
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
          zIndex: 9999,
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg viewBox="0 0 24 24" width="35" height="35" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </a>

      {/* Loading Screen */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'var(--bg-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: isLoaded ? 0 : 1, pointerEvents: isLoaded ? 'none' : 'all',
        transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {/* 3D Rotating Concertina Coil Logo (Scaled Up) */}
          <div style={{ width: '80px', height: '80px', perspective: '600px', marginRight: '1.5rem' }}>
            <div style={{
              width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d',
              animation: 'spinCube 8s infinite linear'
            }}>
              {[...Array(15)].map((_, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: `3px dashed ${i % 2 === 0 ? 'var(--accent-green)' : '#ffffff'}`,
                  transform: `translateZ(${(i - 7) * 8}px) translateX(${Math.sin(i) * 4}px) translateY(${Math.cos(i) * 4}px)`,
                  boxShadow: `0 0 15px ${i % 2 === 0 ? 'rgba(31,165,91,0.6)' : 'rgba(255,255,255,0.4)'}`
                }} />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '4rem', 
              fontWeight: 800, 
              color: '#ffffff',
              letterSpacing: '0.05em', 
              lineHeight: 1
            }}>
              NIRMAL
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, color: 'var(--accent-green)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '8px' }}>
              Wire Netting Industries
            </div>
          </div>
        </div>
      </div>

      <main>
        {/* SECTION 01: THE ORIGIN */}
        <SectionOrigin frameCount={120} />

        {/* SECTION 02: THE EVOLUTION */}
        <SectionEvolution />

        {/* SECTION 03: STRENGTH AT SCALE */}
        <SectionVideo 
          videoSrc="/strength-at-scale.mp4"
          headline="Strength At Scale."
          content={[
            "Heavy-duty fencing systems.",
            "Industrial applications.",
            "Infrastructure projects.",
            "Large-scale protection."
          ]}
          layout="video-left"
        />

        {/* SECTION 04: THE FIRST LINE OF DEFENSE */}
        <SectionVideo 
          videoSrc="/first-line-of-defense.mp4"
          headline="Protection Starts At The Perimeter."
          content={[
            "Boundary definition.",
            "Asset protection.",
            "Perimeter security.",
            "Controlled access."
          ]}
          layout="video-right"
        />

        {/* SECTION 05: MAXIMUM SECURITY */}
        <SectionVideo 
          videoSrc="/maximum-security.mp4"
          headline="Built For Critical Security."
          content={[
            "Industrial security.",
            "Infrastructure protection.",
            "Restricted access zones.",
            "High-security installations."
          ]}
          layout="video-left"
        />

        {/* SECTION 06: APPLICATIONS */}
        <SectionApplications />

        {/* SECTION 07: MANUFACTURING EXCELLENCE */}
        <SectionTimeline />

        {/* SECTION 08: PRODUCT UNIVERSE */}
        <SectionProducts />

        {/* SECTION 09: WHY NIRMAL */}
        <SectionWhyNirmal />

        {/* SECTION 10: FINAL CTA */}
        <SectionCTA />
      </main>
    </>
  );
};

export default App;
