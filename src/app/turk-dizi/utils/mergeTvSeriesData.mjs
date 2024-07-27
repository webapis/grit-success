import { TvSeriesUtils } from "./TvSeriesUtils.mjs";

export default function mergeTvSeriesData({combinedDataSource, maxDistance = 1, maxLengthDifference = 4, exceptions = []}) {
    if (!Array.isArray(combinedDataSource)) {
        console.error('Invalid combinedDataSource provided to mergeTvSeriesData:', combinedDataSource);
        return {};
    }

    const aggregatedData = {};

    function flattenPosterArray(arr) {
        return arr.reduce((acc, item) => {
            if (Array.isArray(item)) {
                return acc.concat(flattenPosterArray(item));
            } else if (typeof item === 'object' && item !== null) {
                return acc.concat(item);
            }
            return acc;
        }, []);
    }

    function mergeValues(existing, newValue, key) {
        if (key === 'POSTER') {
            const combinedArray = Array.isArray(existing) ? existing : [existing];
            combinedArray.push(newValue);
            return flattenPosterArray(combinedArray);
        } else if (key === 'WATCH_LINK') {
            return Array.isArray(existing) ? [...existing, newValue] : [existing, newValue];
        } else if (Array.isArray(existing) && Array.isArray(newValue)) {
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
                    value,
                    mergedKey
                );
            }
        });

        if (!('TVSERIES_TITLE' in aggregatedData[finalTitle].mergedData)) {
            aggregatedData[finalTitle].mergedData['TVSERIES_TITLE'] = finalTitle;
        }
    });

    return aggregatedData;
}