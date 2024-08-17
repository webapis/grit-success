 const formatPriceAsTurkishLira = (price) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
  };

  export default formatPriceAsTurkishLira