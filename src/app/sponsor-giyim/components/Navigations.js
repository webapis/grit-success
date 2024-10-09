'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import navData from '../nav/navigation.json';

import {
    Tabs,
    Tab,
    Box,
    Typography,

    useTheme,
    Paper,
    Fade,
    Divider
} from '@mui/material';

import {
    Shirt,
    Checkroom,
    Stairs,
    ChildFriendly,
    Face,
    Backpack,
    Watch,
    Spa,
    KeyboardArrowRight
} from '@mui/icons-material';

const getIcon = (title) => {
    const iconMap = {
        'Tops': Shirt,
        'Dresses': Checkroom,
        'Bottoms': Stairs,
        'Kids': ChildFriendly,
        'Beauty': Spa,
        'Accessories': Watch,
        'Bags': Backpack,
        // Add more mappings as needed
    };

    const IconComponent = iconMap[title] || Face;
    return <IconComponent fontSize="small" />;
};

const CategoryNode = ({ category, gender }) => {
    const sortedChildren = [...category.children].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {category.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box component="ul" sx={{ listStyleType: 'none', p: 0, m: 0 }}>
                {sortedChildren.map((item) => (
                    <Box component="li" key={item.uid || item.title} sx={{ mb: 1 }}>
                        {item.uid ? (
                            <Link href={`/sponsor-giyim/${gender}/${category.title.replace(' ', '-')}/${item.title}/${item.uid}`} passHref style={{ textDecoration: 'none' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'text.primary',
                                        cursor: 'pointer',
                                        p: 1,
                                        borderRadius: 1,
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                            color: 'primary.main',
                                            textDecoration: 'underline',
                                            '& .MuiSvgIcon-root:last-child': {
                                                opacity: 1,
                                                transform: 'translateX(4px)',
                                            }
                                        },
                                    }}
                                >
                                    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                                        {getIcon(item.title)}
                                    </Box>
                                    <Typography sx={{ flexGrow: 1 }}>{item.title}</Typography>
                                    <KeyboardArrowRight sx={{ opacity: 0, transition: 'all 0.2s' }} />
                                </Box>
                            </Link>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                    {getIcon(item.title)}
                                </Box>
                                <Typography color="text.secondary">{item.title}</Typography>
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const GenderTabbedNavigation = () => {
    const [selectedGender, setSelectedGender] = useState(0);
    const theme = useTheme();


    const handleChange = (event, newValue) => {
        setSelectedGender(newValue);
    };

    return (
        <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={selectedGender}
                    onChange={handleChange}
                    aria-label="gender navigation tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                        '& .MuiTabs-scrollButtons': {
                            '&.Mui-disabled': { opacity: 0.3 },
                        },
                        '& .MuiTab-root': {
                            fontWeight: 'bold',
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            minWidth: { xs: '120px', sm: '160px' },
                            transition: 'all 0.2s',
                            '&:hover': {
                                bgcolor: 'action.hover',
                            },
                            '&.Mui-selected': {
                                color: 'primary.main',
                            },
                        },
                    }}
                >
                    {navData.map((gender, index) => (
                        <Tab key={gender.title} label={gender.title} />
                    ))}
                </Tabs>
            </Box>
            <Fade in={true} timeout={500}>
                <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                    {navData[selectedGender] && (
                        <Box
                            sx={{
                                columnCount: {
                                    xs: 2, // Two columns on extra small devices
                                    sm: 2,
                                    md: 3,
                                    lg: 4,
                                },
                                columnGap: '32px',
                                '& > div': {
                                    breakInside: 'avoid-column',
                                    pageBreakInside: 'avoid',
                                    WebkitColumnBreakInside: 'avoid',
                                },
                            }}
                        >
                            {navData[selectedGender].children.map((category) => {

                                return <CategoryNode key={category.title} gender={navData[selectedGender].title} category={category} />
                            })}
                        </Box>
                    )}
                </Box>
            </Fade>
        </Paper>
    );
};

export default GenderTabbedNavigation;
