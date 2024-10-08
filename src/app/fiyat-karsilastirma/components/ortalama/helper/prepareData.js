import groupByBrandAndPrice from "./groupByBrandAndPrice.js";
import calculateWeightedAveragePrice from "./calculateWeightedAveragePrice.js";
import formatPriceAsTurkishLira from "./formatPriceAsTurkishLira.js";

import groupItemsByPriceRange from "../../secenek/groupItemsByPriceRange.js";
export default function prepareData(dataset) {
    const grouped = Object.entries(groupByBrandAndPrice(dataset))

    const groupByRange =groupItemsByPriceRange(dataset, 10)
 
    const mappedData = grouped.map((m) => {
        const brand = m[0]

        const prices = Object.keys(m[1]).map(m => parseFloat(m))
        const weights = Object.values(m[1]).map((m) => m.length)
        const price = calculateWeightedAveragePrice(prices, weights)

        const urls =Object.values(m[1]).map((m) => {
       
           let pageURLs=  m[1]

            return pageURLs
        }).filter(f=>f?.pageURL)[0]

        return { brand, price,urls,weights,prices }
    }).sort((a, b) => a.price - b.price)
    const splitArray=splitArrayByPriceRanges(mappedData, [1000,2000,3000,5000,10000])

    return splitArray
    
}


const splitArrayByPriceRanges = (items, priceRanges) => {
    // Sort the price ranges in ascending order
    const sortedRanges = [...priceRanges].sort((a, b) => a - b);
  
    // Initialize the result object
    const result = {
      [`${formatPriceAsTurkishLira(sortedRanges[0])} altında`]: []
    };
  
    // Create keys for each price range
    for (let i = 0; i < sortedRanges.length; i++) {
      if (i === sortedRanges.length - 1) {
        result[`${formatPriceAsTurkishLira( sortedRanges[i])} ve üstü`] = [];
      } else {
        result[`${formatPriceAsTurkishLira(sortedRanges[i])} - ${formatPriceAsTurkishLira( sortedRanges[i+1])}`] = [];
      }
    }
  
    // Categorize each item into the appropriate price range
    items.forEach(item => {
      const price = item.price;
      let assigned = false;
  
      if (price < sortedRanges[0]) {
        result[`${formatPriceAsTurkishLira(sortedRanges[0])} altında`].push(item);
        assigned = true;
      }
  
      for (let i = 0; i < sortedRanges.length; i++) {
        if (assigned) break;
  
        if (i === sortedRanges.length - 1) {
          if (price >= sortedRanges[i]) {
            result[`${formatPriceAsTurkishLira( sortedRanges[i])} ve üstü`].push(item);
          }
        } else if (price >= sortedRanges[i] && price < sortedRanges[i+1]) {
          result[`${formatPriceAsTurkishLira(sortedRanges[i])} - ${formatPriceAsTurkishLira(sortedRanges[i+1])}`].push(item);
          assigned = true;
        }
      }
    });
  

  const mappedResult =Object.entries(result).map((m)=>{
    
    return {groupTitle:m[0],data:m[1]}
   
  });
debugger
    return mappedResult
  };
  
