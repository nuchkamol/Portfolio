import React, { useState } from 'react';
const HoverImage = React.forwardRef(({ normalSrc, hoverSrc, alt, style, onClick, outerRef }, ref) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={outerRef} // 👈 สำคัญ
      style={{
        position: 'relative',
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={normalSrc}
        alt={alt}
        ref={ref}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transition: 'opacity 0.4s ease',
          opacity: hovered ? 0 : 1,
        }}
      />
      <img
        src={hoverSrc}
        alt={alt}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transition: 'opacity 0.4s ease',
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  );
});


export default HoverImage;
