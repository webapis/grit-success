'use client';

import Grid from "@mui/material/Grid";
import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// Move styles outside component to prevent recreation
const containerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    justifyContent: 'center',
    padding: '16px 8px',
    maxWidth: '100%',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
        height: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '3px',
    }
};

// Predefined styles for chips to avoid theme dependency
const chipStyles = {
    borderRadius: '16px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: 2,
        backgroundColor: (theme) => 
            theme.palette.mode === 'light' 
                ? theme.palette.grey[300] 
                : theme.palette.grey[700],
    },
};

const selectedChipStyles = {
    ...chipStyles,
    fontWeight: 500,
    '&:hover': {
        ...chipStyles['&:hover'],
        backgroundColor: (theme) => theme.palette.primary.dark,
    },
};

// Memoize the entire chip component
const CustomChip = React.memo(({ keyword, keywordTitle, count, dizi, isSelected, onClick }) => {
    return (
        <Chip
            label={`${keywordTitle} (${count})`}
            component="a"
            href={`/dizisponsoru/${dizi}/${keyword}/sayfa/1`}
            onClick={onClick}
            clickable
            color={isSelected ? "primary" : "default"}
            sx={isSelected ? selectedChipStyles : chipStyles}
        />
    );
});

CustomChip.displayName = 'CustomChip';

export default function ChipContainer({ dizi, keyword, keywordsCounter, totalItems }) {
    // Memoize the sorted and filtered keywords
    const sortedFilteredKeywords = React.useMemo(() => {
        if (!keywordsCounter?.length) return [];
        
        return keywordsCounter
            .filter(f => f.count > 0)
            .sort((a, b) => {
                // First sort by count
                const countDiff = b.count - a.count;
                if (countDiff !== 0) return countDiff;
                // Then alphabetically by title if counts are equal
                return a.keywordTitle.localeCompare(b.keywordTitle);
            });
    }, [keywordsCounter]);

    // Memoize the click handler
    const handleChipClick = React.useCallback((e) => {
        // Add smooth scroll to top on chip click
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (!sortedFilteredKeywords.length) return null;

    return (
        <Box 
            component="nav" 
            aria-label="keyword filters"
            sx={containerStyles}
        >
            <Grid container sx={{ maxWidth: '1200px', margin: '0 auto' }}>
                {sortedFilteredKeywords.map((m) => (
                    <CustomChip
                        key={m.keyword}
                        keyword={m.keyword}
                        keywordTitle={m.keywordTitle}
                        count={m.count}
                        dizi={dizi}
                        isSelected={m.keyword === keyword}
                        onClick={handleChipClick}
                    />
                ))}
            </Grid>
        </Box>
    );
}