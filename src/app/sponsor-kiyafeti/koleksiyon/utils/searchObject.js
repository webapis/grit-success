
function searchObject(obj, searchTerms) {
    let result = []
    const sortedSearchTerms = searchTerms.sort((a, b) => b.length - a.length);
    debugger
    // Iterate through each property of the object
    for (let key in obj) {

        const stringTocheck = Array.isArray(obj[key]) ? obj[key].join(' ') : obj[key]
        // Check if the property value is a string
        if (stringTocheck.length > 0) {
            // Check if any search term is found in the property value
            for (let sTerm of sortedSearchTerms) {
                const substring = sTerm.replaceAll('-', ' ')

               
                debugger
                const regex = new RegExp(substring, 'gi');

                debugger


                const match = stringTocheck.match(regex);
                debugger

                if (match) {
                    if(substring==='yaz'){
                    
                      
                            console.log('match[0].toLowerCase()',stringTocheck.find(f=>f.includes(substring)))
                       
                    }
            
                    if (match[0].toLowerCase() === substring.toLowerCase()) {
                        result.push(substring)
                    } else {
                        const foundString = stringTocheck.split(' ').find(f => f === match[0])
                        if (foundString && foundString === match[0]) {
                            result.push(substring)
                        }
                    }




                }
            }
        }


    }
    return result
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