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
    Button,
    useMediaQuery,
    Badge,
    Stack
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
    KeyboardArrowRight,
    KeyboardArrowDown,
} from '@mui/icons-material';

// Icon mapping
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

const CategoryNode = ({ category, gender }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const MAX_ITEMS_DISPLAY = isMobile ? 3 : 5;
    
    const [expanded, setExpanded] = React.useState(false);
    const sortedChildren = [...category.children].sort((a, b) => a.title.localeCompare(b.title));
    const displayItems = expanded ? sortedChildren : sortedChildren.slice(0, MAX_ITEMS_DISPLAY);

    return (
        <Paper 
            elevation={1} 
            sx={{ 
                mb: 2,
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden' // Prevent content from causing horizontal scroll
            }}
        >
            <Box sx={{ 
                p: 2,
                borderBottom: 1,
                borderColor: 'divider'
            }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 600, 
                        color: 'primary.main',
                        fontSize: isMobile ? 14 : 16,
                        textTransform: 'uppercase'
                    }}
                >
                    <Badge 
                        badgeContent={category.children.length} 
                        color="primary"
                        sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}
                    >
                        {category.title}
                    </Badge>
                </Typography>
            </Box>

            <Stack spacing={0.5}>
                {displayItems.map((item) => (
                    <Box 
                        key={item.uid || item.title}
                        sx={{ width: '100%' }}
                    >
                        {item.uid ? (
                            <Link 
                                href={`/sponsor-giyim/${gender}/${category.title.replace(' ', '-')}/${item.title.replace(' ', '-')}/${item.uid}`} 
                                passHref 
                                style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        p: 2,
                                        color: 'text.primary',
                                        '&:active': {
                                            bgcolor: 'action.selected'
                                        }
                                    }}
                                >
                                    <Box sx={{ 
                                        minWidth: 24,
                                        mr: 2,
                                        color: 'primary.main',
                                        opacity: 0.7
                                    }}>
                                        {getIcon(item.title)}
                                    </Box>
                                    <Box sx={{ 
                                        flexGrow: 1,
                                        minWidth: 0 // Allow text to shrink
                                    }}>
                                        <Typography 
                                            noWrap // Prevent text wrapping
                                            sx={{ 
                                                fontSize: '0.875rem',
                                                fontWeight: 500
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="body2"
                                            sx={{ 
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {item.childrenLength} marka
                                        </Typography>
                                    </Box>
                                    <KeyboardArrowRight 
                                        sx={{ 
                                            ml: 1,
                                            fontSize: 20,
                                            color: 'primary.main'
                                        }} 
                                    />
                                </Box>
                            </Link>
                        ) : (
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                p: 2,
                                opacity: 0.6,
                                width: '100%'
                            }}>
                                <Box sx={{ 
                                    minWidth: 24,
                                    mr: 2,
                                    color: 'text.secondary' 
                                }}>
                                    {getIcon(item.title)}
                                </Box>
                                <Box sx={{ 
                                    flexGrow: 1,
                                    minWidth: 0
                                }}>
                                    <Typography 
                                        noWrap
                                        color="text.secondary" 
                                        sx={{ fontSize: '0.875rem' }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        noWrap
                                        variant="body2"
                                        sx={{ 
                                            fontSize: '0.75rem',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        ({item.childrenLength} marka)
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                ))}
            </Stack>
            {sortedChildren.length > MAX_ITEMS_DISPLAY && (
                <Box sx={{ p: 2 }}>
                    <Button 
                        fullWidth
                        size='small' 
                        onClick={() => setExpanded(!expanded)}
                        color="primary"
                        variant='outlined'
                        endIcon={expanded ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                        sx={{
                            textTransform: 'capitalize',
                            fontSize: '0.75rem'
                        }}
                    >
                        {expanded ? 'Show Less' : `Show ${sortedChildren.length - MAX_ITEMS_DISPLAY} More`}
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

const GenderTabbedNavigation = ({ navData, selectedGender }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (event, index) => {
        const selectedGender = navData.find(f => f.index === index).urlGender;
        window.location.href = `/sponsor-giyim/${selectedGender}/`;
    };

    const filteredNavData = process.env.NEXT_PUBLIC_ENV === 'dev'
        ? navData
        : navData.filter(gender => gender.title !== 'unrelated');

    return (
        <Box sx={{ 
            width: '100%',
            maxWidth: '100vw',
            overflow: 'hidden' // Prevent any horizontal scroll
        }}>
            <Box sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                position: 'sticky',
                top: 0,
                bgcolor: 'background.paper',
                zIndex: 1000,
            }}>
                <Tabs
                    value={selectedGender}
                    onChange={handleChange}
                    aria-label="gender navigation tabs"
                    variant="scrollable"
                    scrollButtons={isMobile ? false : "auto"}
                    sx={{
                        '& .MuiTab-root': {
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            minHeight: 48,
                            px: 2,
                            minWidth: 'auto',
                        }
                    }}
                >
                    {filteredNavData.map((gender) => (
                        <Tab 
                            key={gender.title} 
                            label={gender.title}
                            sx={{
                                textTransform: 'capitalize',
                            }}
                        />
                    ))}
                </Tabs>
            </Box>

            <Box sx={{ 
                px: { xs: 1, sm: 2 },
                py: 2,
                maxWidth: '100%'
            }}>
                {filteredNavData[selectedGender] && (
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        {filteredNavData[selectedGender].children.map((category) => (
                            <CategoryNode 
                                key={category.title} 
                                gender={filteredNavData[selectedGender].title} 
                                category={category} 
                            />
                        ))}
                    </Stack>
                )}
            </Box>
        </Box>
    );
};

export default GenderTabbedNavigation;

