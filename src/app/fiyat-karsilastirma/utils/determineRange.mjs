export default function determineRange(value, ranges) {
    // Sort ranges in ascending order
    ranges.sort((a, b) => a - b);
  
    for (let i = 0; i < ranges.length; i++) {
      if (value <= ranges[i]) {
        return ranges[i];
      }
    }
  
    return "Out of range";
  }