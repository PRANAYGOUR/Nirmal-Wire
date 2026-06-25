import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
}

const Section: React.FC<SectionProps> = ({ id, children, align = 'center', style }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Cinematic fade in and slide up
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
        }
      }
    );
  }, []);

  let alignItems = 'center';
  let textAlign: 'center' | 'left' | 'right' = 'center';

  if (align === 'left') {
    alignItems = 'flex-start';
    textAlign = 'left';
  } else if (align === 'right') {
    alignItems = 'flex-end';
    textAlign = 'right';
  }

  return (
    <section 
      id={id}
      ref={sectionRef} 
      className="cinematic-section" 
      style={{ ...style }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems, textAlign }}>
        <div ref={contentRef} style={{ width: '100%', maxWidth: '800px' }}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
