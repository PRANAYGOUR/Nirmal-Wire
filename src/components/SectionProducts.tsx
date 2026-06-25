import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const products = [
  { id: 'gi_wire', name: 'GI Wire', desc: 'The engineered core. High tensile galvanized steel.', img: '/images/products_new/media__1782380299184.jpg' },
  { id: 'pvc_wire', name: 'PVC Coated Wire', desc: 'Weather-resistant polymer over galvanized core.', img: '/images/products_new/media__1782380285860.png' },
  { id: 'pvc_chain', name: 'PVC Chain Link', desc: 'Flexible, resilient perimeter protection.', img: '/images/products_new/media__1782380320778.jpg' },
  { id: 'gi_chain', name: 'GI Chain Link', desc: 'Heavy-duty industrial fencing.', img: '/images/products_new/media__1782380273803.jpg' },
  { id: 'barbed', name: 'Barbed Wire', desc: 'The first line of defense.', img: '/images/products_new/media__1782380266194.jpg' },
  { id: 'razor', name: 'Razor Wire', desc: 'Maximum security engineered for critical perimeters.', img: '/images/products_new/razor_wire_real.png' }
];

const SectionProducts: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 3D hover effect on the active product
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to('.product-item.active', {
        rotationY: x * 20,
        rotationX: -y * 20,
        ease: 'power3.out',
        duration: 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="products" ref={containerRef} style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 0', overflow: 'hidden' }}>
      
      <div style={{ textAlign: 'center', zIndex: 20, position: 'relative', marginBottom: '2rem' }}>
        <h2 className="text-h1">Product Universe.</h2>
        <p className="text-body" style={{ marginTop: '1rem' }}>Select a system to explore.</p>
      </div>

      <div className="product-showcase">
        {products.map((p, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div 
              key={p.id} 
              className={`product-item ${isActive ? 'active' : 'inactive'}`}
              onClick={() => setActiveIndex(idx)}
              style={{
                transform: `scale(${isActive ? 1 : 0.6}) translateZ(${isActive ? 50 : -100}px) translateY(${isActive ? 0 : (idx - activeIndex) * 100}px) translateX(${isActive ? 0 : (idx - activeIndex) * 200}px)`,
                opacity: isActive ? 1 : 0.1,
                pointerEvents: isActive ? 'auto' : 'auto',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                width: '600px',
                height: '400px'
              }}
            >
              {/* Product Visual */}
              <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '20px', overflow: 'hidden', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation for products */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', zIndex: 20, marginTop: '2rem', maxWidth: '800px' }}>
        {products.map((p, idx) => (
          <button 
            key={p.id}
            onClick={() => setActiveIndex(idx)}
            style={{
              padding: '0.8rem 1.5rem',
              background: activeIndex === idx ? 'var(--text-primary)' : 'rgba(255,255,255,0.05)',
              color: activeIndex === idx ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center', height: '60px' }}>
        <p className="text-body" style={{ color: 'var(--text-primary)', fontSize: '1.2rem' }}>
          {products[activeIndex].desc}
        </p>
      </div>

    </section>
  );
};

export default SectionProducts;
