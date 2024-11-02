// components/navigation/GenderTabbedNavigation.jsx
import React from 'react';
import { Box, Grid } from '@mui/material';
import CategoryNode from './CategoryNode';
import TabNavigation from './TabNavigation';
const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'dev';
// Server Component
export default function GenderTabbedNavigation({ navData, selectedGender }) {
    const filteredNavData = isDevelopment
        ? navData
        : navData.filter(gender => gender.title !== 'unrelated')
        debugger

    const selectedGenderData = filteredNavData.find(
        f => f.title.replace(' ', '-').toLowerCase() === selectedGender
    )
debugger
    return (
        <Box sx={{
            width: '100%',
            overflowX: 'hidden',
            maxWidth: '100vw'
        }}>
            <TabNavigation 
            
                selectedGender={selectedGender} 
            />

            <Box sx={{
                width: '100%',
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 2 }
            }}>
                {selectedGenderData&& (
                    <Grid
                        container
                        spacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                            width: '100%',
                            m: 0,
                            maxWidth: '100%'
                        }}
                    >
                        {selectedGenderData.children.filter(f=> isDevelopment? isDevelopment: f.childrenLength>=5).sort((a,b)=> b.children.length- a.children.length).map((category) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={category.title}
                                sx={{
                                    width: '100%',
                                    p: { xs: 1, sm: 2 }
                                }}
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