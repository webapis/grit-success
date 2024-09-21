function groupByServiceName(data, minCount = 5) {
    // Create an object to store the grouped data
    const groupedData = {};
  
    // Helper function to convert string to URL-friendly format
    const toUrlFriendly = (str) => {
      return str
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        //.replaceAll(' ', '-')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };
  
    // Helper function to validate URL
    const isValidUrl = (string) => {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    };
  
    // Group the data
    data.forEach(item => {
      // Skip items without a valid website
      if (!item.Website || !isValidUrl(item.Website)) {
        return;
      }
  
      const serviceName = item.ServiceName || 'Unknown';
      const keyword = toUrlFriendly(serviceName);
  
      if (!groupedData[keyword]) {
        groupedData[keyword] = {
          keywordTitle: serviceName,
          keyword: keyword,
          totalCount: 0
        };
      }
  
      groupedData[keyword].totalCount++;
    });
  
    // Filter groups based on minCount and convert to array
    return Object.values(groupedData)
      .filter(group => group.totalCount >= minCount)
      .sort((a, b) => b.totalCount - a.totalCount); // Sort by totalCount in descending order
  }
  
  // Example usage:
  // const groupedResult = groupByServiceName(inputData, 3);
  // console.log(groupedResult);
  
  // Example usage:
  // const groupedResult = groupByServiceName(inputData, 3);
  // console.log(groupedResult);

  module.exports={groupByServiceName}