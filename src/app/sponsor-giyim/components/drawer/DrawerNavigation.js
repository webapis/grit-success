// components/navigation/DrawerNavigation.jsx
import React from 'react';
import { Box, List } from '@mui/material';
import DrawerTabs from './DrawerTabs';
import CategoryItem from './DrawerCategoryItem';
const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'dev';
// Server Component
export default function DrawerNavigation({ navData, selectedGender }) {
    const selectedGenderData = navData.find(
        f => f.title.replace(' ', '-').toLowerCase() === selectedGender
    );

    return (
        <Box sx={{ width: '100%' }}>
            <DrawerTabs 
             
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
                    {selectedGenderData?.children.filter(f=> isDevelopment? isDevelopment: f.childrenLength>=5).sort((a,b)=> b.children.length- a.children.length).map((category) => (
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