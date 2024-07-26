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

export {TvSeriesUtils}