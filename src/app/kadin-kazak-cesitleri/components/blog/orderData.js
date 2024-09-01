function orderByMarka(arr) {
    // Group objects by their "brand" property
    const groupedByMarka = {};
    arr.forEach(obj => {
        const brand = obj.brand;
        if (!groupedByMarka[brand]) {
            groupedByMarka[brand] = [];
        }
        groupedByMarka[brand].push(obj);
    });

    // Sort the groups by their "brand" property
    const sortedGroups = Object.values(groupedByMarka).sort((a, b) => {
        return a[0].brand.localeCompare(b[0].brand);
    });

    // Interleave the sorted groups to ensure no two adjacent objects have the same "brand" value
    const sortedArray = [];
    let maxGroupLength = 0;
    sortedGroups.forEach(group => {
        maxGroupLength = Math.max(maxGroupLength, group.length);
    });
    for (let i = 0; i < maxGroupLength; i++) {
        sortedGroups.forEach(group => {
            if (i < group.length) {
                sortedArray.push(group[i]);
            }
        });
    }

    return sortedArray;
}

 export default   orderByMarka
