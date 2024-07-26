import { TvSeriesUtils } from "./TvSeriesUtils.mjs";

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