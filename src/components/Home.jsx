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
const balloonRef = useRef();

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
        const speed = (index + 1) * 0.02;
        if (cloud) {
          cloud.style.transform = `translateY(${offset * speed}px)`;
        }
      });

      requestAnimationFrame(move);
    };

    move();

    // const timer = setTimeout(() => {
    //   navigate('/profile');
    // }, 12000);

    // return () => clearTimeout(timer);
  }, []);



const moveBalloonToCenter = () => {
  const balloon = balloonRef.current;
  if (!balloon) return;
  // แกว่งเบาๆ ก่อน
  balloon.style.animation = "sway 1.5s ease-in-out";
  // คำนวณตำแหน่งเป้าหมาย
  const rect = balloon.getBoundingClientRect();
  const balloonWidth = rect.width;
  const balloonHeight = rect.height;

  const targetX = window.innerWidth / 2 - balloonWidth / 2;
  const targetY = window.innerHeight / 2 - balloonHeight / 2;

  // ดึงตำแหน่งเริ่มต้น
  let startX = rect.left;
  let startY = rect.top;

  let progress = 0;
  const duration = 1000; // 1 วินาที

  // ล็อคตำแหน่งไว้ให้ปรับได้
  balloon.style.bottom = "auto";
  balloon.style.right = "auto";
  balloon.style.left = `${startX}px`;
  balloon.style.top = `${startY}px`;
  balloon.style.position = "fixed";

  const startTime = performance.now();

  const animate = (now) => {
    progress = Math.min((now - startTime) / duration, 1);

    // ease-in-out formula
    const ease = 0.5 * (1 - Math.cos(Math.PI * progress));

    const currentX = startX + (targetX - startX) * ease;
    const currentY = startY + (targetY - startY) * ease;

    balloon.style.left = `${currentX}px`;
    balloon.style.top = `${currentY}px`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};


  const handleCloudClick = (idx) => {
    const wrapper = cloudWrapperRefs.current[idx];
    if (wrapper) {
      const randomX = (Math.random() - 0.5) *500;
      const randomY = (Math.random() - 0.5) * 500;
      wrapper.style.transition = 'transform 1s ease';
      wrapper.style.transform = `translate(${randomX}px, ${randomY}px)`;
   const sound = new Audio('/sounds/jump.mp3');
  sound.play();
    }
  };

  return (
    <div className="parallax-container">
      <audio ref={audioRef} src="/sounds/whoosh.mp3" preload="auto" />

      {["/images/sky-back.png","/images/sky-mid.png","/images/sky-front.png" ].map((src, idx) => (
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
          onClick={() => handleCloudClick(idx)}
        >
          <img
            ref={(el) => (cloudRefs.current[idx] = el)}
            src="/images/cloud.png"
            alt="cloud"
            className="floating-cloud"
            style={{
              width: `${100 + Math.random() * 200}px`,
     
            }}
          />
        </div>
      ))}


 {/* บอลลูนอยู่นอกลูป parallax */}
 
<img
  src="/images/balloon.png"
  alt="Balloon"
  ref={balloonRef}
  className="balloon-fixed"
  onClick={moveBalloonToCenter}
/>
  
    </div>
  );
};

export default Home;
