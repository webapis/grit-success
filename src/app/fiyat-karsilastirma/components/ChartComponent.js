'use client'
import { BarChart } from '@mui/x-charts/BarChart';
export default function ChartComponent({ dataset }) {
    const grouped = Object.entries(groupByBrandAndPrice(dataset))
    const mappedData = grouped.map((m) => {
        const brand = m[0]

        const prices =Object.keys(m[1]).map(m=> parseFloat(m))
       const weights =Object.values(m[1]).map((m)=>m.length)
        const price =calculateWeightedAveragePrice(prices,weights)
        debugger
        return { brand, price }
    }).sort((a,b)=>a.price-b.price)
    debugger

    const chartSetting = {
        xAxis: [
            {
                label: 'Türk lirası',
            },
        ],
        width: 700,
        height: 500,
    };
    const valueFormatter = (value) => `${value} TL`;
    return <div>  <BarChart 
        dataset={mappedData}
        yAxis={[{ scaleType: 'band', dataKey: 'brand' }]}
        series={[{ dataKey: 'price', label: 'Ortalama Elbise Fiyatları', valueFormatter }]}
        layout="horizontal"
        {...chartSetting}
    /></div>
}


function groupByBrandAndPrice(products) {
    return products.reduce((brandGroups, product) => {
        const { brand, price } = product;

        // If the brand doesn't exist in our groups, create it
        if (!brandGroups[brand]) {
            brandGroups[brand] = {};
        }

        // Convert price to string to use as object key
        const priceKey = price.toString();

        // If the price doesn't exist for this brand, create an array for it
        if (!brandGroups[brand][priceKey]) {
            brandGroups[brand][priceKey] = [];
        }

        // Add the product to the appropriate brand and price group
        brandGroups[brand][priceKey].push(product);

        return brandGroups;
    }, {});
};
// Function to calculate the weighted average price
function calculateWeightedAveragePrice(prices, weights) {
    // Check if the inputs are valid arrays and not empty
    if (!Array.isArray(prices) || !Array.isArray(weights) || prices.length === 0 || weights.length === 0) {
        throw new Error("Inputs must be non-empty arrays of numbers.");
    }

    // Check if both arrays have the same length
    if (prices.length !== weights.length) {
        throw new Error("Prices and weights arrays must have the same length.");
    }

    // Calculate the sum of the products of prices and weights
    const sumProduct = prices.reduce((total, price, index) => total + (price * weights[index]), 0);

    // Calculate the sum of the weights
    const sumWeights = weights.reduce((total, weight) => total + weight, 0);

    // Calculate the weighted average price
    const weightedAveragePrice = sumProduct / sumWeights;

    return weightedAveragePrice;
}

// Example usage
const prices = [50, 55, 60, 70, 65];
const weights = [10, 20, 15, 5, 10]; // Corresponding weights for the prices

try {
    const weightedAverage = calculateWeightedAveragePrice(prices, weights);
    console.log(`Weighted Average Price: $${weightedAverage.toFixed(2)}`);
} catch (error) {
    console.error(error.message);
}


// function calculateAveragePrice(prices) {
//     // Check if the input is a valid array and not empty
//     if (!Array.isArray(prices) || prices.length === 0) {
//         throw new Error("Input must be a non-empty array of numbers.");
//     }

//     // Calculate the sum of prices
//     const sum = prices.reduce((total, price) => total + price, 0);

//     // Calculate the average price
//     const averagePrice = sum / prices.length;

//     return averagePrice;
// }
