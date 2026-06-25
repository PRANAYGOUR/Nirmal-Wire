import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    id: "01",
    title: "Strong Fence.",
    desc: "Our team provides strong fence for a wide range of chainlink fencing as per the needs of our customers.",
    img: "/images/exp_strong_fence.png"
  },
  {
    id: "02",
    title: "Dreams True.",
    desc: "Our experts are offering complete service for all type of fencing wires so that your dreams come true.",
    img: "/images/exp_farm_fence.png"
  },
  {
    id: "03",
    title: "Reliability.",
    desc: "Our products are very reliable and provide you safety from our fence.",
    img: "/images/exp_reliability.png"
  },
  {
    id: "04",
    title: "Installation.",
    desc: "We provide efficient installation of our products with the assistance of our expert team to low down your efforts.",
    img: "/images/exp_installation.png"
  }
];

const SectionApplications: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.obsidian-card') as HTMLElement[];
      const overlays = gsap.utils.toArray('.card-overlay') as HTMLElement[];
      const textsLeft = gsap.utils.toArray('.obsidian-text-left') as HTMLElement[];
      const textsRight = gsap.utils.toArray('.obsidian-text-right') as HTMLElement[];
      const mainTitle = document.querySelector('.main-title-center');

      // Initial state
      gsap.set(cards, { 
        y: window.innerHeight, // Start fully hidden below
        scale: 0.8, 
        autoAlpha: 0,
        transformOrigin: "center center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.8)", // Optimized shadow
        zIndex: 1
      });
      // Darken all overlays initially
      gsap.set(overlays, { autoAlpha: 0.7 });
      
      gsap.set(textsLeft, { autoAlpha: 0, x: -50 });
      gsap.set(textsRight, { autoAlpha: 0, x: 50 });

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500", // Cut in half for much snappier, faster scrolling
          pin: true,
          scrub: 1, // Smooth dampening
        }
      });

      // PHASE 1: Title "Our Expertise" fades out
      tl.to(mainTitle, { autoAlpha: 0, y: -100, duration: 1 });

      // PHASE 2: Cards Loop
      cards.forEach((_, i) => {
        const stepLabel = `step${i}`;

        // Center current card
        tl.to(cards[i], {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          zIndex: 10,
          duration: 1,
          ease: "power2.inOut"
        }, stepLabel);
        
        // Remove darkness from current card
        tl.to(overlays[i], { autoAlpha: 0, duration: 1 }, stepLabel);

        // Move old card to TOP peek
        if (i > 0) {
          tl.to(cards[i - 1], {
            y: -120, // push up
            scale: 0.85,
            autoAlpha: 0.4,
            zIndex: 5,
            duration: 1,
            ease: "power2.inOut"
          }, stepLabel);
          
          // Darken old card
          tl.to(overlays[i - 1], { autoAlpha: 0.7, duration: 1 }, stepLabel);
        }

        // Fly very old card AWAY
        if (i > 1) {
          tl.to(cards[i - 2], {
            y: -window.innerHeight,
            autoAlpha: 0,
            duration: 1,
            ease: "power2.inOut"
          }, stepLabel);
        }

        // Bring upcoming card to BOTTOM peek
        if (i < cards.length - 1) {
          tl.to(cards[i + 1], {
            y: 120, // push down
            scale: 0.85,
            autoAlpha: 0.4,
            zIndex: 5,
            duration: 1,
            ease: "power2.inOut"
          }, stepLabel);
          
          // Darken upcoming card (should already be dark from init, but good to enforce)
          tl.to(overlays[i + 1], { autoAlpha: 0.7, duration: 1 }, stepLabel);
        }

        // Text fade in
        tl.to(textsLeft[i], { autoAlpha: 1, x: 0, duration: 0.5 }, `${stepLabel}+=0.5`);
        tl.to(textsRight[i], { autoAlpha: 1, x: 0, duration: 0.5 }, `${stepLabel}+=0.5`);

        // Pause for user to read
        tl.to({}, { duration: 1.5 });

        // Text fade out
        if (i < cards.length - 1) {
          tl.to(textsLeft[i], { autoAlpha: 0, x: -30, duration: 0.5 });
          tl.to(textsRight[i], { autoAlpha: 0, x: 30, duration: 0.5 });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="applications" style={{ height: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', overflow: 'hidden', position: 'relative' }}>
      
      {/* Huge Centered Title initially */}
      <div className="main-title-center" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 20 }}>
        <h1 className="text-h1" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', color: 'var(--text-primary)', textAlign: 'center' }}>Our Expertise.</h1>
      </div>

      {/* Dynamic Texts Container */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        
        {/* Left Side Texts (Descriptions) */}
        <div style={{ position: 'absolute', left: '8vw', top: '50%', transform: 'translateY(-50%)', width: '25vw', minWidth: '250px' }}>
          {expertiseData.map((item, idx) => (
            <div key={idx} className="obsidian-text-left" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
              <p className="text-body" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.5rem)', color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Right Side Texts (Titles & Index) */}
        <div style={{ position: 'absolute', right: '8vw', top: '50%', transform: 'translateY(-50%)', width: '25vw', minWidth: '250px' }}>
          {expertiseData.map((item, idx) => (
            <div key={idx} className="obsidian-text-right" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
              
              <div style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.2em' }}>
                {idx + 1} / {expertiseData.length}
              </div>
              
              <h3 className="text-h1" style={{ fontSize: 'clamp(2.5rem, 4vw, 5rem)', lineHeight: 1.1 }}>
                {item.title}
              </h3>

            </div>
          ))}
        </div>
      </div>

      {/* Cards Container */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {expertiseData.map((item, idx) => (
          <div 
            key={idx} 
            className="obsidian-card"
            style={{ 
              position: 'absolute',
              width: 'clamp(280px, 25vw, 450px)', 
              aspectRatio: '3/4', 
              borderRadius: '16px', 
              overflow: 'hidden',
              backgroundColor: '#000',
              willChange: 'transform, opacity' // Hardware acceleration
            }}
          >
            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {/* GPU-Accelerated Darkening Overlay */}
            <div className="card-overlay" style={{ position: 'absolute', inset: 0, backgroundColor: '#000', pointerEvents: 'none' }}></div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default SectionApplications;
