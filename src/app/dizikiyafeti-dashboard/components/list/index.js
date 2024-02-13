'use client'
// App.js
import React, { useState } from 'react';
import ActorTable from './ActorTable';

const App = () => {
  const [actors, setActors] = useState([
    {
      id: 1,
      name: 'Tom Hanks',
      imageUrl: 'https://example.com/tom-hanks.jpg',
      season: 'Summer',
      year: 1994,
      productLink: 'https://example.com/tom-hanks-movies',
      character: 'Forrest Gump',
      productTitle: 'Forrest Gump',
      alt: 'Tom Hanks as Forrest Gump',
      date: '1994-07-06',
      episode: 1,
      TVseries: 'Movies and TV Shows',
      ProductCategory: 'Drama',
    },
    {
      id: 2,
      name: 'Brad Pitt',
      imageUrl: 'https://example.com/brad-pitt.jpg',
      season: 'Spring',
      year: 1999,
      productLink: 'https://example.com/brad-pitt-movies',
      character: 'Tyler Durden',
      productTitle: 'Fight Club',
      alt: 'Brad Pitt as Tyler Durden',
      date: '1999-11-06',
      episode: 3,
      TVseries: 'Movies',
      ProductCategory: 'Action',
    },
    {
      id: 3,
      name: 'Meryl Streep',
      imageUrl: 'https://example.com/meryl-streep.jpg',
      season: 'Winter',
      year: 2011,
      productLink: 'https://example.com/meryl-streep-movies',
      character: 'Margaret Thatcher',
      productTitle: 'The Iron Lady',
      alt: 'Meryl Streep as Margaret Thatcher',
      date: '2011-12-30',
      episode: 2,
      TVseries: 'Movies and TV Shows',
      ProductCategory: 'Biography',
    },
    {
      id: 4,
      name: 'Leonardo DiCaprio',
      imageUrl: 'https://example.com/leo-dicaprio.jpg',
      season: 'Autumn',
      year: 2010,
      productLink: 'https://example.com/leo-dicaprio-movies',
      character: 'Cobb',
      productTitle: 'Inception',
      alt: 'Leonardo DiCaprio as Cobb',
      date: '2010-07-16',
      episode: 4,
      TVseries: 'Movies',
      ProductCategory: 'Sci-Fi',
    },
  ]);

  const possibleActorNames = actors.map((actor) => actor.name);

  const handleActorEdit = (editedActor) => {
    setActors((prevActors) =>
      prevActors.map((actor) => (actor.id === editedActor.id ? { ...actor, ...editedActor } : actor))
    );
  };

  return (
    <div>
      <h1>Actor Table</h1>
      <ActorTable actors={actors} onActorEdit={handleActorEdit} possibleActorNames={possibleActorNames} />
    </div>
  );
};

export default App;