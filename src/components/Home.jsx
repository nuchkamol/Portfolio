// Home.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  const layersRef = useRef([]);
  const cloudRefs = useRef([]);
  const cloudWrapperRefs = useRef([]);
  const cloudCount = 5;
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    let offset = 0;

    const move = () => {
      offset += 1;

      layersRef.current.forEach((layer, index) => {
        const speed = (index + 1) * 0.2;
        if (layer) {
          if (index === 0) {
            const scale = 1 + offset * speed * 0.0012;
            layer.style.transform = `translateY(-${offset * speed}px) scale(${scale})`;
          } else {
            layer.style.transform = `translateY(-${offset * speed}px)`;
          }
        }
      });

      cloudRefs.current.forEach((cloud, index) => {
        const speed = (index + 1) * 0.1;
        if (cloud) {
          cloud.style.transform = `translateY(${offset * speed}px)`;
        }
      });

      requestAnimationFrame(move);
    };

    move();

    const timer = setTimeout(() => {
      navigate('/profile');
    }, 12000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleCloudHover = (idx) => {
    const wrapper = cloudWrapperRefs.current[idx];
    if (wrapper) {
      const randomX = (Math.random() - 0.5) * 3000;
      const randomY = (Math.random() - 0.5) * 3000;
      wrapper.style.transition = 'transform 1s ease';
      wrapper.style.transform = `translate(${randomX}px, ${randomY}px)`;
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="parallax-container">
      <audio ref={audioRef} src="/sounds/whoosh.mp3" preload="auto" />

      {["/images/sky-back.png","/images/sky-mid.png","/images/sky-front.png"].map((src, idx) => (
        <div
          key={idx}
          ref={(el) => (layersRef.current[idx] = el)}
          className="parallax-layer"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'repeat-y',
            backgroundSize: idx === 2 ? '78%' : 'cover',
            backgroundPosition: 'top'
          }}
        />
      ))}

      {[...Array(cloudCount)].map((_, idx) => (
        <div
          key={`cloud-wrapper-${idx}`}
          ref={(el) => (cloudWrapperRefs.current[idx] = el)}
          style={{
            position: 'absolute',
            top: `${Math.random() * 60 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={() => handleCloudHover(idx)}
        >
          <img
            ref={(el) => (cloudRefs.current[idx] = el)}
            src="/images/cloud.png"
            alt="cloud"
            className="floating-cloud"
            style={{
              width: `${100 + Math.random() * 200}px`,
              pointerEvents: 'none'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
