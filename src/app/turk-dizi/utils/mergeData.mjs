

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

const mapYSData = byYAPIM_SIRKETI.filter(f => f[1].length > 2).map(m => {

    const title = m[0]
    const match = yapimSirketi.find(f => f.title.includes(title))

    const webpresenceId = extractDomainOrId(match.website[0])

    const logo = `/dizi/turk-dizi/yapim-sirketleri/${webpresenceId}.jpg`

    const tvSeries = m[1]
    const watchOptions = [
        { name: 'ATV', url: 'https://www.atv.com.tr/dizi-adi', logo: 'data:image/jpeg;base64,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' },
        { name: 'YouTube', url: 'https://www.youtube.com/channel/', logo: 'data:image/png;base64,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' },
        { name: 'Netflix', url: 'https://www.netflix.com/title/', logo: 'data:image/png;base64,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' },
    ]
    const mapTVSeries = tvSeries.map(m => {
        try {
            const mapped = {
                id: 0,
                title: m?.TVSERIES_TITLE,
                year: m?.FIRST_YEAR,
                thumbnail: m?.POSTER[0].POSTER_IMG,
                streamingUrl: m?.WATCH_LINK[0],
                channelLogo: `/dizi/turk-dizi/kanal/${m?.KANAL[0]}.jpg`,
                channelName: m?.KANAL[0],
                state: m?.DURUM[0],
                lastEpisode: 16,
                watchOptions

            }
            return mapped
        } catch (error) {
            debugger
        }



    })

    return {
        description: "desk...",
        title,
        ...match,
        logo,
        tvSeries: mapTVSeries
    }


})
debugger
debugger
fs.writeFileSync(`turk-dizi-data/yapim-sirketleri.json`, JSON.stringify(mapYSData))
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


