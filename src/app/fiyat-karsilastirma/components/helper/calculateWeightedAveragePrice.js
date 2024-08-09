export default function calculateWeightedAveragePrice(prices, weights) {
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