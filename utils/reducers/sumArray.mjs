export default function sumArray(weights) {
    return weights.reduce((sum, weight) => sum + weight, 0);
  }