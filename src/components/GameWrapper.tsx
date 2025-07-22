import { useEffect, useRef } from 'react';

function GameWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const baseWidth = 1280;
    const baseHeight = 720;

    const resize = () => {
      const scale = Math.min(
        window.innerWidth / baseWidth,
        window.innerHeight / baseHeight
      );

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `scale(${scale})`;
        wrapperRef.current.style.transformOrigin = 'top left';
        wrapperRef.current.style.width = `${baseWidth}px`;
        wrapperRef.current.style.height = `${baseHeight}px`;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#bfefff',
      }}
    >
      {children}
    </div>
  );
}

export default GameWrapper;
