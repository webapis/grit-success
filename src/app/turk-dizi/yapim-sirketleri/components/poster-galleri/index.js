// src/components/PostersContainer.js
import React, { useState } from 'react';
import Poster from './Poster';
import './index.css';

const posters = [
  // Sample data; replace with actual data
  { src: 'poster1.jpg', title: 'Series 1' },
  { src: 'poster2.jpg', title: 'Series 2' },
  { src: 'poster3.jpg', title: 'Series 3' },
  // Add more posters as needed
];

const PostersContainer = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="posters-container">
      {posters.map((poster, index) => (
        <div
          key={index}
          className={`poster-wrapper ${hoveredIndex === index ? 'hovered' : ''} ${
            hoveredIndex !== null && hoveredIndex !== index ? 'dimmed' : ''
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Poster posterSrc={poster.src} title={poster.title} />
        </div>
      ))}
    </div>
  );
};

export default PostersContainer;
