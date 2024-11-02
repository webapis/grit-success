'use client'
import React from 'react';
import Link from 'next/link';
import {
    Box,
    Typography,
    useTheme,
    Paper,
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

const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'dev';

export default function CategoryNode({ category, gender }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [expanded, setExpanded] = React.useState(false);

    const MAX_ITEMS_DISPLAY = isMobile ? 4 : isTablet ? 4 : 5;
    const sortedChildren = [...category.children].filter(item => {
        return item.childrenLength >= 5 || isDevelopment;
    }).sort((a,b)=>b.childrenLength-a.childrenLength);
    const displayItems = expanded ? sortedChildren : sortedChildren.slice(0, MAX_ITEMS_DISPLAY);

    // Calculate approximate height based on item count and padding
    const itemHeight = isMobile ? 72 : 88; // Adjusted for padding and content
    const containerHeight = (MAX_ITEMS_DISPLAY * itemHeight);

    return (
        <Paper
            elevation={1}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                overflow: 'hidden'
            }}
        >
            <Box sx={{
                p: { xs: 1.5, sm: 2 },
                borderBottom: 1,
                borderColor: 'divider'
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: 'primary.main',
                        fontSize: { xs: 14, sm: 16 },
                        textTransform: 'uppercase'
                    }}
                >
                    <Badge
                        badgeContent={sortedChildren.length}
                        color="primary"
                        sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}
                    >
                        {category.title}
                    </Badge>
                </Typography>
            </Box>

            <Stack 
                spacing={0.5} 
                sx={{ 
                    flexGrow: 1,
                    width: '100%',
                    height: containerHeight,
                    overflow: expanded ? 'auto' : 'hidden',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: theme.palette.background.default
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: theme.palette.divider,
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: theme.palette.action.hover
                    }
                }}
            >
                {displayItems.map((item) => (
                    <Box
                        key={item.uid || item.title}
                        sx={{ width: '100%', flexShrink: 0 }}
                    >
                        {item.uid ? (
                            <Link
                                href={`/sponsor-giyim/${gender.replace(' ', '-').toLowerCase()}/${category.title.replace(' ', '-')}/${item.title.replace(' ', '-')}/${item.uid}`}
                                passHref
                                style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        p: { xs: 1.5, sm: 2 },
                                        color: 'text.primary',
                                        '&:hover': {
                                            bgcolor: 'action.hover'
                                        },
                                        '&:active': {
                                            bgcolor: 'action.selected'
                                        }
                                    }}
                                >
                                    <Box sx={{
                                        minWidth: { xs: 20, sm: 24 },
                                        mr: { xs: 1.5, sm: 2 },
                                        color: 'primary.main',
                                        opacity: 0.7,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        {getIcon(item.title)}
                                    </Box>
                                    <Box sx={{
                                        flexGrow: 1,
                                        minWidth: 0,
                                        overflow: 'hidden'
                                    }}>
                                        <Typography
                                            noWrap
                                            sx={{
                                                fontSize: { xs: '0.813rem', sm: '0.875rem' },
                                                fontWeight: 500
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            noWrap
                                            variant="body2"
                                            sx={{
                                                fontSize: { xs: '0.75rem', sm: '0.75rem' },
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {item.childrenLength} marka
                                        </Typography>
                                    </Box>
                                    <KeyboardArrowRight
                                        sx={{
                                            ml: { xs: 0.5, sm: 1 },
                                            fontSize: { xs: 18, sm: 20 },
                                            color: 'primary.main',
                                            flexShrink: 0
                                        }}
                                    />
                                </Box>
                            </Link>
                        ) : (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: { xs: 1.5, sm: 2 },
                                opacity: 0.6,
                                width: '100%'
                            }}>
                                <Box sx={{
                                    minWidth: { xs: 20, sm: 24 },
                                    mr: { xs: 1.5, sm: 2 },
                                    color: 'text.secondary',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    {getIcon(item.title)}
                                </Box>
                                <Box sx={{
                                    flexGrow: 1,
                                    minWidth: 0,
                                    overflow: 'hidden'
                                }}>
                                    <Typography
                                        noWrap
                                        color="text.secondary"
                                        sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        noWrap
                                        variant="body2"
                                        sx={{
                                            fontSize: { xs: '0.75rem', sm: '0.75rem' },
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
                <Box sx={{ p: { xs: 1.5, sm: 2 }, mt: 'auto' }}>
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
}