export default function filterByKeywords(mainArray, keywordsArray) {
    return mainArray.filter(obj => {
      // Convert keywords to lowercase for case-insensitive matching
      const lowercaseKeywords = keywordsArray.map(keyword => keyword.toLowerCase());
  
      // Check if any of the keywords intersect with the object's keywords
      return lowercaseKeywords.some(keyword => obj.keywords.split(",").some(objKeyword => objKeyword.toLowerCase().includes(keyword)));
    });
  }

  