export default function extractUniqueSortedBrands(data) {
    const uniqueBrands = new Set();
  
    data.forEach(item => {
      uniqueBrands.add(item.brand);
    });
  
    return Array.from(uniqueBrands).sort();
  }
  