import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', onResize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    // Trail particles
    const trailSize = 15;
    // Initialize trail off-screen or center
    const trail: { x: number, y: number }[] = Array(trailSize).fill({ x: width / 2, y: height / 2 });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // LERP physics for fluid follow
      // Head lerps to mouse quickly
      trail[0] = {
        x: trail[0].x + (mouse.x - trail[0].x) * 0.4,
        y: trail[0].y + (mouse.y - trail[0].y) * 0.4
      };

      // Each subsequent segment lerps to the one ahead of it
      for (let i = 1; i < trailSize; i++) {
        trail[i] = {
          x: trail[i].x + (trail[i - 1].x - trail[i].x) * 0.5,
          y: trail[i].y + (trail[i - 1].y - trail[i].y) * 0.5
        };
      }

      // Draw continuous liquid wire
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trailSize; i++) {
        // Smooth quadratic curve through points
        const xc = (trail[i].x + trail[i - 1].x) / 2;
        const yc = (trail[i].y + trail[i - 1].y) / 2;
        ctx.quadraticCurveTo(trail[i - 1].x, trail[i - 1].y, xc, yc);
      }
      ctx.lineTo(trail[trailSize - 1].x, trail[trailSize - 1].y);
      
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      // Glowing wire stroke
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#b0bec5"; // Silver/grey GI wire color
      ctx.stroke();

      // Draw solid head dot
      ctx.beginPath();
      ctx.arc(trail[0].x, trail[0].y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      // Optional outer glow on head
      ctx.beginPath();
      ctx.arc(trail[0].x, trail[0].y, 12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(176, 190, 197, 0.3)";
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999999
      }}
    />
  );
};

export default Cursor;
