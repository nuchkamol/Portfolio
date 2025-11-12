function Unity() {
  return (
    // เพิ่ม styles เพื่อจัดกึ่งกลางเนื้อหาใน container นี้
    <div 
        id="game"
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // จัดกึ่งกลางในแนวตั้ง
            alignItems: 'center',     // จัดกึ่งกลางในแนวนอน
            minHeight: '100vh',       // ทำให้ container มีความสูงเท่ากับหน้าจอทั้งหมด
            width: '100vw'            // ทำให้ container มีความกว้างเท่ากับหน้าจอทั้งหมด
        }}
    >
      <div className ="row tm-about-row ">
        <div className ="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className ="tm-headergame-img"></div>
        </div>
      </div>
      <div className ="row tm-about-row tm-mb-medium">
        <div className ="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          
          <div className ="embed-responsive embed-responsive-21by9">
            {/* คุณอาจต้องปรับขนาด width/height ให้เหมาะสมกับหน้าจอด้วย */}
            <iframe src="https://itch.io/embed-upload/4433836?color=FFDFEA" allowfullscreen="" width="900" height="650" frameborder="0"><a href="https://nuchkamol.itch.io/kulanuch">Play Kulanuch on itch.io</a></iframe>
          </div>
        </div>
      </div>
    </div> 
  );
}
export default Unity