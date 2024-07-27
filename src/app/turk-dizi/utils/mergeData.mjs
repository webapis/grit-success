

import fs from 'fs'
import { createRequire } from "module";
import walkSync from './walkSync.mjs'
import mergeTvSeriesData from './mergeTvSeriesData.mjs'
import { groupTvSeriesByProductionCompany } from './groupTvSeriesByProductionCompany.mjs';
const require = createRequire(import.meta.url);
const yapimSirketi = require('../meta/yapim-sirket.json')
const pcomanies = require('../../../../turk-dizi-data/unzipped-data/pcomanies/pcomanies.json')
const dizi = require('../meta/dizi.json')
const unrelated = require('../meta/unrelated.json')
import deaccent from './deaccent.mjs'
import groupBy from './groupBy.mjs'
const filePaths = []
const data = []

walkSync(`${process.cwd()}/turk-dizi-data/`, (filePath) => {
    filePaths.push(filePath)
    const currentFileData = JSON.parse(fs.readFileSync(filePath))

    data.push(...currentFileData)

})


import fields from './consts.mjs'





const aggregatedData = []



const exceptions = [['Ali̇ye', 'Atiye'], ['aşk-ı memnu', 'memnu'], ['üç kadın', 'kadın']]
debugger
const withoultUnrelatedData = data.filter((f => {

    const match = unrelated.includes(f.TVSERIES_TITLE)

    return match === false
}))
debugger

const result = mergeTvSeriesData({ combinedDataSource: withoultUnrelatedData })
debugger
const groupedData = groupTvSeriesByProductionCompany(result)
debugger








const byYAPIM_SIRKETI = Object.entries(groupedData).sort((a, b) => b[1].length - a[1].length).filter(f => f[1].length > 2 && f[0] !== 'Unknown')
debugger


const mapYSData = byYAPIM_SIRKETI.map(m => {

    const title = m[0]

    const match = yapimSirketi.find(f => {
        const fTitle = deaccent(f.title.join(' ')).toLowerCase()
        const ttitle = deaccent(title).toLowerCase()
        const result = fTitle.includes(ttitle)
        return result
    })

    const comany = pcomanies.find(f => match?.title.includes(f.brandTitle))

    const establishedYear = comany ? comany.data?.find(f => f.title === 'Kuruluş')?.value : ''
    const founder = comany ? comany.data?.find(f => (f.title === 'Kurucu' | f.title === 'Önemli kişiler'))?.value : ''

    const imgname = match?.imgname

    let webpresenceId = ''
    try {
        webpresenceId = imgname || match?.website[0] ? extractDomainOrId((match?.website[0])) : ''
    } catch (error) {
        debugger
    }


    const logo = `/dizi/turk-dizi/yapim-sirketleri/${webpresenceId}.jpg`

    const tvSeries = m[1]

    const mapTVSeries = tvSeries.map((d) => {

        const m = d.mergedData


        const matchingConstDizi = dizi.find((f => deaccent(f.title).toLowerCase() === deaccent(m.TVSERIES_TITLE).toLowerCase()))

        let watchLinks = []
        try {

            watchLinks = (m.WATCH_LINK || []).map((m_) => {
                const url = m_
                const kanal = getBaseDomain(m_)
                const name = kanal
                const logo = `/dizi/turk-dizi/kanal/${kanal}.jpg`

                return {
                    name, url, logo
                }
            })
        } catch (error) {
            debugger
        }
        const watchOptions = watchLinks
        const otherWatchOptions = ((matchingConstDizi || {}).watchOptions || []).map((m_) => {
            const url = m_
            const kanal = getBaseDomain(m_)
            const name = kanal
            const logo = `/dizi/turk-dizi/kanal/${kanal}.jpg`

            return {
                name, url, logo
            }
        })

        let genres = []
        try {
            genres = (m.GENRES || [])
                .flat().filter(f => f)
                .map(m => m.toLowerCase())
                .reduce((acc, value) => {
                    if (!acc.includes(value.trim())) {
                        acc.push(value.trim());
                    }
                    return acc;
                }, [])
                .filter(f => f)
                .sort();
        } catch (error) {
            debugger
        }


        try {



            const mapped = {
                id: m.TVSERIES_TITLE,
                title: m?.TVSERIES_TITLE,
                year: matchingConstDizi?.FIRST_YEAR || extractStartYear(m?.YAYIN_TARIHI),
                thumbnail: matchingConstDizi?.POSTER_IMG || (m?.POSTER ? m?.POSTER.filter(f => f.POSTER_IMG)[0]?.POSTER_IMG : ''),

                streamingUrl: (m.WATCH_LINK || [])[0],
                channelLogo: `/dizi/turk-dizi/kanal/${m?.KANAL}.jpg`,
                channelName: m?.KANAL,
                state: m?.DURUM,
                genres,
                lastEpisode: m?.BOLUM_SAYISI?.replace('(bölümleri listesi)', ''),
                watchOptions: [...(otherWatchOptions || []), ...watchOptions].filter((item, index, self) =>
                    index === self.findIndex((t) => t.url === item.url)
                )
            }
            return mapped
        } catch (error) {
            debugger
        }
    }).sort((a, b) => b['year'] - a['year']).reduce((prev, curr, i) => {

        try {


            if (i === 0) {

                return [curr]

            }

            if (i > 0) {

                const exist = prev.find(f => areStringsSimilar(f.title, curr.title))
                if (exist) {
                    debugger
                    const resp = prev.map(m => {

                        const match = areStringsSimilar(m.title, curr.title)

                        if (match) {


                            return mergeObjects(m, curr)

                        } else {

                            return m
                        }

                    })


                    return resp
                } else {

                    return [...prev, curr]
                }

            }
        } catch (error) {
            debugger
        }

    }, [])

    return {
        id: webpresenceId,
        description: "",
        establishedYear,
        founder,
        ...match,
        title,
        logo,
        tvSeries: mapTVSeries
    }


})

debugger
fs.writeFileSync(`turk-dizi-data/yapim-sirketleri.json`, JSON.stringify(mapYSData))
debugger
process.exit(0)





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

function areStringsSimilar(str1row, str2row, maxDistance = 1, maxLengthDifference = 4, exceptions = []) {
    const str1 = normalizeTurkish(str1row.normalize('NFD').replaceAll('-', ' ').replaceAll(':', '').replaceAll('  ', ' ')).replace(/[\u0300-\u036f]/g, "").toLowerCase()
    const str2 = normalizeTurkish(str2row.normalize('NFD').replaceAll('-', ' ').replaceAll(':', '').replaceAll('  ', ' ')).replace(/[\u0300-\u036f]/g, "").toLowerCase()
    // Check if the pair of strings is in the exceptions list
    if (exceptions.some(pair =>
        (pair[0].toLowerCase() === str1row.toLowerCase() && pair[1].toLowerCase() === str2row.toLowerCase()) ||
        (pair[1].toLowerCase() === str1row.toLowerCase() && pair[0].toLowerCase() === str2row.toLowerCase())
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

function extractStartYear(dateString) {
    const yearRegex = /\d{4}/;

    // Check if the year pattern exists
    if (yearRegex.test(dateString)) {
        const match = dateString.match(yearRegex);
        return match[0];
    } else {
        return "Invalid data passed";
    }
}


function getBaseDomain(url) {
    // Remove protocol and www if present
    let domain = url.replace(/^(https?:\/\/)?(www\.)?/, '');

    // Remove path, query parameters, and hash
    domain = domain.split('/')[0].split('?')[0].split('#')[0];

    // Split the remaining string by dots
    const parts = domain.split('.');

    // Remove known top-level domains and country codes
    while (parts.length > 1 && (parts[parts.length - 1].length <= 3 || parts[parts.length - 1] === 'com')) {
        parts.pop();
    }

    // Return the last remaining part
    return parts[parts.length - 1];
}


function separateCompanies(data) {
    // Split the company names by comma and trim whitespace
    const companies = data.YAPIM_SIRKETI.split(',').map(company => company.trim());

    // Create a new array to hold objects for each company
    const separatedData = companies.map(company => {
        // Copy the original data object and assign the specific company name
        return {
            ...data,
            YAPIM_SIRKETI: company
        };
    });

    return separatedData;
}


function mergeObjects(obj1, obj2) {
    return Object.keys({ ...obj1, ...obj2 }).reduce((result, key) => {
        result[key] = obj1[key] !== undefined ? obj1[key] : obj2[key];
        return result;
    }, {});
}