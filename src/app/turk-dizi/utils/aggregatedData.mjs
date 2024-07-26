// TvSeriesUtils.js
const TvSeriesUtils = {
    normalizeTitle(title) {
        return this.normalizeTurkish(String(title).normalize('NFD').replaceAll('-', ' ').replaceAll(':', '').replaceAll('  ', ' '))
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    },

    normalizeTurkish(text) {
        try {
            return text
                .replace(/ç/g, 'c').replace(/Ç/g, 'C')
                .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
                .replace(/ı/g, 'i').replace(/I/g, 'I')
                .replace(/ö/g, 'o').replace(/Ö/g, 'O')
                .replace(/ş/g, 's').replace(/Ş/g, 'S')
                .replace(/ü/g, 'u').replace(/Ü/g, 'U');
        } catch (error) {
            console.error('Error in normalizeTurkish:', error);
            return text;
        }
    },

    levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    },

    areStringsSimilar(str1row, str2row, maxDistance = 1, maxLengthDifference = 4, exceptions = []) {
        const str1 = this.normalizeTitle(str1row);
        const str2 = this.normalizeTitle(str2row);

        if (exceptions.some(pair =>
            (pair[0].toLowerCase() === str1row.toLowerCase() && pair[1].toLowerCase() === str2row.toLowerCase()) ||
            (pair[1].toLowerCase() === str1row.toLowerCase() && pair[0].toLowerCase() === str2row.toLowerCase())
        )) {
            return false;
        }

        if (Math.abs(str1.length - str2.length) > maxLengthDifference) {
            return false;
        }

        const distance = this.levenshteinDistance(str1, str2);
        return distance <= maxDistance;
    },

    cleanCompanyName(companyName) {
        // Remove date ranges in parentheses
        let cleaned = companyName.replace(/\s*\(\d{4}-\d{4}\)/g, '');
        
        // Remove any remaining parentheses and their contents
        cleaned = cleaned.replace(/\s*\([^)]*\)/g, '');
        
        // Remove any extra whitespace
        cleaned = cleaned.trim();
        
        return cleaned;
    },

    normalizeCompanyName(companyName) {
        const cleaned = this.cleanCompanyName(companyName);
        // Remove common suffixes
        return cleaned.replace(/\s+(Productions?|Film|Yapım|Yapim)$/i, '').trim();
    },

    areCompanySimilar(company1, company2, maxDistance = 1, maxLengthDifference = 4) {
        const normalized1 = this.normalizeCompanyName(company1);
        const normalized2 = this.normalizeCompanyName(company2);

        // Check if one is a substring of the other (case insensitive)
        if (normalized1.toLowerCase().includes(normalized2.toLowerCase()) ||
            normalized2.toLowerCase().includes(normalized1.toLowerCase())) {
            return true;
        }

        // Use Levenshtein distance for remaining cases
        return this.areStringsSimilar(normalized1, normalized2, maxDistance, maxLengthDifference);
    }
};

// mergeTvSeriesData.js
export default function mergeTvSeriesData(combinedDataSource, maxDistance = 1, maxLengthDifference = 4, exceptions = []) {
    if (!Array.isArray(combinedDataSource)) {
        console.error('Invalid combinedDataSource provided to mergeTvSeriesData:', combinedDataSource);
        return {};
    }

    const aggregatedData = {};

    function mergeValues(existing, newValue) {
        if (Array.isArray(existing) && Array.isArray(newValue)) {
            return [...new Set([...existing, ...newValue])];
        } else if (typeof existing === 'object' && typeof newValue === 'object') {
            return [existing, newValue];
        } else if (existing === "") {
            return newValue;
        }
        return existing;
    }

    function findTvSeriesTitleKey(obj) {
        const possibleKeys = ['TVSERIES_TITLE', 'TITLE', 'NAME', 'SERIES_NAME'];
        return Object.keys(obj).find(key => possibleKeys.includes(key.toUpperCase()));
    }

    function findSimilarTitle(newTitle) {
        for (const existingTitle in aggregatedData) {
            if (TvSeriesUtils.areStringsSimilar(existingTitle, newTitle, maxDistance, maxLengthDifference, exceptions)) {
                return existingTitle;
            }
        }
        return null;
    }

    combinedDataSource.forEach((series, index) => {
        const titleKey = findTvSeriesTitleKey(series);
        let title = 'UNKNOWN_TITLE';

        if (titleKey && series[titleKey]) {
            title = TvSeriesUtils.normalizeTitle(series[titleKey]);
        } else {
            console.warn(`Warning: No valid title found for series at index ${index}. Using 'UNKNOWN_TITLE'.`);
        }

        const similarTitle = findSimilarTitle(title);
        const finalTitle = similarTitle || title;

        if (!aggregatedData[finalTitle]) {
            aggregatedData[finalTitle] = {
                sources: [],
                mergedData: {}
            };
        }

        aggregatedData[finalTitle].sources.push({
            index,
            data: { ...series }
        });

        Object.entries(series).forEach(([key, value]) => {
            const mergedKey = key.toUpperCase() === 'TVSERIES_TITLE' ? 'TVSERIES_TITLE' : key;
            if (!(mergedKey in aggregatedData[finalTitle].mergedData)) {
                aggregatedData[finalTitle].mergedData[mergedKey] = value;
            } else {
                aggregatedData[finalTitle].mergedData[mergedKey] = mergeValues(
                    aggregatedData[finalTitle].mergedData[mergedKey],
                    value
                );
            }
        });

        if (!('TVSERIES_TITLE' in aggregatedData[finalTitle].mergedData)) {
            aggregatedData[finalTitle].mergedData['TVSERIES_TITLE'] = finalTitle;
        }
    });

    return aggregatedData;
}

// groupTvSeriesByProductionCompany.js
export function groupTvSeriesByProductionCompany(tvSeriesData, maxDistance = 1, maxLengthDifference = 4) {
    if (!tvSeriesData || typeof tvSeriesData !== 'object') {
        console.error('Invalid tvSeriesData provided to groupTvSeriesByProductionCompany:', tvSeriesData);
        return {};
    }

    const groupedData = {};

    function findSimilarCompany(newCompany) {
        for (const existingCompany in groupedData) {
            if (TvSeriesUtils.areCompanySimilar(existingCompany, newCompany, maxDistance, maxLengthDifference)) {
                return existingCompany;
            }
        }
        return null;
    }

    function splitAndTrimCompanies(companyString) {
        return companyString.split(',').map(company => company.trim());
    }

    for (const [title, seriesInfo] of Object.entries(tvSeriesData)) {
        if (!seriesInfo || typeof seriesInfo !== 'object' || !seriesInfo.mergedData) {
            console.warn(`Invalid series info for title "${title}":`, seriesInfo);
            continue;
        }

        let productionCompanies;
        if (Array.isArray(seriesInfo.mergedData.YAPIM_SIRKETI)) {
            productionCompanies = seriesInfo.mergedData.YAPIM_SIRKETI.flatMap(splitAndTrimCompanies);
        } else if (typeof seriesInfo.mergedData.YAPIM_SIRKETI === 'string') {
            productionCompanies = splitAndTrimCompanies(seriesInfo.mergedData.YAPIM_SIRKETI);
        } else {
            productionCompanies = ['Unknown'];
        }

        productionCompanies.forEach(company => {
            if (company) {  // Ensure we're not adding empty strings
                const similarCompany = findSimilarCompany(company);
                const finalCompany = similarCompany || company;

                if (!groupedData[finalCompany]) {
                    groupedData[finalCompany] = [];
                }
                groupedData[finalCompany].push({ title, ...seriesInfo });
            }
        });
    }

    return groupedData;
}
// Add this to TvSeriesUtils
function cleanCompanyName(companyName) {
    // Remove date ranges in parentheses
    let cleaned = companyName.replace(/\s*\(\d{4}-\d{4}\)/g, '');
    
    // Remove any remaining parentheses and their contents
    cleaned = cleaned.replace(/\s*\([^)]*\)/g, '');
    
    // Remove any extra whitespace
    cleaned = cleaned.trim();
    
    return cleaned;
}
// main.js or index.js
// import { mergeTvSeriesData } from './mergeTvSeriesData.js';
// import { groupTvSeriesByProductionCompany } from './groupTvSeriesByProductionCompany.js';

// Example data sources
const dataSource1 = [
    {
        "TVSERIES_TITLE": "Zirvedekiler",
        "FORMAT": "Televizyon dizisi",
        "GENRES": ["Drama"],
        "FIRST_YEAR": 1995,
        "LAST_YEAR": 1995,
        "BOLUM_SAYISI": "18",
        "YAPIM_SIRKETI": "Example Production Co."
    }
];

const dataSource2 = [
    {
        "NAME": "Zirvedekiler",
        "DIRECTOR": "Halit Refiğ",
        "LEAD_ACTORS": "Cüneyt Arkın, Gülşen Bubikoğlu",
        "FIRST_YEAR": 1995,
        "EPISODE_COUNT": "20",
        "YAPIM_SIRKETI": "Example Production Co."
    },
    {
        "DIRECTOR": "Unknown Director",
        "GENRES": ["Mystery"],
        "YAPIM_SIRKETI": "Another Production Co."
    }
];

// Combine all data sources into a single array
const combinedDataSource = [...dataSource1, ...dataSource2];

console.log('Combined Data Source:', combinedDataSource);

const mergedData = mergeTvSeriesData(combinedDataSource);
console.log('Merged Data:', mergedData);

if (mergedData && typeof mergedData === 'object') {
    const groupedByCompany = groupTvSeriesByProductionCompany(mergedData);
    console.log('Grouped by Company:', JSON.stringify(groupedByCompany, null, 2));
} else {
    console.error('mergeTvSeriesData did not return a valid object:', mergedData);
}