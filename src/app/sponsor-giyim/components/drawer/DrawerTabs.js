// components/navigation/DrawerTabs.jsx
'use client';

import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useRouter } from 'next/navigation';
import genderData from '../genderData'
export default function DrawerTabs({ selectedGender }) {
    const router = useRouter();

    const handleGenderChange = (event, selectedGender) => {
        router.push(`/sponsor-giyim/${selectedGender}/`);
    };

    return (
        <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 2,
            position: 'relative'
        }}>
            <Tabs
                value={selectedGender}
                onChange={handleGenderChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                    minHeight: 48,
                    '& .MuiTab-root': {
                        minHeight: 48,
                        minWidth: 'auto',
                        py: 0,
                        px: 2,
                        fontSize: '0.875rem',
                        fontWeight: 'medium',
                        textTransform: 'none',
                        '&.Mui-selected': {
                            color: 'primary.main',
                        },
                    },
                    '& .MuiTabs-scrollButtons': {
                        '&.Mui-disabled': {
                            opacity: 0.3,
                        },
                        '&.MuiTabs-scrollButtons--auto': {
                            display: 'flex',
                        },
                    },
                }}
            >
                {genderData.map((obj, index) => (
                    <Tab
                        value={obj.gender.replace(' ', '-').toLowerCase()}
                        key={obj.gender}
                        label={obj.gender}
                        id={`gender-tab-${index}`}
                        aria-controls={`gender-tabpanel-${index}`}
                    />
                ))}
            </Tabs>
        </Box>
    );
}