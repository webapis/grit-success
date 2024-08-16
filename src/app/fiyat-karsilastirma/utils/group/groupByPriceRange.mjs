export default function groupByPriceRange(products, ranges) {
    // Sort ranges in ascending order
    ranges.sort((a, b) => a - b);
  
    const groupedProducts = {};
    for (const product of products) {
      const priceRange = product.priceRange;
      let rangeIndex = 0;
  
      while (rangeIndex < ranges.length - 1 && priceRange > ranges[rangeIndex + 1]) {
        rangeIndex++;
      }
  
      const rangeStart = rangeIndex === 0 ? 0 : ranges[rangeIndex];
      const rangeEnd = ranges[rangeIndex + 1] || Infinity;
      const rangeKey = `${rangeStart}-${rangeEnd}`;
  
      if (!groupedProducts[rangeKey]) {
        groupedProducts[rangeKey] = [];
      }
  
      groupedProducts[rangeKey].push(product);
    }
  
    return groupedProducts;
  }
  