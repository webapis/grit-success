'use client';

import React, { useState } from 'react';
import { Box, Tab, Tabs, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import genderData from '../genderData.js'

const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'dev';
const filteredTabs = genderData.filter(tab => {
    return tab.show || isDevelopment;
});

export default function TabNavigation({ selectedGender }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const [loadingTab, setLoadingTab] = useState(null);

    const handleChange = (event, gender) => {
        setLoadingTab(gender);
        router.push(`/sponsor-giyim/${gender}/`);
        
        // Reset loading state after navigation
        // You might want to adjust the timeout based on your needs
        setTimeout(() => {
            setLoadingTab(null);
        }, 1000);
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
                {filteredTabs.map((gender) => {
                    const genderValue = gender.gender.toLowerCase().replace(' ', '-');
                    const isLoading = loadingTab === genderValue;
                    
                    return (
                        <Tab
                            value={genderValue}
                            key={gender.gender}
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {gender.gender}
                                    {isLoading && (
                                        <CircularProgress
                                            size={16}
                                            sx={{
                                                ml: 1,
                                                color: theme.palette.primary.main
                                            }}
                                        />
                                    )}
                                </Box>
                            }
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
}