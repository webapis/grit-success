
/*
can we display spinner when switching between gender tabs. spinning should be displayed to the right side of clicked tab. 
do not break functionality
https://claude.ai/chat/07f1dd38-5dc6-4857-9c4d-308a044c3dc9
*/
'use client';

import React from 'react';
import { Box, Tab, Tabs, useTheme, useMediaQuery } from '@mui/material';
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

    const handleChange = (event, gender) => {
        router.push(`/sponsor-giyim/${gender}/`);
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
                {filteredTabs.map((gender) => (
                    <Tab
                        value={gender.gender.toLowerCase().replace(' ','-')}
                        key={gender.gender}
                        label={gender.gender}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
