import React, { useEffect, useState } from 'react';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show navigation slightly after page load
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <nav className={`nav-glass ${scrolled ? 'scrolled' : ''} ${visible ? 'visible' : ''}`}>
      <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {/* 3D Rotating Concertina Coil Logo */}
          <div style={{ width: '45px', height: '45px', perspective: '300px', marginRight: '1rem' }}>
            <div style={{
              width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d',
              animation: 'spinCube 8s infinite linear'
            }}>
              {[...Array(12)].map((_, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: `2px dashed ${i % 2 === 0 ? 'var(--accent-green)' : '#ffffff'}`,
                  transform: `translateZ(${(i - 5.5) * 4}px) translateX(${Math.sin(i) * 2}px) translateY(${Math.cos(i) * 2}px)`,
                  boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(31,165,91,0.5)' : 'rgba(255,255,255,0.3)'}`
                }} />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '2.2rem', 
              fontWeight: 800, 
              color: '#ffffff',
              letterSpacing: '0.05em', 
              lineHeight: 1
            }}>
              NIRMAL
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent-green)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '4px' }}>
              Wire Netting Industries
            </div>
          </div>
        </a>
      </div>
      <div className="nav-links">
        <a href="#overview">Overview</a>
        <a href="#solutions">Evolution Map</a>
        <a href="#applications">Expertise</a>
        <a href="#manufacturing">Manufacturing</a>
        <a href="#products">Products</a>
      </div>
      <a href="mailto:nirmalwires@gmail.com?subject=Enquiry" className="btn-ghost" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
        Get Quote
      </a>
    </nav>
  );
};

export default Navigation;
