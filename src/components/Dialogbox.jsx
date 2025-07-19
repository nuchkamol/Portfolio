import React, { useEffect, useState } from 'react';
import typingSound from '../sounds/keyboard.mp3'; // เสียงพิมพ์

const DialogBox = ({ text, onClose }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const audio = new Audio(typingSound);

  useEffect(() => {
    if (charIndex < text.length) {
      const timeout = setTimeout(() => {
        const nextChar = text[charIndex];
        setDisplayedText(prev => prev + nextChar);
        setCharIndex(prev => prev + 1);

        // ✅ เงื่อนไขไม่ให้เสียงรัวเกินไป:
        if (nextChar !== ' ' && charIndex % 4 === 0) {
          audio.currentTime = 0;
          audio.play();
        }
      }, 50); // ความเร็วพิมพ์

      return () => clearTimeout(timeout);
    }
  }, [charIndex, text]);

  const clickSound = new Audio('/sounds/bubble.mp3');
clickSound.load(); // preload ไว้ก่อน

const playClickSound = () => {
  clickSound.currentTime = 0; // ย้อนเสียงไปจุดเริ่ม
  clickSound.play();
};

  return (
    <div className="dialog-box">
      <p>{displayedText}</p>
      {charIndex >= text.length && (
      <button className="cute-button" onClick={() => {
  playClickSound();
  onClose(); // ฟังก์ชันเดิมที่อยากให้ทำงานหลังคลิก
}}>
  ok
</button>
      )}
    </div>
  );
};

export default DialogBox;
