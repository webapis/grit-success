function getLowerBound(range) {
    if (range === "50000-Infinity") return 50000;
    const [lower] = range.split("-").map(Number);
    return lower;
  }
  
  // Sort the array of objects
export default  function sortByPriceRange(data) {
    return data.sort((a, b) => {
      const lowerA = getLowerBound(a.name);
      const lowerB = getLowerBound(b.name);
      return lowerA - lowerB;
    });
  }