import cv from "../docs/CV 2025.pdf";

function Resume() {
  return (
    // ลบ styles จัดกึ่งกลางหน้าจอ 100vh/100vw ออก
    // และปรับ className เป็น container ธรรมดา หรือ container-fluid (ถ้ามี)
    <div 
        id="game"
        style={{
            // ลบ minHeight: '100vh', width: '100vw' ออก
            padding: '20px' // เพิ่ม padding เล็กน้อยเพื่อความสวยงาม
        }}
    >
      {/* ลบ row แรกออก เพราะไม่จำเป็น */}
      
      {/* ปรับ row นี้ให้ใช้พื้นที่เต็มที่ */}
      <div className ="row tm-about-row tm-mb-medium">
        <div className ="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          
          {/* ลบ embed-responsive ออก ถ้าไม่ได้ใช้ CSS ของ Bootstrap สำหรับมัน */}
          <div className ="embed-responsive embed-responsive-21by9">
             <div className ="resume-section-content">
                <h2 className ="mb-5">resume</h2>
              
                {/* ปรับ style ของ embed */}
                <embed
                    src={cv}
                    type="application/pdf"
                    frameBorder="0"
                    scrolling="auto"
                    // กำหนดความกว้างเป็น 100% เพื่อให้เต็มพื้นที่ของ parent div
                    width="100%" 
                    // กำหนดความสูงตามที่คุณต้องการ แต่ควรปรับให้เหมาะสมกับเนื้อหา
                    height="1000px" 
                    // เพิ่ม maxWidth เพื่อไม่ให้ PDF กว้างเกินไปบนจอใหญ่ๆ
                    style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}
                ></embed>
             </div>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default Resume