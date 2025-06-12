import React, { useEffect, useState } from 'react';
import '../css/Home.css'; // นำเข้า CSS สำหรับ Component นี้
import skyBackground from '../images/sky6.jpg'; // สมมติว่าคุณบันทึกภาพท้องฟ้าไว้ใน src/assets/sky.jpg

function Home() {

const [displayText, setDisplayText] = useState("Welcome to");
const [isVisible, setIsVisible] = useState(true)
useEffect(() => {
    const intervalId = setInterval(() => {
        setIsVisible(false); // เริ่ม Fade Out

        setTimeout(() => {
            setDisplayText(prevText =>
                prevText === "Welcome to" ? "Nuchkamol Profile" : "Welcome to"
            );
            setIsVisible(true); // เริ่ม Fade In
        }, 1000); // ระยะเวลา Fade Out + พัก (1 วินาที)
    }, 4000); // เปลี่ยนข้อความทุก 4 วินาที

    return () => clearInterval(intervalId); // Cleanup เมื่อ Component Unmount
}, []);

return (
  <div className="home-container">
    <div className="sky-base"></div> {/* ภาพท้องฟ้าพื้นฐานที่อยู่นิ่ง หรือเลื่อนช้าๆ */}
    <div className="cloud-layer cloud-far"></div> {/* เมฆชั้นไกล */}
    <div className="cloud-layer cloud-mid"></div> {/* เมฆชั้นกลาง */}
    <div className="cloud-layer cloud-close"></div> {/* เมฆชั้นใกล้ */}

    <div className="text-container">
        <h1 className="welcome-text">{displayText}</h1>
    </div>
</div>
);

}

export default Home;