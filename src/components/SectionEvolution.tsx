import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionEvolution: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const maskPaths = containerRef.current.querySelectorAll('.flow-mask-path');
    const nodes = containerRef.current.querySelectorAll('.flow-node-child');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 40%", // Wait until fully in view
        end: "bottom 50%",
        toggleActions: "play none none reverse"
      }
    });

    // 1. Draw SVG curved paths using mask paths (staggered left to right)
    maskPaths.forEach((path: any, index) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      tl.to(path, { 
        strokeDashoffset: 0, 
        duration: 2.0, // Much slower draw
        ease: "power2.inOut" 
      }, index * 0.4); // Stagger by 0.4s each (much slower cascade)
    });

    // 2. Fade in the 5 derivative nodes (staggered identically)
    if (nodes.length > 0) {
      nodes.forEach((node, index) => {
        tl.fromTo(node,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
          (index * 0.4) + 1.0 // Start fading in as its path is halfway done
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const NodeCard = ({ title, img, color = '#fff', imgFilter = 'none' }: { title: string, img: string, color?: string, imgFilter?: string }) => (
    <div className="flow-node-child" style={{ 
      width: '90%', 
      margin: '0 auto',
      background: 'rgba(255,255,255,0.02)', 
      border: `1px solid rgba(255,255,255,0.05)`, 
      borderRadius: '15px', 
      padding: 'clamp(0.5rem, 1vw, 1.2rem)',
      boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ width: '100%', height: 'clamp(70px, 8vw, 140px)', borderRadius: '8px', overflow: 'hidden', marginBottom: 'clamp(0.5rem, 1vw, 1rem)', backgroundColor: '#000' }}>
        <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: imgFilter }} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.8rem, 1.2vw, 1.2rem)', color: color, textAlign: 'center', marginTop: 'auto' }}>{title}</h3>
    </div>
  );

  return (
    <section ref={containerRef} id="solutions" style={{ backgroundColor: 'var(--bg-secondary)', padding: '10rem 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '100%', padding: '0 2vw' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-hero" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', marginBottom: '1rem' }}>The Evolution Map.</h2>
          <p className="text-body" style={{ margin: '0 auto', maxWidth: '600px' }}>
            One single material, engineered into an entire universe of protection systems.
          </p>
        </div>

        {/* 100% fluid responsive wrapper - no more horizontal scrolling! */}
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* TOP NODE: GI WIRE */}
          <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2.5rem)', background: 'radial-gradient(circle, rgba(0,214,255,0.1), transparent)', border: '2px solid var(--accent-cyan)', borderRadius: '30px', boxShadow: '0 0 30px rgba(0,214,255,0.2)', textAlign: 'center', zIndex: 10 }}>
            <div style={{ width: 'clamp(80px, 8vw, 120px)', height: 'clamp(80px, 8vw, 120px)', margin: '0 auto 1rem auto', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent-cyan)' }}>
              <img src="/images/products_new/gi_wire_proper.jpg" alt="GI Wire" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.1) contrast(1.2)' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2vw, 2rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>GI Wire</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.7rem, 1vw, 0.9rem)', maxWidth: '250px', margin: '0 auto' }}>The engineered core.</p>
          </div>

          {/* FLUID CURVED SVG CONNECTORS */}
          <div style={{ width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 1000 150" style={{ width: '100%', height: 'auto', display: 'block', zIndex: 0, overflow: 'visible' }}>
              <defs>
                <filter id="glowWhite">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                {/* MASKS FOR DRAWING ANIMATION */}
                {/* Math: Grid is 1000 units wide. 5 columns means 200 units each. Centers: 100, 300, 500, 700, 900. Start is 500. */}
                <mask id="mask1" maskUnits="userSpaceOnUse">
                  <path className="flow-mask-path" d="M 500,0 C 500,100 100,50 100,150" fill="none" stroke="white" strokeWidth="15" strokeLinecap="round" />
                </mask>
                <mask id="mask2" maskUnits="userSpaceOnUse">
                  <path className="flow-mask-path" d="M 500,0 C 500,100 300,50 300,150" fill="none" stroke="white" strokeWidth="15" strokeLinecap="round" />
                </mask>
                <mask id="mask3" maskUnits="userSpaceOnUse">
                  <path className="flow-mask-path" d="M 500,0 C 502,75 498,75 500,150" fill="none" stroke="white" strokeWidth="15" strokeLinecap="round" />
                </mask>
                <mask id="mask4" maskUnits="userSpaceOnUse">
                  <path className="flow-mask-path" d="M 500,0 C 500,100 700,50 700,150" fill="none" stroke="white" strokeWidth="15" strokeLinecap="round" />
                </mask>
                <mask id="mask5" maskUnits="userSpaceOnUse">
                  <path className="flow-mask-path" d="M 500,0 C 500,100 900,50 900,150" fill="none" stroke="white" strokeWidth="15" strokeLinecap="round" />
                </mask>
              </defs>

              {/* 1. PVC Coated Wire */}
              <path mask="url(#mask1)" d="M 500,0 C 500,100 100,50 100,150" fill="none" stroke="var(--accent-green)" strokeWidth="4" strokeLinecap="round" />
              
              {/* 2. PVC Chain Link (Dashed Green) */}
              <path mask="url(#mask2)" d="M 500,0 C 500,100 300,50 300,150" fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeDasharray="10 5" strokeLinecap="round" />
              
              {/* 3. GI Chain Link (Dashed Silver) */}
              <path mask="url(#mask3)" d="M 500,0 C 502,75 498,75 500,150" fill="none" stroke="#b0bec5" strokeWidth="3" strokeDasharray="10 5" strokeLinecap="round" />
              
              {/* 4. Barbed Wire (Knotted Silver) */}
              <path mask="url(#mask4)" d="M 500,0 C 500,100 700,50 700,150" fill="none" stroke="#b0bec5" strokeWidth="2" strokeDasharray="15 3 3 3" strokeLinecap="round" />
              
              {/* 5. Razor Wire (Glowing Dotted White) */}
              <path mask="url(#mask5)" d="M 500,0 C 500,100 900,50 900,150" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" filter="url(#glowWhite)" />
            </svg>
          </div>

          {/* 5 CARDS GRID - FLUID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', width: '100%' }}>
            
            <div style={{ position: 'relative' }}>
              <NodeCard title="PVC Coated Wire" img="/images/products_new/media__1782380285860.png" color="var(--accent-green)" />
            </div>

            <div style={{ position: 'relative' }}>
              <NodeCard title="PVC Chain Link" img="/images/products_new/media__1782380320778.jpg" color="var(--accent-green)" />
            </div>

            <div style={{ position: 'relative' }}>
              <NodeCard title="GI Chain Link" img="/images/products_new/media__1782380273803.jpg" />
            </div>

            <div style={{ position: 'relative' }}>
              <NodeCard title="Barbed Wire" img="/images/products_new/media__1782380266194.jpg" />
            </div>

            <div style={{ position: 'relative' }}>
              <NodeCard title="Razor Wire" img="/images/products_new/razor_wire_real.png" color="#fff" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SectionEvolution;
