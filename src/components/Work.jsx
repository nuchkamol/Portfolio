import { Link } from "react-router-dom";
// เปลี่ยนชื่อ import จาก projectCategories เป็น projectsByCompany
import { projectsByCompany } from "./data/projects";

function Work() {
  return (
    <div className="blur-in">
      <p style={{ height: "80px" }}></p>
      <div style={{ padding: "40px" }}>
        <h1>My Portfolio</h1>
        <p>เลือกดูผลงานตามบริษัท</p>

        {/* วนลูปตามกลุ่มบริษัท */}
        {projectsByCompany.map((companyGroup) => (
          <div key={companyGroup.companyName} style={{ marginBottom: "50px" }}>
            
            {/* หัวข้อ: ชื่อบริษัท */}
            <h2>{companyGroup.companyName}</h2>

            {/* Grid สำหรับแสดงโปรเจกต์ย่อยในบริษัทนั้นๆ */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "15px",
              }}
            >
              {/* วนลูปแสดงโปรเจกต์ภายในบริษัท */}
              {companyGroup.projects.map((project) => (
                // ใช้ Link เชื่อมไปยังหน้ารายละเอียดของโปรเจกต์นั้นๆ
                <Link key={project.id} to={`/project/${project.id}`}>
                  <div
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                      textAlign: "center",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // เพิ่มเงาเล็กน้อย
                    }}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      style={{ width: "100%", height: "180px", objectFit: "cover" }} // เพิ่ม objectFit เพื่อให้ภาพสวยงาม
                    />
                    <div style={{ padding: "15px" }}>
                      <h3>{project.title}</h3>
                      <p style={{fontSize: "0.9rem", color: "#666"}}>{project.description}</p>
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