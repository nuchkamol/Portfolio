// Home.jsx
import React, { useEffect, useRef, useState } from "react";

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
  // ✅ ประกาศตัวแปรสำหรับภาพ sky-back
const [zoomOut, setZoomOut] = useState(false);
const [showNewSky, setShowNewSky] = useState(false);
const [bgStep, setBgStep] = useState(1); // เริ่มที่ภาพแรก


  useEffect(() => {


     const img = new Image();
  img.src = '/images/sky-back-new-1.png';
  img.src = '/images/sky-back-new-2.png';
  img.src = '/images/sky-back-new-3.png';



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


const bgCommonStyle = {
  backgroundRepeat: 'repeat-y',
  backgroundSize: '100% auto',
  backgroundPosition: 'top',
  backgroundAttachment: 'scroll',
  minHeight: '300vh',
  position: 'absolute',
  width: '100%',
  height: '100%',
  transition: 'opacity 1.5s ease-in-out',
  zIndex: 0 // <<< ต้องต่ำกว่ sky-back.png ก่อน จะแสดง new sky เมื่อ bgStep เปลี่ยนเท่านั้น
};

const moveBalloonToCenter = () => {
  const balloon = balloonRef.current;
  if (!balloon) return;
 // แกว่งเบาๆ ก่อน
  balloon.style.animation = "sway 1.5s ease-in-out";
  // ✅ STEP 1: คำนวณตำแหน่งกลางจอ กับตำแหน่งเริ่มต้น
  const rect = balloon.getBoundingClientRect();
  const balloonWidth = rect.width;
  const balloonHeight = rect.height;

  const centerX = window.innerWidth / 2 - balloonWidth / 2;
  const centerY = window.innerHeight / 2 - balloonHeight / 2;

  const deltaX = centerX - rect.left;
  const deltaY = centerY - rect.top;

  const duration = 3000;
  const startScale = 1;
  const targetScale = 0.6;

  // ✅ STEP 2: ล็อกตำแหน่งปัจจุบันไว้ด้วย fixed และ left/top จริง
  balloon.style.position = "fixed";
  balloon.style.left = `${rect.left}px`;
  balloon.style.top = `${rect.top}px`;
  balloon.style.bottom = "auto";
  balloon.style.right = "auto";

  // ✅ STEP 3: ใส่ transform เริ่มต้น
  balloon.style.transform = `translate(0px, 0px) scale(${startScale})`;
  balloon.style.transition = "none";

       // 🔊 เสียงประกอบ
  const sound = new Audio("/sounds/air-woosh.wav");
  sound.play();

  // ✅ STEP 4: เริ่ม animation หลัง browser วาดตำแหน่งเริ่ม
  requestAnimationFrame(() => {
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 0.5 * (1 - Math.cos(Math.PI * progress)); // ease-in-out

      const currentX = deltaX * ease;
      const currentY = deltaY * ease;
      const currentScale = startScale + (targetScale - startScale) * ease;

      balloon.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
 
    if (progress < 1) {

      requestAnimationFrame(animate);
    } else {
setZoomOut(true);
setShowNewSky(true);
setBgStep(1); // เฟด bg-1 หลังภาพเก่าหาย

// ❌ ปิดการคลิก
balloon.style.pointerEvents = "none";

// ✅ เริ่มลอยไปซ้ายล่าง
setTimeout(() => {
  balloon.style.transition = 'all 10s ease-in-out';
  balloon.style.left = '0%';
  balloon.style.top = '40%';
  balloon.style.transform = 'translate(0, 0) scale(0.4)';
}, 300);

// ✅ เปลี่ยนพื้นหลังต่อ
setTimeout(() => setBgStep(2), 4000);
setTimeout(() => setBgStep(3), 9000);

    }
    };

    requestAnimationFrame(animate); // เริ่มหลังจาก 1 เฟรม
  });
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

<div className="zoom-layer-container">
  {/* BG 1 */}
  <div
    className="zoom-fade-new"
    style={{
      ...bgCommonStyle,
      backgroundImage: `url('/images/sky-back-new-1.png')`,
     
         opacity: bgStep === 1 ? 1 : 0,
    //display: bgStep === 1 ? 'block' : 'none',
    }}
  />

  {/* BG 2 */}
  <div
    className="zoom-fade-new"
    style={{
      ...bgCommonStyle,
      backgroundImage: `url('/images/sky-back-new-2.png')`,
  opacity: bgStep === 2 ? 1 : 0,
   // display: bgStep === 2 ? 'block' : 'none',
    }}
  />

  {/* BG 3 */}
  <div
    className="zoom-fade-new"
    style={{
      ...bgCommonStyle,
      backgroundImage: `url('/images/sky-back-new-3.png')`,
     opacity: bgStep === 3 ? 1 : 0,
    //display: bgStep === 3 ? 'block' : 'none',
    }}
  />

  {/* BG เก่า */}
  <div
    className={`zoom-fade-old ${zoomOut ? 'hide' : ''}`}
    ref={el => layersRef.current[0] = el}
    style={{
      backgroundImage: `url('/images/sky-back.png')`,
      backgroundRepeat: 'repeat-y',
      backgroundSize: '100% auto',
      backgroundPosition: 'top',
      backgroundAttachment: 'scroll',
      minHeight: '300vh',
      zIndex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: showNewSky ? 0 : 1, // ✅ จางหาย
      transition: 'opacity 1.5s ease-in-out'
    }}
  />
</div>

  {/* 👉 sky-mid กับ sky-front */}
  {["/images/sky-mid.png", "/images/sky-front.png"].map((src, idx) => (
    <div
      key={`sky-layer-${idx + 1}`}
      ref={(el) => (layersRef.current[idx + 1] = el)}
      className="parallax-layer"
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'repeat-y',
        backgroundSize: idx === 1 ? '78%' :'100% auto',
        backgroundPosition: 'top',
          backgroundAttachment: 'scroll',
        zIndex: idx + 2,
        position: 'absolute',
        width: '100%',
         height: '300vh',  
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
            cursor: 'pointer',
              zIndex: 10,
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
