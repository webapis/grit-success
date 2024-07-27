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

    areStringsSimilar(str1row, str2row, maxDistance = 1, maxLengthDifference = 1, exceptions = []) {
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

    areCompanySimilar(company1, company2) {
        // Normalize and clean company names
        const normalized1 = this.normalizeCompanyName(company1).toLowerCase();
        const normalized2 = this.normalizeCompanyName(company2).toLowerCase();
    
        // Exact match check
        if (normalized1 === normalized2) {
            return true;
        }
    
        // Split names into words
        const words1 = normalized1.split(/\s+/);
        const words2 = normalized2.split(/\s+/);
    
        // Check for significant length difference
        if (Math.abs(words1.length - words2.length) > 1) {
            return false;
        }
    
        // Common words to ignore
        const commonWords = ['yapim', 'yapım', 'film', 'production', 'productions'];
    
        // Filter out common words
        const significantWords1 = words1.filter(word => !commonWords.includes(word));
        const significantWords2 = words2.filter(word => !commonWords.includes(word));
    
        // Check if all significant words match exactly
        if (significantWords1.length === significantWords2.length) {
            return significantWords1.every(word => significantWords2.includes(word));
        }
    
        // If one name is a single word and it's included in the other name, consider it a match
        if ((significantWords1.length === 1 && significantWords2.includes(significantWords1[0])) ||
            (significantWords2.length === 1 && significantWords1.includes(significantWords2[0]))) {
            return true;
        }
    
        // If we've reached here, consider the companies different
        return false;
    }
};

export {TvSeriesUtils}