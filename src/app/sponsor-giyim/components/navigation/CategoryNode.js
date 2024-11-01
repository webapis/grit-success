// components/navigation/CategoryNode.jsx
'use client';

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

export default function CategoryNode({ category, gender }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [expanded, setExpanded] = React.useState(false);

    const MAX_ITEMS_DISPLAY = isMobile ? 3 : isTablet ? 4 : 5;
    const sortedChildren = [...category.children].sort((a, b) => a.title.localeCompare(b.title));
    const displayItems = expanded ? sortedChildren : sortedChildren.slice(0, MAX_ITEMS_DISPLAY);

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
                        badgeContent={category.children.length}
                        color="primary"
                        sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}
                    >
                        {category.title}
                    </Badge>
                </Typography>
            </Box>

            <Stack spacing={0.5} sx={{ flexGrow: 1, width: '100%' }}>
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