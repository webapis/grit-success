'use client'
import { BarChart } from '@mui/x-charts/BarChart';
export default function ChartComponent({ dataset }) {
    const grouped = Object.entries(groupByBrandAndPrice(dataset))
    const mappedData = grouped.map((m) => {
        const brand = m[0]
        const price =calculateAveragePrice(Object.keys(m[1]).map(m=> parseFloat(m)) )
       // const weights =Object.values(m[1]).length

        debugger
        return { brand, price }
    })
    debugger

    const chartSetting = {
        xAxis: [
            {
                label: 'Türk lirası',
            },
        ],
        width: 500,
        height: 400,
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


function calculateAveragePrice(prices) {
    // Check if the input is a valid array and not empty
    if (!Array.isArray(prices) || prices.length === 0) {
        throw new Error("Input must be a non-empty array of numbers.");
    }

    // Calculate the sum of prices
    const sum = prices.reduce((total, price) => total + price, 0);

    // Calculate the average price
    const averagePrice = sum / prices.length;

    return averagePrice;
}
