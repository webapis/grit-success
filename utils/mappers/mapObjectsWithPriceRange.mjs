export default function mapObjectsWithPriceRange(products, ranges) {
    // Sort ranges in ascending order
    ranges.sort((a, b) => a - b);
  
    return products.map(product => {
      const price = product.price;
      let rangeIndex = 0;
  
      while (rangeIndex < ranges.length - 1 && price > ranges[rangeIndex + 1]) {
        rangeIndex++;
      }
  
      const rangeStart = rangeIndex === 0 ? 0 : ranges[rangeIndex];
      const rangeEnd = ranges[rangeIndex + 1] || Infinity;
      const priceRange = `${rangeStart}-${rangeEnd}`;
  
      return {
        ...product,
        priceRange
      };
    });
  }
  