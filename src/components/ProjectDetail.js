import { useParams, Link } from "react-router-dom";
import { useState } from "react";
// แก้ไขชื่อ Import จาก projectCategories เป็น projectsByCompany
import { projectsByCompany } from "./data/projects";

export default function ProjectDetail() {
  // เปลี่ยนชื่อ parameter จาก categoryId เป็น projectId เพราะเราเปลี่ยน logic การค้นหา
  const { projectId } = useParams();

  // --- Logic สำหรับค้นหาโปรเจกต์ในโครงสร้างข้อมูลแบบใหม่ ---

  // วิธีการค้นหาโดยรวมโปรเจกต์ทั้งหมดเข้าด้วยกันชั่วคราว
  const allProjects = projectsByCompany.flatMap(companyGroup => companyGroup.projects);
  const project = allProjects.find(p => p.id.toLowerCase() === projectId.toLowerCase());
  
  // ใช้ตัวแปร project แทน category ใน logic ส่วนที่เหลือ

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!project) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>ไม่พบโปรเจกต์นี้</h1>
        <Link to="/work">← กลับไปหน้ารวมผลงาน</Link>
      </div>
    );
  }

  // ใช้ project.media แทน category.media
  const media = project.media || [];
  const hasMultiple = media.length > 1; // 👈 ถ้ามีหลายไฟล์ค่อยโชว์ปุ่ม

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <div className="blur-in">
      <p style={{ height: "80px" }}></p>
      <div style={{ padding: "40px" }}>
        {/* ใช้ project.title และ project.description */}
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        
        {/* หากต้องการแสดงชื่อบริษัทด้วย ให้เพิ่มโค้ดนี้: */}
        {/* <p>Company: {projectsByCompany.find(g => g.projects.includes(project))?.companyName}</p> */}

        {/* 🔥 สไลด์โชว์ */}
        <div
          style={{
            position: "relative",
            maxWidth: "700px",
            margin: "40px auto",
          }}
        >
          {/* ปุ่มย้อนกลับ (อยู่นอกกรอบ และแสดงเมื่อมีมากกว่า 1 ชิ้น) */}
          {hasMultiple && (
            <button
              onClick={prev}
              style={{
                position: "absolute",
                left: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#f1f1f1",
                color: "#333",
                border: "1px solid #ccc",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              ❮
            </button>
          )}

          {/* กรอบรูป/วิดีโอ */}
          <div
            style={{
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid #ddd",
            }}
          >
            {/* ตรวจสอบว่ามี media หรือไม่ ก่อนเข้าถึง currentIndex */}
            {media.length > 0 && media[currentIndex].type === "image" && (
              <img
                src={media[currentIndex].src}
                style={{ width: "100%", height: "auto", display: "block" }}
                alt={`media ${currentIndex}`}
              />
            )}

            {media.length > 0 && media[currentIndex].type === "video" && (
              <video
                src={media[currentIndex].src}
                controls
                style={{ width: "100%", display: "block" }}
              />
            )}
            
            {/* กรณีที่ไม่มีรูปหรือวิดีโอเลย */}
            {media.length === 0 && <p style={{padding: '20px'}}>No media available for this project.</p>}
          </div>

          {/* ปุ่มไปข้างหน้า (อยู่นอกกรอบ) */}
          {hasMultiple && (
            <button
              onClick={next}
              style={{
                position: "absolute",
                right: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#f1f1f1",
                color: "#333",
                border: "1px solid #ccc",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              ❯
            </button>
          )}
        </div>

        <div style={{ marginTop: "30px" }}>
          <Link
            to="/work"
            style={{ textDecoration: "none", color: "#00bcd4" }}
          >
            ← กลับไปหน้ารวมผลงาน
          </Link>
        </div>
      </div>
    </div>
  );
}