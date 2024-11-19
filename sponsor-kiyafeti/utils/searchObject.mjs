
function filterNegatives(obj, searchTerms) {
try {
    

    const sortedSearchTerms =searchTerms.sort((a, b) => b.length - a.length);
const objProps =  [obj['title'],obj['link'],obj['link'],obj['pageTitle'],obj['pageUrl'],obj['duplicateTitles']&&obj['duplicateTitles'].join(' '),obj['marka'],obj['subcat']]
    // Iterate through each property of the object
    for (let propValue of objProps) {
  

        // Check if the property value is a string
        if (propValue) {
            // Check if any search term is found in the property value
            for (let i = 0; i < sortedSearchTerms.length; i++) {
               
                if(propValue==='title'){
                    
                    if (propValue.toLowerCase().includes(sortedSearchTerms[i].toLowerCase())) {
                 
                        return sortedSearchTerms[i]; // Match found
                    }  
                }
           
                if (propValue.replaceAll('-',' ').replaceAll('/',' ').toLowerCase().includes(sortedSearchTerms[i].toLowerCase())) {
           
                 
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

// function searchObject(obj, searchTerms) {
//     let result = []
//     const sortedSearchTerms = searchTerms.sort((a, b) => b.length - a.length);

//     // Iterate through each property of the object
//     for (let key in obj) {

//         const stringTocheck = Array.isArray(obj[key]) ? obj[key].join(' ') : obj[key]
//         // Check if the property value is a string
//         if (stringTocheck.length > 0) {
//             // Check if any search term is found in the property value
//             for (let sTerm of sortedSearchTerms) {
//                 const substring = sTerm.replaceAll('-', ' ')

               
              
//                 const regex = new RegExp(`\\b(\\S*${substring}\\S*)\\b`, 'i');

             


//                 const match = stringTocheck.replaceAll('-',' ').replaceAll('/',' ').match(regex);
              

//                 if (match) {
//              //   console.log('match[1]',match[1], substring)
//                     if(match[0].toLowerCase()==='beyaz'){
                   
//                     }
//                     if (match[0].toLowerCase() === substring.toLowerCase() &&match[0].length===substring.length ) 
//                       {
//                         result.push(substring)
//                       }
                      
//                      else {
//                         const foundString = stringTocheck.split(' ').find(f => f === match[0])
//                         if (foundString && foundString === match[0]  && match[0].length===foundString.length) {
//                           //  result.push(substring)
//                         }
//                     }




//                 }
//             }
//         }


//     }
//     return result
// }

// export default searchObject



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