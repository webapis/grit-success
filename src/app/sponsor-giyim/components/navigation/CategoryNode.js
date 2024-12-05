'use client'
import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Box,
    Typography,
    useTheme,
    Paper,
    Button,
    useMediaQuery,
    Badge,
    Stack,
    CircularProgress
} from '@mui/material';
import {
    KeyboardArrowRight,
    KeyboardArrowDown,
} from '@mui/icons-material';
import { getIcon } from './iconMapping'; // Move icon mapping to separate file

const styles = {
    paper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
            boxShadow: 3
        }
    },
    header: {
        p: { xs: 1.5, sm: 2 },
        borderBottom: 1,
        borderColor: 'divider'
    },
    headerTitle: {
        fontWeight: 600,
        color: 'primary.main',
        fontSize: { xs: 14, sm: 16 },
        textTransform: 'uppercase'
    },
    badge: {
        '& .MuiBadge-badge': {
            fontSize: '0.6rem',
            fontWeight: 600
        }
    },
    itemList: (theme, expanded, containerHeight) => ({
        flexGrow: 1,
        width: '100%',
        height: containerHeight,
        overflow: expanded ? 'auto' : 'hidden',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-track': {
            background: theme.palette.background.default
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.divider,
            borderRadius: '4px',
            '&:hover': {
                background: theme.palette.action.hover
            }
        }
    }),
    itemContainer: (loading, isActive, theme) => ({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        p: { xs: 1.5, sm: 2 },
        color: 'text.primary',
        bgcolor: loading && isActive ? 'action.selected' : 'inherit',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            bgcolor: 'action.hover',
            transform: 'translateX(4px)'
        },
        '&:active': {
            bgcolor: 'action.selected'
        }
    })
};

const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'dev';

export default function CategoryNode({ category, gender }) {
    const theme = useTheme();
    const router = useRouter();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState(null);

    const MAX_ITEMS_DISPLAY = isMobile ? 4 : isTablet ? 4 : 5;
    
    const sortedChildren = useMemo(() => 
        [...category.children]
            .filter(item => item.childrenLength >= 5 || isDevelopment)
            .sort((a, b) => b.childrenLength - a.childrenLength),
        [category.children]
    );

    const displayItems = useMemo(() => 
        expanded ? sortedChildren : sortedChildren.slice(0, MAX_ITEMS_DISPLAY),
        [expanded, sortedChildren, MAX_ITEMS_DISPLAY]
    );

    const itemHeight = isMobile ? 72 : 88;
    const containerHeight = MAX_ITEMS_DISPLAY * itemHeight;

    const handleClick = useCallback((e, item) => {
        e.preventDefault();
        setLoading(true);
        setActiveItem(item.uid);
        const url = `/sponsor-giyim/${gender.replace(' ', '-').toLowerCase()}/${category.title.replace(' ', '-')}/${item.title.replace(' ', '-')}/${item.uid}`;
        router.push(url);
    }, [gender, category.title, router]);

    const renderItem = useCallback((item) => {
        const isActive = activeItem === item.uid;
        
        if (!item.uid) {
            return (
                <Box sx={{ ...styles.itemContainer(false, false, theme), opacity: 0.6 }}>
                    {/* ... inactive item content ... */}
                </Box>
            );
        }

        return (
            <Link
                href={`/sponsor-giyim/${gender.replace(' ', '-').toLowerCase()}/${category.title.replace(' ', '-')}/${item.title.replace(' ', '-')}/${item.uid}`}
                onClick={(e) => handleClick(e, item)}
                style={{ textDecoration: 'none', display: 'block', width: '100%' }}
            >
                <Box sx={styles.itemContainer(loading, isActive, theme)}>
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
                    {loading && isActive ? (
                        <CircularProgress
                            size={20}
                            sx={{
                                ml: { xs: 0.5, sm: 1 },
                                color: 'primary.main'
                            }}
                        />
                    ) : (
                        <KeyboardArrowRight
                            sx={{
                                ml: { xs: 0.5, sm: 1 },
                                fontSize: { xs: 18, sm: 20 },
                                color: 'primary.main',
                                flexShrink: 0
                            }}
                        />
                    )}
                </Box>
            </Link>
        );
    }, [loading, activeItem, handleClick, gender, category.title, theme]);

    return (
        <Paper elevation={1} sx={styles.paper}>
            <Box sx={styles.header}>
                <Typography variant="h6" sx={styles.headerTitle}>
                    <Badge
                        badgeContent={sortedChildren.length}
                        color="primary"
                        sx={styles.badge}
                    >
                        {category.title}
                    </Badge>
                </Typography>
            </Box>

            <Stack spacing={0.5} sx={styles.itemList(theme, expanded, containerHeight)}>
                {displayItems.map((item) => (
                    <Box key={item.uid || item.title} sx={{ width: '100%', flexShrink: 0 }}>
                        {renderItem(item)}
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
                            fontSize: '0.75rem',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        {expanded ? 'Show Less' : `Show ${sortedChildren.length - MAX_ITEMS_DISPLAY} More`}
                    </Button>
                </Box>
            )}
        </Paper>
    );
}