// components/navigation/DrawerNavigation.jsx
import React from 'react';
import { Box, List } from '@mui/material';
import DrawerTabs from './DrawerTabs';
import CategoryItem from './DrawerCategoryItem';

// Server Component
export default function DrawerNavigation({ navData, selectedGender }) {
    const selectedGenderData = navData.find(
        f => f.title.replace(' ', '-').toLowerCase() === selectedGender
    );

    return (
        <Box sx={{ width: '100%' }}>
            <DrawerTabs 
                navData={navData} 
                selectedGender={selectedGender} 
            />

            <Box
                role="tabpanel"
                id={`gender-tabpanel-${selectedGender}`}
                aria-labelledby={`gender-tab-${selectedGender}`}
            >
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        p: 0
                    }}
                >
                    {selectedGenderData?.children.map((category) => (
                        <CategoryItem
                            key={category.title}
                            category={category}
                            gender={selectedGenderData.title}
                        />
                    ))}
                </List>
            </Box>
        </Box>
    );
}