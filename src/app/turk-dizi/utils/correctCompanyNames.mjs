export const titleCorrection = [{ "wrong": "Tims Productions", 
        "write": "Tims&B Productions" },
        {"wrong":"Mint Prodüksiyon","write":"MinT Motion Pictures"}
        ,{"wrong":"MinT Produksiyon","write":"MinT Motion Pictures"}
        ,{"wrong":"MinT Yapım","write":"MinT Motion Pictures"}
        ,{"wrong":"Mint","write":"MinT Motion Pictures"}
        ,{"wrong":"Mint","write":"MinT Motion Pictures"}
        ,{"wrong":"Mint","write":"MinT Motion Pictures"}
        ,{"wrong":"Mint","write":"MinT Motion Pictures"}
        ,{"wrong":"MEDYAPIM","write":"Medyapım"}
];

        
export default function correctCompanyNames(companyNames, titleCorrection) {

        return companyNames.map(m => {
            if(m.YAPIM_SIRKETI){
    // Remove brackets and the content within them from the YAPIM_SIRKETI value
    let cleanedName = m.YAPIM_SIRKETI.replace(/\s*\([^)]*\)/g, '').trim();

    // Find a correction entry where the "wrong" property matches the cleaned name
    const correction = titleCorrection.find(tc => tc.wrong === cleanedName);

    // If a correction is found, update the YAPIM_SIRKETI with the "write" property value
    // Otherwise, keep the cleaned name or original value if no changes are needed
 const result = correction ? { ...m, YAPIM_SIRKETI:  correction.write } : { ...m, YAPIM_SIRKETI: cleanedName };
   
 return result

            }else{
return m

            }
        
        });   
   

}

// export const titleCorrection = [{ "wrong": "Tims Productions", "write": "Tims&B Productions" }];
// export default function correctCompanyNames(companyNames, titleCorrection) {
//     // Iterate over the companyNames array
//     return companyNames.map(m => {
        

//         // Find a correction entry where the "wrong" property matches the current name
//         const correction = titleCorrection.find(tc => tc.wrong === m.YAPIM_SIRKETI);

//         // If a correction is found, use the "write" property value; otherwise, use the original name
//         return correction ? { ...m, YAPIM_SIRKETI: correction.write } : m;
//     });
// }


