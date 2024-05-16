
function searchObject(obj, searchTerms) {

    const sortedSearchTerms =searchTerms.sort((a, b) => b.length - a.length);
debugger
    // Iterate through each property of the object
    for (let key in obj) {
  
        const stringTocheck = Array.isArray(obj[key])? obj[key].join(' '):obj[key]
        // Check if the property value is a string
     if(stringTocheck.length>0){
     // Check if any search term is found in the property value
     for (let i = 0; i < sortedSearchTerms.length; i++) {
        const substring= sortedSearchTerms[0].replaceAll('-',' ')
    
     debugger
        const regex = new RegExp(substring,'gi');
 
     debugger

        const match = stringTocheck.match(regex);
        debugger
        if (match && match[0].length===substring.length) {
         
            return true//sortedSearchTerms[i]; // Match found
           
        }
    }
     }
       
        
    }
    return false; // No match found
}

export default searchObject



/*
function searchObject(obj, searchTerms) {
    // Iterate through each property of the object
    for (let key in obj) {
        // Check if the property value is a string
        if (typeof obj[key] === 'string') {
            // Check if any search term is found in the property value
            for (let i = 0; i < searchTerms.length; i++) {
                if (obj[key].toLowerCase().includes(searchTerms[i].toLowerCase())) {
                    return searchTerms[i]; // Match found
                }
            }
        }
    }
    return false; // No match found
}

export default searchObject
*/