// src/components/Poster.js
import React from 'react';
import './Poster.css';

const Poster = ({ posterSrc, title }) => {
  return (
    <div className="poster">
      <img src={posterSrc} alt={title} className="poster-image" />
      <div className="poster-title">{title}</div>
    </div>
  );
};

export default Poster;
