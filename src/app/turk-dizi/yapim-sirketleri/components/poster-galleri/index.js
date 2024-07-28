import React from 'react';
import Poster from './Poster';
import { Grid } from '@mui/material';
import './index.css';

const App = () => {
  const posters = [
    {
      imageSrc: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg',
      title: 'Если сильно полюбишь',
      year: '2023',
      season: '1 сезон',
    },
    {
        imageSrc: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg',
        title: 'Если сильно полюбишь',
        year: '2023',
        season: '1 сезон',
      },
      {
        imageSrc: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg',
        title: 'Если сильно полюбишь',
        year: '2023',
        season: '1 сезон',
      },
      {
        imageSrc: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg',
        title: 'Если сильно полюбишь',
        year: '2023',
        season: '1 сезон',
      },  {
        imageSrc: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg',
        title: 'Если сильно полюбишь',
        year: '2023',
        season: '1 сезон',
      },  {
        imageSrc: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg',
        title: 'Если сильно полюбишь',
        year: '2023',
        season: '1 сезон',
      },
    // Add more posters as needed
  ];

  return (
    <div className="poster-gallery">
      {posters.map((poster, index) => (
        <Poster 
          key={index} 
          imageSrc={poster.imageSrc} 
          title={poster.title} 
          year={poster.year} 
          season={poster.season} 
        />
      ))}
    </div>
  );
};

export default App;
