import { Link } from "react-router-dom";
import { projectsByCompany } from "./data/projects";

function Work() {
  return (
    <div className="blur-in">
      <p style={{ height: "80px" }}></p>
      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1>My Portfolio</h1>
        <p style={{ color: "#666", marginBottom: "30px" }}>Explore Projects by Company (เลือกดูผลงานตามบริษัท)</p>

        {/* วนลูปตามกลุ่มบริษัท */}
        {projectsByCompany.map((companyGroup) => (
          <div key={companyGroup.companyName} style={{ marginBottom: "60px" }}>
            
            {/* หัวข้อ: ชื่อบริษัท */}
            <h2 style={{ 
              borderLeft: "5px solid #00bcd4", 
              paddingLeft: "15px", 
              marginBottom: "25px",
              fontSize: "1.5rem" 
            }}>
              {companyGroup.companyName}
            </h2>

            {/* 🛠️ ปรับส่วนนี้: ใช้ Flexbox เพื่อให้จัดกึ่งกลางได้เมื่อมีโปรเจกต์เดียว */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "25px",
                justifyContent: "flex-start", // หรือเปลี่ยนเป็น "center" ถ้าอยากให้ทุกอย่างอยู่กลางเสมอ
                marginTop: "15px",
              }}
            >
              {/* วนลูปแสดงโปรเจกต์ภายในบริษัท */}
              {companyGroup.projects.map((project) => (
                <Link 
                  key={project.id} 
                  to={`/project/${project.id}`}
                  style={{ 
                    textDecoration: "none", 
                    color: "inherit",
                    // 🛠️ กำหนดขนาด Card ให้คงที่ ไม่ยืดเต็มหน้าจอ
                    width: "100%",
                    maxWidth: "350px", 
                    flex: "0 1 350px" 
                  }}
                >
                  <div
                    className="project-card" // เผื่อใส่ CSS Hover ในไฟล์ .css
                    style={{
                      border: "1px solid #eee",
                      borderRadius: "16px",
                      overflow: "hidden",
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      height: "100%", // ให้ Card สูงเท่ากันในแถวเดียว
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                    }}
                  >
                    <div style={{ height: "200px", overflow: "hidden", backgroundColor: "#f9f9f9" }}>
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover", // 👈 สำคัญ: ภาพจะไม่เบี้ยว
                          display: "block"
                        }} 
                      />
                    </div>
                    <div style={{ padding: "20px", textAlign: "left" }}>
                      <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem", lineHeight: "1.4" }}>
                        {project.title}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "#777", margin: 0 }}>
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Work;
