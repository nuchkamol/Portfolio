import { useEffect, useRef, useState } from 'react';
import '../css/GameWrapper.css'; // ✅ นำเข้า CSS เฉพาะ component นี้

function GameWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const baseWidth = 1280;
    const baseHeight = 720;

    const resize = () => {
      // ตรวจแนวหน้าจอ
      setIsPortrait(window.innerHeight > window.innerWidth);

      const scale = Math.min(
        window.innerWidth / baseWidth,
        window.innerHeight / baseHeight
      );

      if (wrapperRef.current) {
        wrapperRef.current.style.zoom = `${scale}`;
        wrapperRef.current.style.width = `${baseWidth}px`;
        wrapperRef.current.style.height = `${baseHeight}px`;
        wrapperRef.current.style.position = 'absolute';
        wrapperRef.current.style.left = '50%';
        wrapperRef.current.style.top = '50%';
        wrapperRef.current.style.transform = 'translate(-50%, -50%)';
        wrapperRef.current.style.transformOrigin = 'center center';
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="game-container">
      {isPortrait && (
        <div className="rotate-overlay">
          กรุณาหมุนจอเป็นแนวนอนเพื่อใช้งาน 😊
        </div>
      )}

      <div className="game-wrapper" ref={wrapperRef}>
        {children}
      </div>
    </div>
  );
}

export default GameWrapper;
