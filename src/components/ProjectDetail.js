import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { projectCategories } from "./data/projects";

export default function ProjectDetail() {
  const { categoryId } = useParams();
  const category = projectCategories.find(
    (c) => c.id.toLowerCase() === categoryId.toLowerCase()
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!category) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>ไม่พบโปรเจกต์นี้</h1>
        <Link to="/work">← กลับไปหน้ารวมผลงาน</Link>
      </div>
    );
  }

  const media = category.media || [];
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
        <h1>{category.title}</h1>
        <p>{category.description}</p>

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
                left: "-60px",          // 👈 อยู่นอกกรอบ ไม่บังรูป!
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
            {media[currentIndex].type === "image" && (
              <img
                src={media[currentIndex].src}
                style={{ width: "100%", height: "auto", display: "block" }}
                alt={`media ${currentIndex}`}
              />
            )}

            {media[currentIndex].type === "video" && (
              <video
                src={media[currentIndex].src}
                controls
                style={{ width: "100%", display: "block" }}
              />
            )}
          </div>

          {/* ปุ่มไปข้างหน้า (อยู่นอกกรอบ) */}
          {hasMultiple && (
            <button
              onClick={next}
              style={{
                position: "absolute",
                right: "-60px",         // 👈 อยู่นอก ไม่บังรูป!
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
