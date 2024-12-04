import Grid from "@mui/material/Grid";
import React from 'react';


const linkStyles = {
    base: {
        display: 'inline-block',
        padding: '6px 12px',
        margin: '4px',
        borderRadius: '16px',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    selected: {
        backgroundColor: '#1976D2',
        color: '#fff',
    },
    default: {
        backgroundColor: '#f0f0f0',
        color: '#333',
    },
};

const CustomLink = React.memo(({ href, children, isSelected }) => {
    const appliedStyle = isSelected
        ? { ...linkStyles.base, ...linkStyles.selected }
        : { ...linkStyles.base, ...linkStyles.default };

    return (
        <a href={href} style={appliedStyle}>
            {children}
        </a>
    );
});

export default function ChipContainer({ dizi, keyword, keywordsCounter, totalItems }) {
    // Sort and filter keywordsCounter only if it exists
    const sortedFilteredKeywords = React.useMemo(() => {
        return keywordsCounter
            ? keywordsCounter
                .filter(f => f.count > 0)
                .sort((a, b) => b.count - a.count)
            : [];
    }, [keywordsCounter]);

    return (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container gap={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                {sortedFilteredKeywords.map((m) => (
                    <CustomLink 
                        key={m.keyword} // Use a unique key instead of index
                        href={`/dizisponsoru/${dizi}/${m.keyword}/sayfa/1`} 
                        isSelected={m.keyword === keyword}
                    >
                        {m.keywordTitle}({m.count})
                    </CustomLink>
                ))}
            </Grid>
        </Grid>
    );
}