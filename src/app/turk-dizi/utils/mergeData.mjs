

import fs from 'fs'
import { createRequire } from "module";
import walkSync from './walkSync.mjs'

const require = createRequire(import.meta.url);
const yapimSirketi = require('../meta/yapim-sirket.json')
// import deaccent from './deaccent.mjs'
import groupBy from './groupBy.mjs'
const filePaths = []
const data = []
debugger
walkSync(`${process.cwd()}/turk-dizi-data`, (filePath) => {
    filePaths.push(filePath)
    const currentFileData = JSON.parse(fs.readFileSync(filePath))

    data.push(...currentFileData)

})

debugger
import fields from './consts.mjs'




debugger
const aggregatedData = []
debugger

debugger
const exceptions = [['Ali̇ye', 'Atiye']]
debugger
for (let current of data) {

    const TVSERIES_TITLE = current.TVSERIES_TITLE
    if (TVSERIES_TITLE !== undefined) {
        let currentAggData = aggregatedData.filter(f => f).filter(f => f.TVSERIES_TITLE !== undefined && f.TVSERIES_TITLE.length > 0).find((f) => f.TVSERIES_TITLE === TVSERIES_TITLE || areStringsSimilar(normalizeTurkish(f.TVSERIES_TITLE).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(), normalizeTurkish(TVSERIES_TITLE).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(), exceptions))
        if (currentAggData) {


            for (let propName in fields) {
                const prop = current[propName]
                if (prop && prop.length > 0) {
                    currentAggData[propName] = [...currentAggData[propName], prop]
                }

            }
        } else {

            currentAggData = { ...fields }
            for (let propName in fields) {
                const prop = current[propName]
                if (prop) {
                    if (Array.isArray(prop)) {
                        currentAggData[propName] = [...currentAggData[propName], ...prop]
                    } else {
                        currentAggData[propName] = [...currentAggData[propName], prop]
                    }

                }

            }
            aggregatedData.push({ TVSERIES_TITLE, ...currentAggData })

        }
    }
}
debugger
const removedDublicate = aggregatedData.filter(f => f.YAPIM_SIRKETI.length > 0 && f.YAPIM_SIRKETI[0].length > 0).map((obj) => {
    try {
        let nextObj = obj["YAPIM_SIRKETI"].flat()

        let ys = nextObj.length > 0 ? nextObj[0] : nextObj


        return { ...obj, YAPIM_SIRKETI: ys }
    } catch (error) {
        debugger
    }


})

debugger
const byYAPIM_SIRKETI = Object.entries(groupBy(removedDublicate, 'YAPIM_SIRKETI')).sort((a, b) => b[1].length - a[1].length)

const mapYSData = byYAPIM_SIRKETI.map(m => {
debugger
    const title = m[0]
    debugger
    const match= yapimSirketi.find(f=>f.title.includes(title))
    debugger
   // const webpresenceId = extractDomainOrId(match.website[0])
    debugger
    const logo = `/dizi/turk-dizi/yapim-sirketi`
    debugger
    return {
        title,
        logo,
        ...m[1]
    }
})

debugger
fs.writeFileSync(`turk-dizi-data/yapim-sirketleri.json`, JSON.stringify(byYAPIM_SIRKETI))
debugger






function levenshteinDistance(a, b) {
    const matrix = [];

    // Initialize the matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = [j];
    }

    // Fill the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1, // insertion
                    matrix[i - 1][j] + 1 // deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function areStringsSimilar(str1, str2, maxDistance = 1, maxLengthDifference = 4, exceptions = []) {
    // Check if the pair of strings is in the exceptions list
    if (exceptions.some(pair =>
        (pair[0].toLowerCase() === str1.toLowerCase() && pair[1].toLowerCase() === str2.toLowerCase()) ||
        (pair[1].toLowerCase() === str1.toLowerCase() && pair[0].toLowerCase() === str2.toLowerCase())
    )) {
        return false;
    }

    // Check if the length difference is within the allowed range
    if (Math.abs(str1.length - str2.length) > maxLengthDifference) {
        return false;
    }

    const distance = levenshteinDistance(str1, str2);
    return distance <= maxDistance;
}

function normalizeTurkish(text) {
    try {
        return text
            .replace(/ç/g, 'c').replace(/Ç/g, 'C')
            .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
            .replace(/ı/g, 'i').replace(/I/g, 'I')
            .replace(/ö/g, 'o').replace(/Ö/g, 'O')
            .replace(/ş/g, 's').replace(/Ş/g, 'S')
            .replace(/ü/g, 'u').replace(/Ü/g, 'U');
    } catch (error) {
        return text
    }

}

function extractDomainOrId(url) {
    // Handle social media URLs with more flexibility
    const socialMediaRegex = /^(?:https?:\/\/)?(?:www\.)?((?:[^\/]+\.)+[^\/]+)\/([^\/]+)/i;
    const match = url.match(socialMediaRegex);
    if (match) {
      return match[2]; // Return social media ID (second group)
    }
  
    // Extract domain name (unchanged)
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;
    const parts = domain.split('.');
    if (parts[0].toLowerCase() === 'www') {
      return parts[1];
    } else {
      return parts[0];
    }
  }
  
  
  