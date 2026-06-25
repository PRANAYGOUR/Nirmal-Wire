import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionVideoProps {
  videoSrc: string;
  headline: string;
  content: string[];
  layout: 'video-left' | 'video-right';
}

const SectionVideo: React.FC<SectionVideoProps> = ({ videoSrc, headline, content, layout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current || !contentRef.current || !videoContainerRef.current) return;

    // Play video when in view
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => videoRef.current?.play(),
      onEnterBack: () => videoRef.current?.play(),
      onLeave: () => videoRef.current?.pause(),
      onLeaveBack: () => videoRef.current?.pause()
    });

    // Parallax effect on the video container
    gsap.fromTo(videoContainerRef.current,
      { y: -50 },
      {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // Fade in text headline
    gsap.fromTo(contentRef.current.querySelector('h2'),
      { opacity: 0, x: layout === 'video-left' ? 30 : -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
        }
      }
    );

    // Animated Wire Circuit Sequence
    const timelineContainer = contentRef.current.querySelector('.wire-timeline-container');
    const activeSpine = contentRef.current.querySelector('.active-spine');
    const items = contentRef.current.querySelectorAll('.wire-item');

    if (timelineContainer && activeSpine && items.length > 0) {
      // Ensure spine starts at 0 height
      gsap.set(activeSpine, { height: '0%' });

      const circuitTl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineContainer,
          start: "top 50%", // Wait until it's right in the middle of the screen
          toggleActions: "play none none reverse"
        }
      });

      items.forEach((item, index) => {
        const node = item.querySelector('.wire-node');
        const branch = item.querySelector('.wire-branch');
        const text = item.querySelector('.wire-text');
        
        // Calculate dynamic height percentage based on item index to draw spine perfectly to this node
        // The last item completes the 100% height
        const stepPercentage = ((index + 1) / items.length) * 100;

        // 1. Draw spine down to current node (Lightning fast)
        circuitTl.to(activeSpine, { height: `${stepPercentage}%`, duration: 0.15, ease: "none" });
        
        // 2. Flash node (Explicit fromTo prevents React double-render bug)
        circuitTl.fromTo(node, 
          { borderColor: 'rgba(255,255,255,0.2)', backgroundColor: isLeft ? 'var(--bg-primary)' : 'var(--bg-secondary)', boxShadow: 'none' },
          { borderColor: 'var(--accent-cyan)', backgroundColor: 'var(--accent-cyan)', boxShadow: '0 0 15px var(--accent-cyan)', duration: 0.05 }
        );
        
        // 3. Draw branch outward (Explicit fromTo)
        circuitTl.fromTo(branch, 
          { width: '0px' }, 
          { width: '22px', duration: 0.1, ease: "power2.out" }
        );
        
        // 4. Reveal the text (Explicit fromTo guarantees visibility)
        circuitTl.fromTo(text, 
          { opacity: 0, x: -30 }, 
          { opacity: 1, x: 0, duration: 0.2, ease: "power3.out" }, 
          "-=0.05"
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [layout]);

  const isLeft = layout === 'video-left';

  return (
    <section 
      ref={containerRef} 
      style={{ 
        position: 'relative',
        padding: '10rem 0', 
        backgroundColor: isLeft ? 'var(--bg-primary)' : 'var(--bg-secondary)', 
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden'
      }}
    >
      <div className="container mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw', alignItems: 'center', direction: isLeft ? 'ltr' : 'rtl' }}>
        
        {/* Video Side */}
        <div style={{ position: 'relative', height: 'clamp(300px, 50vh, 70vh)', borderRadius: '20px', overflow: 'hidden' }}>
          <div ref={videoContainerRef} style={{ width: '100%', height: '120%', position: 'absolute', top: '-10%', left: 0 }}>
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.7) contrast(1.1)',
                transform: 'scale(1.15)',
                transformOrigin: 'center center'
              }}
            />
          </div>
          {/* Subtle inset shadow to blend video edges */}
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)', pointerEvents: 'none' }}></div>
        </div>

        {/* Content Side */}
        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', direction: 'ltr' }}>
          <h2 className="text-h1" style={{ marginBottom: '4rem', fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>{headline}</h2>
          
          {/* Circuit Timeline Container */}
          <div className="wire-timeline-container" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              
              {/* Inactive Background Spine */}
              <div style={{ position: 'absolute', left: '30px', top: '25px', bottom: '25px', width: '2px', background: 'rgba(255,255,255,0.1)' }}></div>
              
              {/* Active Glowing Spine (Animates height) */}
              <div className="active-spine" style={{ position: 'absolute', left: '30px', top: '25px', width: '2px', height: '100%', background: 'var(--accent-cyan)', boxShadow: '0 0 15px var(--accent-cyan)' }}></div>

              {content.map((item, idx) => (
                  <div key={idx} className="wire-item" style={{ position: 'relative', paddingLeft: '70px', paddingBottom: idx === content.length - 1 ? '0' : '3.5rem' }}>
                      
                      {/* Node (Default visible state) */}
                      <div className="wire-node" style={{ position: 'absolute', left: '25px', top: '20px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-cyan)', border: '2px solid var(--accent-cyan)', boxShadow: '0 0 15px var(--accent-cyan)', transition: 'background-color 0.2s ease', zIndex: 2 }}></div>
                      
                      {/* Horizontal Branch Line (Default visible state) */}
                      <div className="wire-branch" style={{ position: 'absolute', left: '37px', top: '25px', width: '22px', height: '2px', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)', zIndex: 1 }}></div>

                      {/* Text Content (Default visible state) */}
                      <div className="wire-text">
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--accent-green)', marginBottom: '0.5rem', letterSpacing: '2px' }}>
                             0{idx + 1}
                          </div>
                          <h3 style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: '#fff', fontWeight: 500, letterSpacing: '0.5px', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
                             {item}
                          </h3>
                      </div>

                  </div>
              ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default SectionVideo;
