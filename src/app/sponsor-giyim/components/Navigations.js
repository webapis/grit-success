'use client';
import React from 'react';
import Link from 'next/link';
import {
    Tabs,
    Tab,
    Box,
    Typography,
    useTheme,
    Paper,
    Fade,
    Divider,
    Button
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

// Icon mapping function
const getIcon = (title) => {
    const iconMap = {
        'Tops': Shirt,
        'Dresses': Checkroom,
        'Bottoms': Stairs,
        'Kids': ChildFriendly,
        'Beauty': Spa,
        'Accessories': Watch,
        'Bags': Backpack,
    };
    const IconComponent = iconMap[title] || Face;
    return <IconComponent fontSize="small" />;
};

import tabData from '../components/genderData';

const CategoryNode = ({ category, gender }) => {
    const MAX_ITEMS_DISPLAY = 5;
    const sortedChildren = [...category.children].sort((a, b) => a.title.localeCompare(b.title));

    const handleShowMoreClick = () => {
        window.location.href = `/sponsor-giyim/${gender}/${category.title.replace(' ', '-')}`;
    };

    return (
        <Box sx={{ mb: 4 }}>
         
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {category.title}
            
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box component="ul" sx={{ listStyleType: 'none', p: 0, m: 0 }}>
                {sortedChildren.slice(0, MAX_ITEMS_DISPLAY).map((item) => (
                    <Box component="li" key={item.uid || item.title} sx={{ mb: 1 }}>
                        {item.uid ? (
                            <Link href={`/sponsor-giyim/${gender}/${category.title.replace(' ', '-')}/${item.title.replace(' ', '-')}/${item.uid}`} passHref style={{ textDecoration: 'none' }}>
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
                                    <Typography sx={{ flexGrow: 1 }}>
                                        {item.title}
                                        <span style={{ fontSize: '0.8rem', color: 'text.secondary', opacity: 0.7 }}>
                                            ({item.childrenLength} marka)
                                        </span>
                                    </Typography>
                                    <KeyboardArrowRight sx={{ opacity: 0, transition: 'all 0.2s' }} />
                                </Box>
                            </Link>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                    {getIcon(item.title)}
                                </Box>
                                <Typography color="text.secondary">
                                    {item.title}
                                    <span style={{ fontSize: '0.8rem', color: 'text.secondary', opacity: 0.7 }}>
                                        ({item.childrenLength} marka)
                                    </span>
                                </Typography>
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
            {sortedChildren.length > MAX_ITEMS_DISPLAY && (
                <Button size='small' onClick={handleShowMoreClick} color="primary">
                    Show More
                </Button>
            )}
        </Box>
    );
};

const GenderTabbedNavigation = ({ navData, selectedGender }) => {
    const theme = useTheme();

    const handleChange = (event, index) => {
        const selectedGender = tabData.find(f => f.index === index).urlGender;
        window.location.href = `/sponsor-giyim/${selectedGender}/`;
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
                                    xs: 2,
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
                            {navData[selectedGender].children.map((category) => (
                                <CategoryNode key={category.title} gender={navData[selectedGender].title} category={category} />
                            ))}
                        </Box>
                    )}
                </Box>
            </Fade>
        </Paper>
    );
};

export default GenderTabbedNavigation;
