import { useState } from 'react';

const HoverImage = ({ normalSrc, hoverSrc, style = {}, alt = '' }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={normalSrc}
        alt={alt}
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
};

export default HoverImage;
