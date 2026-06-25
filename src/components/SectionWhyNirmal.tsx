import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionWhyNirmal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const counters = containerRef.current.querySelectorAll('.counter-val');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        ease: 'power3.out',
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });
    });

    gsap.fromTo('.trust-item', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.trust-grid',
          start: 'top 80%'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} style={{ padding: '5rem 0', backgroundColor: 'var(--bg-secondary)', textAlign: 'center' }}>
      <div className="container">
        
        <h2 className="text-hero" style={{ marginBottom: '5rem', fontSize: 'clamp(3rem, 6vw, 6rem)' }}>Engineered to Outlast.</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '10rem' }}>
          <div>
            <div className="text-h1" style={{ color: 'var(--accent-green)', fontSize: '4rem', marginBottom: '1rem' }}><span className="counter-val" data-target="40">0</span>+</div>
            <div className="text-body" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>Years of Excellence</div>
          </div>
          <div>
            <div className="text-h1" style={{ color: 'var(--accent-green)', fontSize: '4rem', marginBottom: '1rem' }}><span className="counter-val" data-target="10000">0</span>+</div>
            <div className="text-body" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>Projects Secured</div>
          </div>
          <div>
            <div className="text-h1" style={{ color: 'var(--accent-green)', fontSize: '4rem', marginBottom: '1rem' }}><span className="counter-val" data-target="50">0</span>+</div>
            <div className="text-body" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>Countries Exported</div>
          </div>
        </div>

        <div className="trust-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', textAlign: 'left' }}>
          
          <div className="trust-item" style={{ padding: '3rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px' }}>
            <h3 className="text-h1" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Manufacturing Expertise</h3>
            <p className="text-body" style={{ fontSize: '1rem' }}>State-of-the-art facilities ensuring precision and scale for any requirement.</p>
          </div>

          <div className="trust-item" style={{ padding: '3rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px' }}>
            <h3 className="text-h1" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Quality Assurance</h3>
            <p className="text-body" style={{ fontSize: '1rem' }}>Rigorous testing protocols guaranteeing long-lasting tensile strength.</p>
          </div>

          <div className="trust-item" style={{ padding: '3rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px' }}>
            <h3 className="text-h1" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Reliable Delivery</h3>
            <p className="text-body" style={{ fontSize: '1rem' }}>Optimized supply chain delivering premium products globally, on time.</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SectionWhyNirmal;
