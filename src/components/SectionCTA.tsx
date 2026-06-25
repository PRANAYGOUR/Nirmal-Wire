import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    gsap.fromTo(imageRef.current, 
      { scale: 1.1, opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="quote" ref={containerRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img 
          ref={imageRef}
          src="/images/cta_hero.png" 
          alt="Premium Wire Mesh" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,1) 100%)' }} />
        
        {/* Decorative badge covering watermark */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '1.2rem 2rem 1.2rem 2rem',
          backgroundColor: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottomRightRadius: '25px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--accent-green)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          letterSpacing: '0.15em',
          zIndex: 10
        }}>
          MADE IN INDIA
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="text-hero" style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>Building Stronger Boundaries.</h2>
        <p className="text-body" style={{ maxWidth: '600px', marginBottom: '3rem', fontSize: '1.3rem' }}>
          Premium wire and fencing solutions engineered for durability, protection, and performance.
        </p>
        
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="mailto:nirmalwires@gmail.com?subject=Enquiry" className="btn-primary">Get Quote</a>
          <a href="#products" className="btn-ghost">Explore Products</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', width: '100%', maxWidth: '900px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem', paddingBottom: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <h4 style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>CALL US</h4>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <a href="tel:9444077615" className="text-body" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', transition: 'color 0.3s' }}>+91 94440 77615</a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <h4 style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>EMAIL US</h4>
            <a href="mailto:nirmalwires@gmail.com" className="text-body" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', transition: 'color 0.3s' }}>nirmalwires@gmail.com</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <h4 style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>VISIT US</h4>
            <p className="text-body" style={{ color: '#fff', fontSize: '1rem', margin: 0, lineHeight: '1.6' }}>7, 653, Muthamizh Nagar,<br/>Kodungaiyur, Chennai,<br/>Tamil Nadu 600118</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Nirmal+Wire+Netting+Industries,+Kodungaiyur,+Chennai" target="_blank" rel="noreferrer" style={{ color: 'var(--bg-primary)', backgroundColor: 'var(--accent-green)', padding: '0.6rem 1.2rem', borderRadius: '50px', textDecoration: 'none', marginTop: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem' }}>Get Directions</a>
          </div>
        </div>
      </div>

      <footer style={{ position: 'absolute', bottom: '1.5rem', width: '100%', textAlign: 'center', zIndex: 10 }}>
        <p className="text-body" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)' }}>
          &copy; {new Date().getFullYear()} Nirmal Wire Netting Industries. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default SectionCTA;
