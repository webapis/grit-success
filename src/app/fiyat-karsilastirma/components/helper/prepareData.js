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

    return splitArrayIntoChunks(mappedData, 7)
}