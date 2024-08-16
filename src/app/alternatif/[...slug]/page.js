import React from 'react';
import WeddingDressList from '../components/WeddingDressList';

const App = () => {
  const dressesData = [
    {
      brand: "galaway",
      price: 6111.111111111111,
      img: "./alternatif/gelinlik/abiyefon.jpg",
      urls: {
        title: "Emily Gelinlik",
        price: 2400,
        pageTitle: "Gelin Elbiseleri",
        pageURL: "https://www.galaway.co/23-gelin-elbiseleri",
        priceAsString: "₺2.400,00",
        category: "gelinlik",
        brand: "galaway"
      },
      prices: [
        2400,
        3000,
        3600,
        4500,
        28000
      ]
    },
    // Add more dress objects here
  ];

  return (
    <div className="App">
      <WeddingDressList dresses={dressesData} />
    </div>
  );
};

export default App;