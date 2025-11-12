import { useParams, Link } from "react-router-dom";
import { projectCategories } from "./data/projects";

export default function ProjectDetail() {
  const { categoryId } = useParams();
  const category = projectCategories.find(
    (c) => c.id.toLowerCase() === categoryId.toLowerCase()
  );

  if (!category) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>ไม่พบโปรเจกต์นี้</h1>
        <Link to="/work">← กลับไปหน้ารวมผลงาน</Link>
      </div>
    );
  }

  return (
    <div className="blur-in">
      <p style={{ height: "80px" }}></p>
      <div style={{ padding: "40px" }}>
        <h1>{category.title}</h1>
        <p>{category.description}</p>

        {/* ส่วนแสดงรูปทั้งหมด */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {category.images?.map((img, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <img
                src={img}
                alt={`Screenshot ${index + 1}`}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          ))}
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
