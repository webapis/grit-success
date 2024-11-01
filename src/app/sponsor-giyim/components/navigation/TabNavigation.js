'use client';

import React from 'react';
import { Box, Tab, Tabs, useTheme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function TabNavigation({ navData, selectedGender }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();

    const handleChange = (event, urlGender) => {
        router.push(`/sponsor-giyim/${urlGender}/`);
    };

    return (
        <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            bgcolor: 'background.paper',
            zIndex: 1000,
            maxWidth: '100%',
        }}>
            <Tabs
                value={selectedGender}
                onChange={handleChange}
                aria-label="gender navigation tabs"
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={false}
                allowScrollButtonsMobile={false}
                sx={{
                    maxWidth: '100%',
                    '& .MuiTabs-scroller': {
                        overflow: 'auto !important',
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                    },
                    '& .MuiTabs-flexContainer': {
                        gap: { xs: 1, sm: 2 },
                    },
                    '& .MuiTab-root': {
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        minHeight: { xs: 40, sm: 48 },
                        padding: { xs: '6px 12px', sm: '12px 16px' },
                        minWidth: 'auto',
                        flex: isMobile ? '0 0 auto' : 1,
                        whiteSpace: 'nowrap',
                        textTransform: 'capitalize',
                    }
                }}
            >
                {navData.map((gender) => (
                    <Tab
                        value={gender.title.replace(' ', '-').toLowerCase()}
                        key={gender.title}
                        label={gender.title}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
