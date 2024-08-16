import React from 'react';
import './style.css'
const WeddingDressList = ({ dresses }) => {
  return (
    <div className="wedding-dress-list">
      <h1>Wedding Dress Brands</h1>
      <ul>
        {dresses.map((dress, index) => (
          <li key={index} className="dress-item">
            <h2>{dress.urls.title}</h2>
            <p>Brand: {dress.brand}</p>
            <p>Price: {dress.urls.priceAsString}</p>
            <p>Category: {dress.urls.category}</p>
            <a href={dress.urls.pageURL} target="_blank" rel="noopener noreferrer">
              View Details
            </a>
            <h3>Available Prices:</h3>
            <ul>
              {dress.prices.map((price, priceIndex) => (
                <li key={priceIndex}>{price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeddingDressList;