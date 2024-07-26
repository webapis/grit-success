import mergeTvSeriesData from './mergeTvSeriesData.mjs';
import { groupTvSeriesByProductionCompany } from './groupTvSeriesByProductionCompany.mjs';

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