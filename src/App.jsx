import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components สำหรับแต่ละหน้า
import Home from './components/Home';
import NotFound from './components/NotFound'; // สำหรับหน้าไม่พบ
import Profile from './components/Profile'; 
import GameWrapper from './components/GameWrapper.tsx';
import "./App.css";
function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
        
          <li>
            <Link to="/profile">เกี่ยวกับเรา</Link>
          </li>
        
        </ul>
      </nav> */}

      <Routes>
        {/* Route สำหรับหน้าหลัก - นี่คือส่วนที่กำหนดให้ Home.js เป็น default page */}
        <Route path="/home" element={<Profile />} />
        {/* Route สำหรับหน้าเกี่ยวกับเรา */}
       <Route path="/" element={
          <GameWrapper>
            <Home />
          </GameWrapper>
        } />

        
        {/* Route สำหรับหน้าไม่พบ (ต้องอยู่ล่างสุด) */}
        <Route path="*" element={<NotFound />} />
   
      </Routes>
    </Router>
  );
}

export default App;