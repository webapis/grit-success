
function filterNegatives(obj, searchTerms) {
    try {


        const sortedSearchTerms = searchTerms.sort((a, b) => b.length - a.length);
        const objProps = [obj['title'], obj['link'], obj['link'], obj['pageTitle'], obj['pageUrl'], obj['duplicateTitles'] && obj['duplicateTitles'].join(' '), obj['marka'], obj['subcat']]
        // Iterate through each property of the object
        for (let propValue of objProps) {

            // Check if the property value is a string
            if (propValue) {
         
                // Check if any search term is found in the property value
                for (let i = 0; i < sortedSearchTerms.length; i++) {


                    if (propValue.replaceAll('-', ' ').replaceAll('/', ' ').toLowerCase().includes(sortedSearchTerms[i].toLowerCase())) {


                        return sortedSearchTerms[i]; // Match found



                    }
                }
            }
        }
        return false; // No match found

    } catch (error) {
        debugger
    }
}

export default filterNegatives



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