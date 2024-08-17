import groupByBrandAndPrice from "./groupByBrandAndPrice.mjs";
import calculateWeightedAveragePrice from "./calculateWeightedAveragePrice.mjs";


export default function calculateAveragePrices(data) {
  
  const grouped = Object.entries(groupByBrandAndPrice(data))

  const mappedData = grouped.map((m) => {
    const brand = m[0]

    const prices = Object.keys(m[1]).map(m => parseFloat(m))
    const weights = Object.values(m[1]).map((m) => m.length)
    const price = calculateWeightedAveragePrice(prices, weights)

    const urls = Object.values(m[1]).flat()[0]

   
    return { brand, price, urls, weights, prices }
  }).sort((a, b) => a.price - b.price)


  return mappedData

}





/*
import groupByBrandAndPrice from "./groupByBrandAndPrice.mjs";
import calculateWeightedAveragePrice from "./calculateWeightedAveragePrice.mjs";


export default function calculateAveragePrices(data) {
  
  const grouped = Object.entries(groupByBrandAndPrice(data))

  const mappedData = grouped.map((m) => {
    const brand = m[0]

    const prices = Object.keys(m[1]).map(m => parseFloat(m))
    const weights = Object.values(m[1]).map((m) => m.length)
    const price = calculateWeightedAveragePrice(prices, weights)
if(brand==='cengizakturk'){
  debugger
}
    const urls = Object.values(m[1]).map((m) => {

      let pageURLs = m[1]
      if(brand==='cengizakturk'){
        debugger
      }
      return pageURLs
    }).filter(f => f?.pageURL)[0]
    if(brand==='cengizakturk'){
      debugger
    }
    return { brand, price, urls, weights, prices }
  }).sort((a, b) => a.price - b.price)


  return mappedData

}
*/
