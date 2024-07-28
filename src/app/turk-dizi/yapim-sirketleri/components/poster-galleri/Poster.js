import React from 'react';
import './Poster.css';

const Poster = ({ imageSrc, title, year, season }) => {
  return (
    <div className="poster-container">
      <img src={imageSrc} alt={title} className="poster-image" />
      <div className="poster-info">
        <h3>{title}</h3>
        <p>{year} • {season}</p>
        <button className="trailer-button">Трейлер</button>
      </div>
      <div className="more-info-indicator">
        <span>More Info</span>
      </div>
    </div>
  );
};

export default Poster;
