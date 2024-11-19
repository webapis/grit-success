
import { walkSync } from './walkSync.mjs'
import path from 'path'
import 'dotenv/config'

import mergedCategories from './mergedCategories.mjs'
//import categorizedProducts from './categorizeData.mjs'
debugger
import fs from "fs"
const flattenedCategories = mergedCategories.map(m => m.keywords.map(m => m.split('=')[0])).flat()
debugger
const files = []
walkSync(path.join(process.cwd(), `/unzipped-data`), async (filepath) => {
    files.push(filepath)
})
const data = []
for (let file of files) {

    const rowData = fs.readFileSync(file)
    const objData = JSON.parse(rowData)
    data.push(...objData)


}


function getUniqueTitles(data) {
    const titles = data.map(item => item.duplicateTitles).flat(); // Flatten the duplicateTitles arrays into a single array
    return [...new Set(titles)]; // Use Set to get unique values and spread operator to convert Set back to array
}

function getUniqueTitlesGroupedByKeywords(data, keywords) {
    // Flatten the duplicateTitles arrays into a single array
    const titles = data.filter(f => f).flat();

    // Use Set to get unique titles, convert back to array
    const uniqueTitles = Array.from(new Set(titles.map(title => title.toLowerCase())));

    // Initialize grouped titles with an 'others' key
    const groupedTitles = { others: [] };

    uniqueTitles.forEach(title => {
        // Find matching keywords (can include multiple)
        const matchingKeywords = keywords.filter(keyword => title.includes(keyword.toLowerCase()));

        // Loop through matched keywords and add to groups
        matchingKeywords.forEach(keyword => {
            if (!groupedTitles[keyword]) {
                groupedTitles[keyword] = [];
            }
            groupedTitles[keyword].push(title);
        });

        // If no keywords matched, add to 'others'
        if (!matchingKeywords.length) {
            groupedTitles.others.push(title);
        }
    });

    return groupedTitles;
}

// function getUniqueTitlesGroupedByKeywords(data, keywords) {
//     debugger
//     const titles = data.filter(f=>f)// // Flatten the duplicateTitles arrays into a single array
//     const uniqueTitles = [...new Set(titles)]; // Use Set to get unique values and spread operator to convert Set back to array
// debugger
//     const groupedTitles = { others: [] };
//     uniqueTitles.forEach(title => {
//         const matchedKeyword = keywords.find(keyword => title.toLowerCase().includes(keyword.toLowerCase()));
//         if (matchedKeyword) {

//             if (!groupedTitles[matchedKeyword]) {
//                 groupedTitles[matchedKeyword] = [];
//             }
//             groupedTitles[matchedKeyword].push(title);
//         } else {
//             groupedTitles.others.push(title);
//         }
//     });
// debugger
//     return groupedTitles;
// }


const uniqueData = getUniqueTitles(data)
debugger
const groupedUniqueData = getUniqueTitlesGroupedByKeywords(uniqueData, [
    ...flattenedCategories,
    "ayakkabi",
    "terli̇k",
    "gi̇yi̇m",
    "diş gi̇yi̇m",
    "takim",
    "alt gi̇yi̇m",
    "tri̇ko",
    "jean",
    "tshi̇rt",
    "aksesuar",
    "taki",
    'spring / summer 24',
    'kasa',
    'havuz',
    'sezon',
    "new season",
    'outlet',
    'exclusive',
    'pijama',
    'jartiyer',
    'kaban',
    'sweatshirt',
    'kazak',
    'ceket',
    'hırka',
    'yeni sezon',
    'plaj',
    'kampanya',
    'yaz',
    'modeller',
    'pantolon',
    'anne',
    'gece',
    'nişan',
    'elbise',
    'koleksiyon',
    'i̇ndirim',
    "erkek",
    "kadın",
    "kep",
    "çocuk",
    "erkek çocuk",
    "kız çocuk",
    "yeni ürünler",
    "crush",
    "view all",
    "all products",
    "night out",
    "new",
    "büyük beden",
    "aw'23-24",
    "fw'22-23",
    "en yeniler",
    "tüm ürünler",
    "spring-summer",
    "fall-winter",
    "office wear",
    "çok satanlar",
    "outerwear",
    "best sellers",
    "office"
])
debugger

fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/kadin/01-pageTitles.json`, JSON.stringify(groupedUniqueData), { encoding: 'utf8' })


