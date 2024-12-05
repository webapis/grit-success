// components/navigation/GenderTabbedNavigation.jsx
import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import CategoryNode from './CategoryNode';
import TabNavigation from './TabNavigation';

const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'dev';

// Styles
const styles = {
    container: {
        width: '100%',
        overflowX: 'hidden',
        maxWidth: '100vw'
    },
    contentWrapper: {
        width: '100%',
        px: { xs: 1, sm: 2 },
        py: { xs: 1, sm: 2 }
    },
    gridContainer: {
        width: '100%',
        m: 0,
        maxWidth: '100%'
    },
    gridItem: {
        width: '100%',
        p: { xs: 1, sm: 2 }
    }
};

export default function GenderTabbedNavigation({ navData, selectedGender }) {
    // Memoize filtered navigation data
    const filteredNavData = useMemo(() => 
        isDevelopment ? navData : navData.filter(gender => gender.title !== 'unrelated'),
        [navData]
    );

    // Memoize selected gender data
    const selectedGenderData = useMemo(() => 
        filteredNavData.find(f => f.title.replace(' ', '-').toLowerCase() === selectedGender),
        [filteredNavData, selectedGender]
    );

    // Memoize sorted and filtered categories
    const sortedCategories = useMemo(() => {
        if (!selectedGenderData?.children) return [];
        
        return selectedGenderData.children
            .filter(f => isDevelopment ? true : f.childrenLength >= 5)
            .sort((a, b) => b.children.length - a.children.length);
    }, [selectedGenderData]);

    return (
        <Box sx={styles.container}>
            <TabNavigation selectedGender={selectedGender} />

            <Box sx={styles.contentWrapper}>
                {selectedGenderData && (
                    <Grid
                        container
                        spacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={styles.gridContainer}
                    >
                        {sortedCategories.map((category) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={category.title}
                                sx={styles.gridItem}
                            >
                                <CategoryNode
                                    gender={selectedGenderData.title}
                                    category={category}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
}