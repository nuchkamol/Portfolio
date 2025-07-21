// Home.jsx
import React, { useEffect, useRef, useState } from "react";
import DialogBox from './Dialogbox';
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import HoverImage from '../js/HoverImage';

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
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
const [fadeMidFront, setFadeMidFront] = useState(false);
const [showBalloon, setShowBalloon] = useState(true);
const [isOpen, setIsOpen] = useState(false);
const [hasReachedCow, setHasReachedCow] = useState(false);
const [lastTargetIndex, setLastTargetIndex] = useState(null);


const dollImageRef = useRef(null);  
  const dollRef = useRef(null);
  // const buttonRef = useRef(null);


const buttonRefs = useRef([]);
const [targetIndex, setTargetIndex] = useState(null);
const [startWalk, setStartWalk] = useState(false);
const [hasReachedAnimal, setHasReachedAnimal] = useState(false);
const [imgSrc, setImgSrc] = useState("/images/doll.png");
const [showDialog, setShowDialog] = useState(false);
const [dialogText, setDialogText] = useState("");


  const animals = [
  {
    name: "cow",
    normalSrc: "/images/cow.png",
    hoverSrc: "/images/cow-face.png",
    resultImg: "/images/doll-cow.png",
    dialog: "ลูบวัวแล้ว~ 🐄",
    position: "right", // 🟢 อยู่ด้านขวาของปุ่ม
    style: { left: "20%", bottom: "40%" ,
             position: 'fixed',
              width: '500px',
              height: '500px',
              transform: 'scale(0.3)',
              zIndex: 9,
              cursor: 'pointer',
              visibility: showBalloon ? 'hidden' : 'visible', // 🔥 ซ่อนแบบยังอยู่ใน DOM
              pointerEvents: showBalloon ? 'none' : 'auto',   // 🔥 ป้องกันการคลิกผิดตอนซ่อน

    }
  },
  {
    name: "rabbit",
    normalSrc: "/images/rabbit.png",
    hoverSrc: "/images/rabbit-face.png",
    resultImg: "/images/doll-sit.png",
    dialog: "กระต่ายน้อยยย~ ฉันเคยเลี้ยงกระต่าย กระต่ายเจ้าขี้เป็นเม็ดๆ และยังมีลูกเก่งอีกด้วย ^^",
    position: "left", 
    style: { left: "20%", bottom: "10%",
            position: 'fixed',
            width: '500px',
            height: '500px',
            transform: 'scale(0.1)',
            zIndex: 9,
            cursor: 'pointer',
              visibility: showBalloon ? 'hidden' : 'visible', // 🔥 ซ่อนแบบยังอยู่ใน DOM
              pointerEvents: showBalloon ? 'none' : 'auto',   // 🔥 ป้องกันการคลิกผิดตอนซ่อน
          
     }
  },
  {
    name: "vegetable",
    normalSrc: "/images/vegetable.png",
    hoverSrc: "/images/vegetable-grow.png",
    resultImg: "/images/doll-sit.png",
    dialog: "ลูบแมวแล้ว~ 🐱",
    position: "left", 
    style: { left: "35%", bottom: "-16%" ,
             position: 'fixed',
             width: '800px',
             height: '500px',
             transform: 'scale(0.4)',
             zIndex: 9,
             cursor: 'pointer',
             visibility: showBalloon ? 'hidden' : 'visible', // 🔥 ซ่อนแบบยังอยู่ใน DOM
             pointerEvents: showBalloon ? 'none' : 'auto',   // 🔥 ป้องกันการคลิกผิดตอนซ่อน
             transformOrigin: 'top left', // ✅ เพิ่มบรรทัดนี้
    }
  }
];




const [cloudStyles, setCloudStyles] = useState(() =>
  Array.from({ length: cloudCount }, () => ({
    top: `${Math.random() * 60 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    width: `${100 + Math.random() * 200}px`,
  }))
);

const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
const bg1 = isMobile ? '/images/sky-back-new-1-vertical.png' : '/images/sky-back-new-1.png';
const bg2 = isMobile ? '/images/sky-back-new-2-vertical.png' : '/images/sky-back-new-2.png';
const bg3 = isMobile ? '/images/sky-back-new-3-vertical.png' : '/images/sky-back-new-3.png';


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


const [styledoll, setStyle] = useState({
    position: 'fixed',
    left: '-1%',
    bottom: '-2%',
    width: '500px',
    height: '500px',
    transform: 'scale(0.2)',
    zIndex: 9,
    cursor: 'pointer',
    transition: 'transform 1s ease-out, left 1s ease-out, bottom 1s ease-out',

transform: 'translate(0, 0) scale(0.2) translateZ(0)',
  });

  function getTranslateX(transform) {
  const match = /translate\((-?\d+(?:\.\d+)?)/.exec(transform);
  return match ? parseFloat(match[1]) : 0;
}

function getTranslateY(transform) {
  const match = /translate\([^,]+,\s*(-?\d+(?:\.\d+)?)/.exec(transform);
  return match ? parseFloat(match[1]) : 0;
}


useEffect(() => {
  if (
    startWalk &&
    !hasReachedAnimal &&
    dollRef.current &&
    targetIndex !== null &&
    buttonRefs.current[targetIndex]
  ) {
    setImgSrc("/images/dollwalk-back.gif");

    const doll = dollRef.current;
    const dollRect = doll.getBoundingClientRect();
    const buttonRect = buttonRefs.current[targetIndex].getBoundingClientRect();

    let offset = -50;
    let targetX = 0 , targetY=0;
    if(animals[targetIndex].position  == "right"){

         targetX = buttonRect.right + offset;
         targetY = buttonRect.top + buttonRect.height / 2 - dollRect.height / 2;
    }else{
  offset = -30;
       targetX = buttonRect.left - dollRect.width - offset;
       targetY = buttonRect.top + buttonRect.height / 2 - dollRect.height / 2;

    }


    // คำนวณ "ระยะที่ต้องขยับจากจุดปัจจุบัน"
    const deltaX = targetX - dollRect.left;
    const deltaY = targetY - dollRect.top;

    const handleTransitionEnd = () => {
      setImgSrc(animals[targetIndex].resultImg);
      setDialogText(animals[targetIndex].dialog);
      setStartWalk(false);
      setHasReachedAnimal(true);
      setShowDialog(true);
      doll.removeEventListener('transitionend', handleTransitionEnd);
    };

    requestAnimationFrame(() => {
      setStyle(prev => ({
        ...prev,
        transform: `translate(${deltaX + getTranslateX(prev.transform)}px, ${deltaY + getTranslateY(prev.transform)}px) scale(0.2)`,
        transition: 'transform 4s ease-in-out',
      }));

      doll.addEventListener('transitionend', handleTransitionEnd);
    });

    return () => {
      doll.removeEventListener('transitionend', handleTransitionEnd);
    };
  }
}, [startWalk, hasReachedAnimal, targetIndex]);


// useEffect(() => {
//   if (startWalk && !hasReachedCow && dollRef.current && buttonRef.current) {
//     setImgSrc("/images/dollwalk-back.gif");

//     const doll = dollRef.current;
//     const dollRect = doll.getBoundingClientRect();
//     const buttonRect = buttonRef.current.getBoundingClientRect();

//     const offset = -50; // ด้านขวาของปุ่ม
//     const targetX = buttonRect.right + offset;
//     const targetY = buttonRect.top + buttonRect.height / 2 - dollRect.height / 2;

//     const deltaX = targetX - dollRect.left;
//     const deltaY = targetY - dollRect.top;

//     // reset transform ก่อนเดิน
//     setStyle(prev => ({
//       ...prev,
//       transform: 'translate(0px, 0px) scale(1)',
//       transition: 'none',
//     }));

//     const handleTransitionEnd = () => {
//       setImgSrc('/images/doll-cow.png'); // เปลี่ยนเป็นยืนลูบวัว
//       setStartWalk(false);
//       setHasReachedCow(true); // ✅ เดินถึงแล้ว!
//       setShowDialog(true);
//       doll.removeEventListener('transitionend', handleTransitionEnd);
//     };

//     requestAnimationFrame(() => {
//       setStyle(prev => ({
//         ...prev,
//         transform: `translate(${deltaX}px, ${deltaY}px) scale(0.2)`,
//         transition: 'transform 4s ease-in-out',
//       }));

//       doll.addEventListener('transitionend', handleTransitionEnd);
//     });

//     return () => {
//       doll.removeEventListener('transitionend', handleTransitionEnd);
//     };
//   }
// }, [startWalk, hasReachedCow]);


// const handleClick = (index) => {
//   if (!hasReachedCow) {

//   setTargetIndex(index);
//   setStartWalk(true);
//   // setHasReachedAnimal(false);
//   setShowDialog(false);
//   } else {
//     // กดซ้ำก็ไม่ทำอะไร หรือจะเปิด dialog ซ้ำก็ได้
//     setShowDialog(true);
//   }
// };
const handleTransitionEnd = () => {
  setImgSrc(animals[targetIndex].resultImg);
  setDialogText(animals[targetIndex].dialog);
  setStartWalk(false);
  setHasReachedAnimal(true);
  setShowDialog(true);
  dollRef.removeEventListener('transitionend', handleTransitionEnd);
};

const handleClick = (index) => {
  if (index === lastTargetIndex && hasReachedAnimal) {
    // ✅ กดเป้าหมายเดิมหลังจากเดินถึงแล้ว → แสดง dialog ซ้ำ
    setDialogText(animals[index].dialog);
    setShowDialog(true);
  } else {
    // ✅ เป้าหมายใหม่ → เริ่มเดิน
    setTargetIndex(index);
    setLastTargetIndex(index); // จำเป้าหมายล่าสุดไว้
    setStartWalk(true);
    setHasReachedAnimal(false); // รีเซ็ตสถานะ
    setShowDialog(false);
  }
};

// const bgCommonStyle = {
//   backgroundRepeat: 'repeat-y',
//   backgroundSize: 'contain',
//   backgroundPosition: 'center',
//   backgroundAttachment: 'scroll',
//   minHeight: '610vh',
//   position: 'absolute',
//   width: '100%',
//   height: '100%',
//   transition: 'opacity 1.5s ease-in-out',
//   zIndex: 0 // <<< ต้องต่ำกว่ sky-back.png ก่อน จะแสดง new sky เมื่อ bgStep เปลี่ยนเท่านั้น
// };
const bgCommonStyle = {
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'bottom center',
  backgroundAttachment: 'scroll',
  minHeight: '0vh',
  position: 'absolute',
  width: '100%',
  height: '100%',
  transition: 'opacity 1.5s ease-in-out',
  zIndex: 0
};

// const bgCommonStyle = {
//   backgroundRepeat: 'no-repeat',
//   backgroundSize: 'contain',
//   backgroundPosition: 'bottom center',
//   backgroundAttachment: 'scroll',
//   minHeight: '300vh',
//   position: 'absolute',
//   width: '100%',
//   height: '100%',
//   transition: 'opacity 1.5s ease-in-out',
//   zIndex: 0
// };


// const bgOtherStyle = {
//   backgroundSize: 'contain',
// backgroundRepeat: 'no-repeat',
// backgroundPosition: 'bottom center',

//   backgroundAttachment: 'scroll',
//   minHeight: '300vh',
//   position: 'absolute',
//   width: '100%',
//   height: '100%',
//   transition: 'opacity 1.5s ease-in-out',
//   zIndex: 0 // <<< ต้องต่ำกว่ sky-back.png ก่อน จะแสดง new sky เมื่อ bgStep เปลี่ยนเท่านั้น
// };

const balloonMoving = useRef(false);
const moveBalloonToCenter = () => {

    if (balloonMoving.current) return; // ถ้าเคลื่อนที่อยู่แล้ว ไม่ทำซ้ำ
    balloonMoving.current = true; // ล็อคว่ากำลังวิ่งแล้ว

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
  setFadeMidFront(true); // ✅ เฟด mid/front เฉพาะตรงนี้
// ❌ ปิดการคลิก
balloon.style.pointerEvents = "none";

// ✅ เริ่มลอยไปซ้ายล่าง
setTimeout(() => {
  balloon.style.transition = 'all 10s ease-in-out';
  balloon.style.left = '0%';
  balloon.style.bottom = '20%';
  balloon.style.transform = 'translate(0, 0) scale(0.4)';

   setTimeout(() => {
    setShowBalloon(false);
     
  }, 10000); // เวลาตรงกับ animation

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
      // backgroundImage: `url('/images/sky-back-new-1.png')`,
     backgroundImage: `url('${bg1}')`,
         opacity: bgStep === 1 ? 1 : 0,
    //display: bgStep === 1 ? 'block' : 'none',
    }}
  />

  {/* BG 2 */}
  <div
    className="zoom-fade-new"
    style={{
      ...bgCommonStyle,

         backgroundImage: `url('${bg2}')`,
  opacity: bgStep === 2 ? 1 : 0,
   // display: bgStep === 2 ? 'block' : 'none',
    }}
  />

  {/* BG 3 */}
  <div
    className="zoom-fade-new"
    style={{
      ...bgCommonStyle,
    backgroundImage: `url('${bg3}')`,
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
             opacity: fadeMidFront ? 0 : 1, // ✅ เฟดได้ตรงนี้
     transition: 'opacity 4s ease-in-out'

      }}
    />
  ))}

    {cloudStyles.map((style, idx) => (
  <div
    key={`cloud-wrapper-${idx}`}
    ref={(el) => (cloudWrapperRefs.current[idx] = el)}
    style={{
      position: 'absolute',
      top: style.top,
      left: style.left,
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
      style={{ width: style.width }}
    />
  </div>
))}


 {/* บอลลูนอยู่นอกลูป parallax */}

 
 
{/* <img
  src="/images/balloon.png"
  alt="Balloon"
  ref={balloonRef}
  className="balloon-fixed"
  onClick={moveBalloonToCenter}
/> */}
  {showBalloon && (
  <img
    src="/images/balloon.png"
    alt="Balloon"
    ref={balloonRef}
    className="balloon-fixed"
    onClick={moveBalloonToCenter}
  />
)}

{animals.map((animal, index) => (
  <HoverImage
    key={index}
    ref={el => buttonRefs.current[index] = el}
    normalSrc={animal.normalSrc}
    hoverSrc={animal.hoverSrc}
    alt={animal.name}
    onClick={() => handleClick(index)} // ✅ เรียก handleClick

    style={{
      ...animal.style,
    }}
  />
))}

<HoverImage
  normalSrc={imgSrc}
  hoverSrc="/images/doll-hand.png"
  alt="cow"
  style={{
    ...styledoll,
    visibility: showBalloon ? 'hidden' : 'visible', // 🔥 ซ่อนแบบยังอยู่ใน DOM
    pointerEvents: showBalloon ? 'none' : 'auto',   // 🔥 ป้องกันการคลิกผิดตอนซ่อน
  }}
    ref={dollImageRef}        // 👉 เฉพาะ img
  outerRef={dollRef}        // 👉 ใช้ transition ที่ div
/>
{!showBalloon && (
  <>

<HoverImage
  normalSrc="/images/dog.png"
  hoverSrc="/images/dog-stand.png"
  alt="dog"
  style={{
    position: 'fixed',
    left: '-4%',
    bottom: '-4%',
    width: '500px',
    height: '500px',
    transform: 'scale(0.15)',
    zIndex: 9,
    cursor: 'pointer',
  }}
/>



<div
  className="house"
  onMouseEnter={() => setIsOpen(true)}
  onMouseLeave={() => setIsOpen(false)}
  style={{
    position: 'fixed',
 left: '50%',
bottom: '30%',
    transform: 'scale(1)',
    zIndex: 9,
    cursor: 'pointer',
  }}
>
  <img
    src="/images/home.png"
    alt="home"
    className="house-body"
    style={{
      display: 'block',
    }}
  />

  <img
    src="/images/door.png"
    alt="door"
    className="house-door"
    style={{
      position: 'absolute',
      bottom: '70px',
      left: '105px',
      width: '60px',
      transformOrigin: 'left center',
      transform: isOpen ? 'rotateY(-110deg)' : 'rotateY(20deg)',
      transition: 'transform 0.5s ease',
      height:'120px'
    }}
  />
</div>

     <img
      src="/images/resume.png"
      alt="resume"
      className="resume"
      style={{
        position: 'fixed',
        left: '65%',
        bottom: '-38%',
        transform: 'scale(0.1)',
         zIndex:'9',
        cursor:'pointer'
      }}
    />

       {/* <HoverImage
  normalSrc="/images/vegetable.png"
  hoverSrc="/images/vegetable-grow.png"
  alt="vegetable"
  style={{
    position: 'fixed',
        left: '25%',
        bottom: '0%',
    width: '800px',
    height: '500px',
    transform: 'scale(0.4)',
    zIndex: 9,
    cursor: 'pointer',
  }}
/> */}



       <HoverImage
  normalSrc="/images/carot-baby.png"
  hoverSrc="/images/carot.png"
  alt="carot"
  style={{
    position: 'fixed',
        left: '38%',
        bottom: '-8%',
    width: '800px',
    height: '500px',
    transform: 'scale(0.4)',
    zIndex: 9,
    cursor: 'pointer',
  }}
/>

<div className="swing-wrapper">
  <img src="/images/swing-nochair.png" className="swing-frame" />

  <div className="seat-wrapper">
    <img src="/images/swingchair.png" className="swing-seat" />
  </div>
</div>


{/* <HoverImage
  normalSrc="/images/rabbit.png"
  hoverSrc="/images/rabbit-face.png"
  alt="rabbit"
    onClick={handleClick}
  ref={buttonRef}
  style={{
    position: 'fixed',
    left: '20%',
    bottom: '10%',
    width: '500px',
    height: '500px',
    transform: 'scale(0.1)',
    zIndex: 9,
    cursor: 'pointer',
  }}
/> */}

    
       <img
      src="/images/other-house.png"
      alt="other-house"
      className="other-house"
      
      style={{
        position: 'fixed',
        left: '15%',
        bottom: '30%',
        transform: 'scale(0.15)',
         zIndex:'9',
        cursor:'pointer'

      }}
    />

{/* <HoverImage
  normalSrc="/images/cow.png"
  hoverSrc="/images/cow-face.png"
  alt="cow"
  onClick={handleClick}
  ref={buttonRef}
  style={{
    position: 'fixed',
    left: '10%',
    bottom: '50%',
    width: '500px',
    height: '500px',
    transform: 'scale(0.3)',
    zIndex: 9,
    cursor: 'pointer',
  }}

/> */}


  </>
)}
{showDialog && (
  <DialogBox
    text={dialogText} // ✅ ใช้ข้อความที่ตั้งไว้ตอนเดินถึงเป้าหมาย
    onClose={() => setShowDialog(false)}
  />
)}

    </div>
  );
};

export default Home;
