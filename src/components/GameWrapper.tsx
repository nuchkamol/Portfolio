// GameWrapper.tsx
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
        wrapperRef.current.style.position = 'absolute';
        wrapperRef.current.style.left = `${(window.innerWidth - baseWidth * scale) / 2}px`;
        wrapperRef.current.style.top = `${(window.innerHeight - baseHeight * scale) / 2}px`;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: '#bfefff',
      }}
    >
      <div ref={wrapperRef}>{children}</div>
    </div>
  );
}

export default GameWrapper;
