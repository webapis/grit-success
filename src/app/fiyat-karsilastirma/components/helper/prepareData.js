import groupByBrandAndPrice from "./groupByBrandAndPrice.js";
import calculateWeightedAveragePrice from "./calculateWeightedAveragePrice.js";
import splitArrayIntoChunks from "./splitArrayIntoChunks.js";
export default function prepareData(dataset) {
    const grouped = Object.entries(groupByBrandAndPrice(dataset))
    const mappedData = grouped.map((m) => {
        const brand = m[0]

        const prices = Object.keys(m[1]).map(m => parseFloat(m))
        const weights = Object.values(m[1]).map((m) => m.length)
        const price = calculateWeightedAveragePrice(prices, weights)

        return { brand, price }
    }).sort((a, b) => a.price - b.price)
debugger
    return splitArrayByPriceRanges(mappedData, [1000,5000,10000])
}


const splitArrayByPriceRanges = (items, priceRanges) => {
    // Sort the price ranges in ascending order
    const sortedRanges = [...priceRanges].sort((a, b) => a - b);
  
    // Initialize the result object
    const result = {
      [`Under ${sortedRanges[0]}`]: []
    };
  
    // Create keys for each price range
    for (let i = 0; i < sortedRanges.length; i++) {
      if (i === sortedRanges.length - 1) {
        result[`${sortedRanges[i]} and above`] = [];
      } else {
        result[`${sortedRanges[i]} - ${sortedRanges[i+1]}`] = [];
      }
    }
  
    // Categorize each item into the appropriate price range
    items.forEach(item => {
      const price = item.price;
      let assigned = false;
  
      if (price < sortedRanges[0]) {
        result[`Under ${sortedRanges[0]}`].push(item);
        assigned = true;
      }
  
      for (let i = 0; i < sortedRanges.length; i++) {
        if (assigned) break;
  
        if (i === sortedRanges.length - 1) {
          if (price >= sortedRanges[i]) {
            result[`${sortedRanges[i]} and above`].push(item);
          }
        } else if (price >= sortedRanges[i] && price < sortedRanges[i+1]) {
          result[`${sortedRanges[i]} - ${sortedRanges[i+1]}`].push(item);
          assigned = true;
        }
      }
    });
  debugger
    return Object.values(result);
  };
  
