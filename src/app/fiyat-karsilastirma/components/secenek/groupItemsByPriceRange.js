
export default function groupItemsByPriceRange(items, minGroupSize = 2) {
  // Define price ranges
  const ranges = [
    { min: 0, max: 1000, label: '0-1000' },
    { min: 1000, max: 1500, label: '1000-1500' },
    { min: 1500, max: Infinity, label: '1500+' }
  ];

  // Group items by range and then by truncated price
  
  const grouped = items.reduce((acc, item) => {
    const range = ranges.find(r => item.price >= r.min && item.price < r.max);
    if (!range) return acc;

    if (!acc[range.label]) {
      acc[range.label] = {};
    }

    const truncatedPrice = Math.floor(item.price);
    if (!acc[range.label][truncatedPrice]) {
      acc[range.label][truncatedPrice] = [];
    }

    acc[range.label][truncatedPrice].push(item);
    return acc;
  }, {});

  // Adjust groups if the number of items is less than minGroupSize
  for (const rangeKey in grouped) {
    let previousGroup = null;
    const sortedEntries = Object.entries(grouped[rangeKey]).sort(([a], [b]) => parseInt(a) - parseInt(b));
    
    grouped[rangeKey] = sortedEntries.reduce((adjustedAcc, [priceKey, items]) => {
      if (items.length < minGroupSize && previousGroup) {
        // Move items to the preceding group
        adjustedAcc[previousGroup] = adjustedAcc[previousGroup].concat(items);
      } else {
        // Keep the current group
        adjustedAcc[priceKey] = items;
        previousGroup = priceKey; // Update the previous group
      }
      return adjustedAcc;
    }, {});
  }

  return grouped;
}


//--------------------------------------------------------
// export default function groupItemsByPriceRange(items) {
//   // Define price ranges
//   const ranges = [
//     { min: 0, max: 1000, label: '0-1000' },
//     { min: 1000, max: 1500, label: '1000-1500' },
//     { min: 1500, max: Infinity, label: '1500+' }
//   ];

//   // Group items by range and then by truncated price
//   const grouped = items.reduce((acc, item) => {
//     const range = ranges.find(r => item.price >= r.min && item.price < r.max);
//     if (!range) return acc;

//     if (!acc[range.label]) {
//       acc[range.label] = {};
//     }

//     const truncatedPrice = Math.floor(item.price);
//     if (!acc[range.label][truncatedPrice]) {
//       acc[range.label][truncatedPrice] = [];
//     }

//     acc[range.label][truncatedPrice].push(item);
//     return acc;
//   }, {});

//   // Sort items within each price group
//   for (const rangeKey in grouped) {
//     grouped[rangeKey] = Object.fromEntries(
//       Object.entries(grouped[rangeKey]).sort(([a], [b]) => parseInt(a) - parseInt(b))
//     );
//   }

//   return grouped;
// }

// // Your array of items
