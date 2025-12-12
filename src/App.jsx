import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components สำหรับแต่ละหน้า
import Home from './components/Home';
import NotFound from './components/NotFound'; // สำหรับหน้าไม่พบ
import Profile from './components/Profile'; 
import Work from './components/Work.jsx'; 
import Unity from './components/UnityGame.jsx'; 
import Resume from './components/Resume.jsx'; 
import GameWrapper from './components/GameWrapper.tsx';
import ProjectDetail from "./components/ProjectDetail"; 
import "./App.css";
import Navbar from "./components/Navbar";
function App() {
  return (
    
    <Router>
    
        {/* Navbar จะแสดงทุกหน้า */}
      <Navbar />

      <Routes>
        {/* Route สำหรับหน้าหลัก - นี่คือส่วนที่กำหนดให้ Home.js เป็น default page */}
        <Route path="/home" element={<Profile />} />
        <Route path="/work" element={<Work />} />
        <Route path="/unity" element={<Unity />} />
        <Route path="/cv" element={<Resume />} />
        <Route path="/project/:categoryId" element={<ProjectDetail />} /> 
         {/* <Route path="/project/:id" element={<Gallery />} /> */}
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