import { Link } from "react-router-dom";
import { projectCategories } from "./data/projects";

function Work() {
  return (
     <div className="blur-in">
<p style={{height:"80px"}}></p>
    <div style={{ padding: "40px" }}>
      <h1>My Portfolio</h1>
      <p>เลือกหมวดผลงานที่ต้องการดู</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {projectCategories.map((category) => (
          <Link key={category.id} to={`/project/${category.id}`}>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <img
                src={category.thumbnail}
                alt={category.title}
                style={{ width: "100%" }}
              />
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
     </div>
  );
}
export default Work