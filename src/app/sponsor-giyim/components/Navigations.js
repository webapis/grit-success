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
    Button,
    IconButton,
    useMediaQuery,
    Tooltip,
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
    Menu as MenuIcon
} from '@mui/icons-material';

// Icon mapping with tooltips
const getIcon = (title) => {
    const iconMap = {
        'Tops': { icon: Shirt, tooltip: 'Clothing Tops' },
        'Dresses': { icon: Checkroom, tooltip: 'Dresses Collection' },
        'Bottoms': { icon: Stairs, tooltip: 'Pants & Bottoms' },
        'Kids': { icon: ChildFriendly, tooltip: 'Kids Fashion' },
        'Beauty': { icon: Spa, tooltip: 'Beauty Products' },
        'Accessories': { icon: Watch, tooltip: 'Fashion Accessories' },
        'Bags': { icon: Backpack, tooltip: 'Bags & Purses' },
    };
    
    const IconConfig = iconMap[title] || { icon: Face, tooltip: 'Fashion Items' };
    const IconComponent = IconConfig.icon;
    
    return {
        component: <IconComponent fontSize="small" />,
        tooltip: IconConfig.tooltip
    };
};

const CategoryNode = ({ category, gender }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const MAX_ITEMS_DISPLAY = isMobile ? 3 : 5;
    
    const [expanded, setExpanded] = React.useState(false);
    const sortedChildren = [...category.children].sort((a, b) => a.title.localeCompare(b.title));
    const displayItems = expanded ? sortedChildren : sortedChildren.slice(0, MAX_ITEMS_DISPLAY);

    const handleShowMoreClick = () => {
        if (expanded) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    };

    return (
        <Paper 
            elevation={1} 
            sx={{ 
                mb: 2,
                transition: theme.transitions.create(['box-shadow']),
                '&:hover': {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                },
                borderRadius: isMobile ? 1 : theme.shape.borderRadius
            }}
        >
            <Box sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center',
                borderBottom: 1,
                borderColor: 'divider'
            }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontWeight: 600, 
                        color: 'primary.main',
                        fontSize: isMobile ? 14 : 16,
                        textTransform: 'uppercase',
                        flexGrow: 1
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

            <Stack spacing={0.5} sx={{ p: 1 }}>
                {displayItems.map((item) => (
                    <Box 
                        key={item.uid || item.title}
                        sx={{ 
                            '&:last-child': { mb: 0 }
                        }}
                    >
                        {item.uid ? (
                            <Link 
                                href={`/sponsor-giyim/${gender}/${category.title.replace(' ', '-')}/${item.title.replace(' ', '-')}/${item.uid}`} 
                                passHref 
                                style={{ textDecoration: 'none' }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'text.primary',
                                        cursor: 'pointer',
                                        p: 1.5,
                                        borderRadius: 1,
                                        transition: theme.transitions.create(['background-color', 'color']),
                                        '&:hover': {
                                            bgcolor: theme.palette.action.hover,
                                            '& .MuiTypography-root': {
                                                color: 'primary.main'
                                            },
                                            '& .hover-icon': {
                                                opacity: 1,
                                            }
                                        }
                                    }}
                                >
                                    <Box sx={{ 
                                        mr: 2, 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        color: 'primary.main',
                                        opacity: 0.7
                                    }}>
                                        {getIcon(item.title).component}
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography sx={{ 
                                            fontSize: '0.875rem',
                                            fontWeight: 500
                                        }}>
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ 
                                                fontSize: '0.75rem',
                                                color: 'text.secondary',
                                                opacity: 0.7
                                            }}
                                        >
                                            {item.childrenLength} marka
                                        </Typography>
                                    </Box>
                                    <KeyboardArrowRight 
                                        className="hover-icon"
                                        sx={{ 
                                            opacity: isMobile ? 1 : 0,
                                            color: 'primary.main'
                                        }} 
                                    />
                                </Box>
                            </Link>
                        ) : (
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                p: 1.5,
                                opacity: 0.6
                            }}>
                                <Box sx={{ 
                                    mr: 2, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    color: 'text.secondary' 
                                }}>
                                    {getIcon(item.title).component}
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ 
                                            fontSize: '0.75rem',
                                            color: 'text.secondary',
                                            opacity: 0.7
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
                <Box sx={{ p: 1.5, textAlign: 'center' }}>
                    <Button 
                        fullWidth={isMobile}
                        size='small' 
                        onClick={handleShowMoreClick}
                        color="primary"
                        variant='text'
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
        <Paper 
            elevation={0} 
            sx={{ 
                width: '100%',
                overflow: 'hidden',
                bgcolor: 'background.default'
            }}
        >
            <Box 
                sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider',
                    position: 'sticky',
                    top: 0,
                    bgcolor: 'background.paper',
                    zIndex: 1000
                }}
            >
                <Tabs
                    value={selectedGender}
                    onChange={handleChange}
                    aria-label="gender navigation tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                        '& .MuiTabs-scrollButtons': {
                            '&.Mui-disabled': { opacity: 0.3 }
                        },
                        '& .MuiTab-root': {
                            fontWeight: 600,
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            minWidth: { xs: '100px', sm: '160px' },
                            minHeight: isMobile ? 48 : 56,
                            transition: theme.transitions.create(['background-color', 'color']),
                            '&:hover': {
                                bgcolor: 'action.hover',
                                color: 'primary.main'
                            },
                            '&.Mui-selected': {
                                color: 'primary.main'
                            }
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
            <Fade in={true} timeout={500}>
                <Box sx={{ 
                    p: isMobile ? 1 : 2,
                }}>
                    {filteredNavData[selectedGender] && (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',  // Single column for mobile
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(3, 1fr)',
                                    lg: 'repeat(4, 1fr)',
                                },
                                gap: { xs: 1, sm: 2, md: 3 },
                            }}
                        >
                            {filteredNavData[selectedGender].children.map((category) => (
                                <CategoryNode 
                                    key={category.title} 
                                    gender={filteredNavData[selectedGender].title} 
                                    category={category} 
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Fade>
        </Paper>
    );
};

export default GenderTabbedNavigation;