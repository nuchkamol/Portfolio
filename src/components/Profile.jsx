// React version of the portfolio template with smooth scroll + fade-in effect + profile image
import React, { useEffect, useRef, useState } from "react";
import "../css/Profile.css";

import cv from "../docs/CV 2025.pdf";
import profileImage from "../images/profile.jpg"; // 👈 add your image to src folder and name it profile.jpg


const skills = [
  ".NET Core",
  "C#",
  "C++",
  "PHP",
  "SQL Server",
  "MySQL",
  "Angular",
  "API Integration Rest/Soap",
  "Remote Work",
  "Git",
  "Unity",
  "React",
  "Node.js",
  "Database Oracle/MSSQL/mySQL",
  "Captive Portal",
  "Responsive",
  "HTML5",
  "CSS",
  "JS",
  "TypeScript"


  
];

const projects = [
 
{
  title: "Database Migration Tool",
  tech: "C#, .NET WinForms, Oracle, SQL Server, MySQL",
  desc: "Developed a custom database migration tool using C# WinForms to transfer data from Oracle to SQL Server and MySQL, supporting large-scale table conversion, data type mapping, and bulk operations with progress tracking and error handling."
} ,
  {
    title: "PRCMS for BEC World",
    tech: ".NET Core, Angular, SQL Server",
    desc: "Content management system for press releases. Built API-driven backend with role-based access, public/private sharing, and integrated photo galleries."
  },
  {
    title: "WiFi Portal Redesign for AIS",
    tech: "Angular 8, Node.js, API Gateway",
    desc: "Revamped user interface and authentication flow for AIS WiFi Portal. Improved UX and reduced customer login issues by 40%."
  },
{
  title: "Election US API",
  tech: "C# (.NET Framework 4.0), WinForms application running as an API provider for the Graphic Viz Engine",
  desc: "Developed the U.S. Election 2024 API by integrating data from AP News, delivering real-time results to a custom Graphic Viz Engine."
},{
  title: "Free SIM Online Registration",
  tech: "C# MVC, Co-operated with Rabbit LINE Pay (LINE Company)",
  desc: "Developed an online survey and free SIM registration system using C# MVC, in collaboration with the Rabbit LINE Pay team."
},{
  title: "E-Exam System for Chulalongkorn University",
  tech: "VB.NET, Crystal Reports",
  desc: "Developed a random examination system used at Chulalongkorn University, including an admin management interface and reporting module using Crystal Reports."
},{
  title: "Tax Refund Web System for Double A",
  tech: "VB.NET, SAP Integration",
  desc: "Developed a web-based tax refund system for Double A Company using VB.NET. The system calculates and exports tax data from SAP and submits it to the Customs Department."
}
,{
  title: "VoIP Analysis & Verification System",
  tech: "C++, PHP, Asterisk (Trixbox), Unix",
  desc: "Developed a web application to analyze and verify the usability of a Voice over IP (VoIP) system by retrieving call data from Asterisk (Trixbox), using C++ and PHP on a Unix-based environment."
}




];

function scrollToSection(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function Profile() {
       const iframeRef = useRef();
  const remoteRef = useRef();
  const [videoId, setVideoId] = useState("j-ERr7s9exU"); // default video ID
  const [drag, setDrag] = useState({ x: 0, y: 0 });

  const handleRemoteControl = (action) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const message = { event: "command", func: action, args: [] };
    iframe.contentWindow.postMessage(JSON.stringify(message), "*");
  };


  const skipSeconds = (seconds) => {
  const iframe = iframeRef.current;
  if (!iframe) return;

  // ส่งคำสั่งขอเวลา ณ ปัจจุบัน
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "listening", id: "1" }),
    "*"
  );

  // ฟัง response
  const handler = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.info && typeof data.info.currentTime === 'number') {
        const newTime = data.info.currentTime + seconds;
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "seekTo", args: [newTime, true] }),
          "*"
        );
        window.removeEventListener("message", handler);
      }
    } catch (e) {}
  };

  window.addEventListener("message", handler);
};


   const goFullScreen = () => {
    const iframe = iframeRef.current;
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen(); // สำหรับ Safari
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen(); // สำหรับ Firefox
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen(); // สำหรับ IE/Edge
    }
  };


const startDrag = (e) => {
  e.preventDefault();
  const startX = e.clientX;
  const startY = e.clientY;
  const initX = drag.x;
  const initY = drag.y;

  const onMouseMove = (e) => {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    setDrag({ x: initX + deltaX, y: initY + deltaY });
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};


  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      section.classList.add("fade-in");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="blur-in">
      <nav className="navbar">
        <ul>
          <li><a href="#about" onClick={(e) => scrollToSection(e, "about")}>About</a></li>
          <li><a href="#skills" onClick={(e) => scrollToSection(e, "skills")}>Skills</a></li>
          <li><a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>Contact</a></li>
          <li><a href="#resume" onClick={(e) => scrollToSection(e, "resume")}>Resume</a></li>
          <li><a href="#game" onClick={(e) => scrollToSection(e, "game")}>myGame</a></li>
          <li><a href="#creator" onClick={(e) => scrollToSection(e, "creator")}>myCreator</a></li>
          <li><a href="#video" onClick={(e) => scrollToSection(e, "video")}>Portfolio TV</a></li>

        </ul>
      </nav>

      <header className="header">
        <img src={profileImage} alt="Profile" className="profile-pic" />
        <h1>Nuchkamol Nutaman</h1>
        <p>Senior Full-Stack Developer | .NET | PHP | API Integration</p>
      </header>

      <div className="container" style={{ position: "relative", minHeight: "500px" }}>
        <section id="about">
          <h2>About Me</h2>
          <p>
            Experienced full-stack developer with over 14 years of expertise in
            enterprise web systems. Passionate about clean code, remote work,
            and solving real-world problems with scalable software solutions.
          </p>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          {projects.map((project, index) => (
            <div className="project" key={index}>
              <h3>{project.title}</h3>
              <p><strong>Tech:</strong> {project.tech}</p>
              <p>{project.desc}</p>
            </div>
          ))}
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <div className="skills">
            {skills.map((skill, index) => (
              <div className="skill" key={index}>{skill}</div>
            ))}
          </div>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>Email: nuchkmun@hotmail.com</p>
          <p>
            LinkedIn: <a href="https://www.linkedin.com/in/nuchkamol-nutaman-930b332b5" target="_blank" rel="noreferrer">linkedin.com/in/nuchkamol-nutaman</a>
          </p>
          
        </section>

         <section className ="resume-section" id="resume">
                <div className ="resume-section-content">
                    <h2 className ="mb-5">resume</h2>
                  
                     
                         
                            <embed
                            src={cv}
                            type="application/pdf"
                            frameBorder="0"
                            scrolling="auto"
                            height="1000px"
                            width="100%"
                        ></embed>
                     </div>
                      
                  
               
            </section>
        <section className ="game-section" id="game">

                                <h2 class="mb-5">My Game</h2>
      <div id="game">
      <div className ="row tm-about-row ">
        <div className ="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className ="tm-headergame-img"></div>
       
        </div>
      </div>
      <div className ="row tm-about-row tm-mb-medium">
        <div className ="col-xl-12 col-lg-12 col-md-12 col-sm-12">
         
          <div className ="embed-responsive embed-responsive-21by9">
         
            <iframe src="https://itch.io/embed-upload/4433836?color=FFDFEA" allowfullscreen="" width="900" height="650" frameborder="0"><a href="https://nuchkamol.itch.io/kulanuch">Play Kulanuch on itch.io</a></iframe>
          </div>
        </div>
      </div>
    </div> 
        </section>

    <section className="creator-section" id="creator">
          <div className="resume-section-content">
            <h2 className="mb-5">3D creator by me</h2>
            <div className="creators-embed-wrapper">
              <iframe
                allow="camera"
                width="100%"
                height="480"
                src="https://v.creators3d.com/index.html?load=%2Fviews%2Fproduction%2Fitem%2F2021927%2F1998788798077131%2F1998788798077131.glb&autorotate=true&json-data=1632764068356&decrypt=1&tv=126"
                frameBorder="0"
                allow="autoplay; fullscreen; vr"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                style={{ border: "none" }}
              ></iframe>
              <p style={{ fontSize: "13px", fontWeight: "normal", margin: "5px", color: "#4A4A4A" }}>
                <a
                  href="https://v.creators3d.com/index.html?load=%2Fviews%2Fproduction%2Fitem%2F2021927%2F1998788798077131%2F1998788798077131.glb&autorotate=true&json-data=1632764068356&decrypt=1&tv=126"
                  target="_blank"
                  style={{ fontWeight: "bold", color: "#64FFDA" }}
                  rel="noreferrer"
                >
                  Visit Model
                </a> by <a
                  target="_blank"
                  style={{ fontWeight: "bold", color: "#64FFDA" }}
                  href="https://www.creators3d.com/artist/22092/nuchkamol"
                  rel="noreferrer"
                >
                  nuchkamol
                </a> hosted with ❤️️ by <a
                  href="https://www.creators3d.com/home?ref=embed&var=22092"
                  target="_blank"
                  style={{ fontWeight: "bold", color: "#64FFDA" }}
                  rel="noreferrer"
                >
                  Creators3D
                </a>
              </p>
            </div>
          </div>
        </section>



 <section id="video" className="video-section">
          <h2>Portfolio TV</h2>

      
<div className="tv-wrapper" style={{ marginTop: 150 }}>
            <div className="tv-frame">
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&controls=0`}
                title="Portfolio Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
            <div
              className="remote-control"
              ref={remoteRef}
              onMouseDown={startDrag}
              style={{
                left: `${drag.x}px`,
                top: `${drag.y}px`,
                position: "absolute",
                zIndex: 1000,
                background: "#222",
                padding: "1rem",
                borderRadius: "12px",
                color: "white",
                width: "160px",
                boxShadow: "0 0 10px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                alignItems: "center"
              }}
            >
              <h4 style={{ textAlign: "center", marginBottom: "0.5rem" }}>REMOTE</h4>
              <div   style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.3rem" }}>
                <button onClick={() => handleRemoteControl("playVideo")}>▶</button>
                <button onClick={() => handleRemoteControl("pauseVideo")}>⏸</button>
                <button onClick={() => handleRemoteControl("mute")}>🔇</button>
                <button onClick={() => handleRemoteControl("unMute")}>🔊</button>
                <button onClick={() => goFullScreen("fullscreen")}>📺</button>
                  <button onClick={() => skipSeconds(-5)}>⏪</button>
              </div>

              
              <hr style={{ width: "100%", border: "0.5px solid #444" }} />
              <button onClick={() => setVideoId("j-ERr7s9exU")}>PRCMS</button>
              <button onClick={() => setVideoId("56Rqsz8J7ME")}>CarPark</button>
              <button onClick={() => setVideoId("0weByj4Z2e8")}>WiFi Portal</button>
            </div>
          </div>
        </section>


      </div>

      <footer className="footer">
        &copy; 2025 Nuchkamol Nutaman. All rights reserved.
      </footer>
    </div>
  );
}

export default Profile;
