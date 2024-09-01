// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <a href={product.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
        <img src={product.img} alt={product.title} style={styles.image} />
        <h2 style={styles.title}>{product.title}</h2>
      </a>
      <p style={styles.price}>{product.priceFormatted}</p>
      <p style={styles.brand}>{product.brand}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '90vw',
    textAlign: 'center',
    margin: '0 auto',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  title: {
    fontSize: '4vw',  // Adjusts according to the viewport width
    margin: '16px 0',
  },
  price: {
    fontSize: '5vw',  // Adjusts according to the viewport width
    color: 'green',
    margin: '8px 0',
  },
  brand: {
    fontSize: '3vw',  // Adjusts according to the viewport width
    color: 'gray',
  },
  '@media (min-width: 768px)': {
    title: {
      fontSize: '2rem',  // Switch to rem on larger screens
    },
    price: {
      fontSize: '2.5rem',  // Switch to rem on larger screens
    },
    brand: {
      fontSize: '1.5rem',  // Switch to rem on larger screens
    },
  },
};

export default ProductCard;
