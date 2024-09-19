function removeDuplicatesAndCollectTitles(array, key) {
    const uniqueObjects = [];
    const duplicateTitles = {};
  
    array.forEach((item) => {
      const index = uniqueObjects.findIndex((obj) => obj[key] === item[key]);
  
      if (index === -1) {
        uniqueObjects.push(item);
      } else {
        if (!duplicateTitles[item[key]]) {
          duplicateTitles[item[key]] = [uniqueObjects[index].TVSeriesTitle];
        }
  
        duplicateTitles[item[key]].push(item.TVSeriesTitle);
      }
    });
  
    return uniqueObjects.map((item) => {
      const titles = duplicateTitles[item[key]];
      return titles ? { ...item, duplicateTitles: titles } : item;
    });
  }

  module.exports={removeDuplicatesAndCollectTitles}