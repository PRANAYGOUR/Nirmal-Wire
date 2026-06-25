import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const items = containerRef.current.querySelectorAll('.timeline-item');

    gsap.fromTo(lineRef.current,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );

    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const stages = [
    { title: "Premium GI Wire", desc: "Sourcing the highest quality Galvanized Iron wire as our foundational raw material." },
    { title: "Chainlink Weaving", desc: "Precision interlocking geometry for maximum structural integrity." },
    { title: "PVC Coating", desc: "Extruding protective polymer layers over the galvanized core for enhanced weather resistance." },
    { title: "Barbed & Concertina", desc: "Automated formatting and shaping for high-security defense applications." },
    { title: "Final Inspection", desc: "Rigorous geometric and tensile strength testing before global deployment." }
  ];

  return (
    <section ref={containerRef} id="manufacturing" style={{ padding: '10rem 0', backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>
        
        <div style={{ position: 'sticky', top: '30vh' }}>
          <h2 className="text-h1" style={{ marginBottom: '2rem' }}>From Wire to Product.</h2>
          <p className="text-body" style={{ maxWidth: '400px' }}>
            We source the highest quality premium GI wire from trusted partners to manufacture our robust product line. Every step of our conversion process is tightly controlled to ensure maximum durability, precise geometry, and an impeccable finish.
          </p>
          <div style={{ marginTop: '3rem', borderRadius: '20px', overflow: 'hidden', height: '400px', position: 'relative' }}>
            <img src="/images/mfg_wire_coils.png" alt="Manufacturing Process" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.25)', transformOrigin: 'top center' }} />
            
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
              color: 'var(--accent-green)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em'
            }}>
              ISO 9001:2015 CERTIFIED
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', paddingLeft: '4rem', paddingTop: '10rem', paddingBottom: '10rem' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.05)' }}></div>
          <div ref={lineRef} style={{ position: 'absolute', left: 0, top: 0, width: '2px', background: 'var(--accent-green)' }}></div>

          {stages.map((stage, idx) => (
            <div key={idx} className="timeline-item" style={{ position: 'relative', marginBottom: '6rem' }}>
              <div style={{ position: 'absolute', left: '-4rem', top: '0.5rem', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--accent-green)', transform: 'translateX(-50%)', zIndex: 2 }}></div>
              <h3 className="text-h1" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{stage.title}</h3>
              <p className="text-body">{stage.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SectionTimeline;
