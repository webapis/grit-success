'use client'
import React, { useMemo, useCallback, memo } from 'react';
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
    CircularProgress,
    Fade,
    Tooltip
} from '@mui/material';
import {
    KeyboardArrowRight,
    KeyboardArrowDown,
} from '@mui/icons-material';
import { getIcon } from './iconMapping';

const styles = {
    paper: (theme) => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: theme.shape.borderRadius * 1.5,
        '&:hover': {
            boxShadow: theme.shadows[4],
            transform: 'translateY(-2px)'
        }
    }),
    header: (theme) => ({
        p: { xs: 1.5, sm: 2 },
        borderBottom: 1,
        borderColor: 'divider',
        background: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    headerTitle: {
        fontWeight: 700,
        color: 'primary.main',
        fontSize: { xs: 14, sm: 16 },
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    badge: (theme) => ({
        '& .MuiBadge-badge': {
            fontSize: '0.6rem',
            fontWeight: 600,
            minWidth: '20px',
            height: '20px',
            padding: '0 6px',
            borderRadius: '10px'
        }
    }),
    itemList: (theme, expanded, containerHeight) => ({
        flexGrow: 1,
        width: '100%',
        height: containerHeight,
        overflow: expanded ? 'auto' : 'hidden',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
            width: '4px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent'
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
        bgcolor: loading && isActive ? 'action.selected' : 'transparent',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: theme.shape.borderRadius,
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            width: '3px',
            height: '0%',
            background: theme.palette.primary.main,
            transition: 'height 0.2s ease',
        },
        '&:hover': {
            bgcolor: 'action.hover',
            transform: 'translateX(4px)',
            '&::before': {
                height: '100%',
            }
        },
        '&:active': {
            bgcolor: 'action.selected'
        }
    }),
    showMoreButton: (theme) => ({
        textTransform: 'none',
        fontSize: '0.75rem',
        borderRadius: theme.shape.borderRadius * 1.5,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        py: 1,
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[2]
        }
    })
};

const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'dev';

const CategoryItem = memo(({ item, loading, isActive, onClick, gender, categoryTitle, theme }) => (
    <Tooltip title={`${item.childrenLength} products`} placement="left" arrow>
        <Link
            href={`/sponsor-giyim/${gender.replace(' ', '-').toLowerCase()}/${categoryTitle.replace(' ', '-')}/${item.title.replace(' ', '-')}/${item.uid}`}
            onClick={(e) => onClick(e, item)}
            style={{ textDecoration: 'none', display: 'block', width: '100%' }}
        >
            <Fade in timeout={300}>
                <Box sx={styles.itemContainer(loading, isActive, theme)}>
                    <Box sx={{
                        minWidth: { xs: 24, sm: 28 },
                        mr: { xs: 1.5, sm: 2 },
                        color: 'primary.main',
                        opacity: 0.8,
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
                                fontSize: { xs: '0.875rem', sm: '0.925rem' },
                                fontWeight: 500,
                                letterSpacing: '0.2px'
                            }}
                        >
                            {item.title}
                        </Typography>
                        <Typography
                            noWrap
                            variant="body2"
                            sx={{
                                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                color: 'text.secondary',
                                mt: 0.5
                            }}
                        >
                            {item.childrenLength} products available
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
                                flexShrink: 0,
                                transition: 'transform 0.2s',
                                transform: isActive ? 'translateX(4px)' : 'none'
                            }}
                        />
                    )}
                </Box>
            </Fade>
        </Link>
    </Tooltip>
));

CategoryItem.displayName = 'CategoryItem';

const CategoryNode = memo(({ category, gender }) => {
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

    return (
        <Paper elevation={1} sx={styles.paper(theme)}>
            <Box sx={styles.header(theme)}>
                <Typography variant="h6" sx={styles.headerTitle}>
                    <Badge
                        badgeContent={sortedChildren.length}
                        color="primary"
                        sx={styles.badge(theme)}
                    >
                        {category.title}
                    </Badge>
                </Typography>
            </Box>

            <Stack spacing={0.5} sx={styles.itemList(theme, expanded, containerHeight)}>
                {displayItems.map((item) => (
                    <CategoryItem
                        key={item.uid || item.title}
                        item={item}
                        loading={loading}
                        isActive={activeItem === item.uid}
                        onClick={handleClick}
                        gender={gender}
                        categoryTitle={category.title}
                        theme={theme}
                    />
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
                        sx={styles.showMoreButton(theme)}
                    >
                        {expanded ? 'Show Less' : `Show ${sortedChildren.length - MAX_ITEMS_DISPLAY} More`}
                    </Button>
                </Box>
            )}
        </Paper>
    );
});

CategoryNode.displayName = 'CategoryNode';

export default CategoryNode;