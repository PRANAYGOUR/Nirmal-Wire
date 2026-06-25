import React from 'react';

interface LoaderProps {
  progress: number;
}

const Loader: React.FC<LoaderProps> = ({ progress }) => {
  const isLoaded = progress >= 100;

  return (
    <div className={`loader-wrapper ${isLoaded ? 'loaded' : ''}`}>
      <h2 className="heading-section" style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Nirmal Wire</h2>
      <div className="text-subtitle" style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-green)' }}>
        Engineering Security
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} 
        />
      </div>
      <div style={{ marginTop: '1.5rem', fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
        Loading Assets... {Math.round(progress)}%
      </div>
    </div>
  );
};

export default Loader;
