
// components/navigation/DrawerCategoryItem.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Collapse,
    Typography,
    Divider,
    Box,
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
    ExpandLess,
    ExpandMore,
    KeyboardArrowRight
} from '@mui/icons-material';

const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'dev';
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

export default function CategoryItem({ category, gender }) {
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const MAX_ITEMS_DISPLAY = 5;
    
    const sortedChildren = [...category.children].filter(item => {
        return item.childrenLength >= 5 || isDevelopment;
    }).sort((a,b)=>b.childrenLength-a.childrenLength)
    
    const filteredItems = sortedChildren.filter(item => {
        return item.childrenLength >= 5 || isDevelopment;
    });

    const displayItems = expanded ? filteredItems : filteredItems.slice(0, MAX_ITEMS_DISPLAY);
    
    // Calculate approximate height for the collapsed list
    const itemHeight = 48; // Standard MUI ListItem height
    const containerHeight = (MAX_ITEMS_DISPLAY * itemHeight);

    return (
        <>
            <ListItem
                disablePadding
                secondaryAction={
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1, minWidth: '3rem' }}>
                        ({sortedChildren.length})
                    </Typography>
                }
            >
                <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        {getIcon(category.title)}
                    </ListItemIcon>
                    <ListItemText
                        primary={category.title}
                        primaryTypographyProps={{
                            variant: 'body2',
                            fontWeight: 'medium',
                            noWrap: true
                        }}
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box
                    sx={{
                        height: containerHeight,
                        overflow: expanded ? 'auto' : 'hidden',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: (theme) => theme.palette.divider,
                            borderRadius: '3px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: (theme) => theme.palette.action.hover
                        }
                    }}
                >
                    <List component="div" disablePadding>
                        {displayItems.map((item) => (
                            <ListItem
                                key={item.uid || item.title}
                                disablePadding
                                sx={{ pl: 4 }}
                            >
                                {item.uid ? (
                                    <Link
                                        href={`/sponsor-giyim/${gender.replace(' ', '-').toLowerCase()}/${category.title.replace(' ', '-')}/${item.title.replace(' ', '-')}/${item.title}/${item.uid}`}
                                        style={{ textDecoration: 'none', width: '100%' }}
                                    >
                                        <ListItemButton>
                                            <ListItemText
                                                primary={item.title}
                                                secondary={`${item.childrenLength} marka`}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
                                                    noWrap: true
                                                }}
                                                secondaryTypographyProps={{
                                                    variant: 'caption',
                                                    noWrap: true
                                                }}
                                            />
                                            <KeyboardArrowRight
                                                fontSize="small"
                                                sx={{ opacity: 0.5, ml: 1 }}
                                            />
                                        </ListItemButton>
                                    </Link>
                                ) : (
                                    <ListItemButton disabled>
                                        <ListItemText
                                            primary={item.title}
                                            secondary={`${item.childrenLength} marka`}
                                            primaryTypographyProps={{
                                                variant: 'body2',
                                                noWrap: true
                                            }}
                                            secondaryTypographyProps={{
                                                variant: 'caption',
                                                noWrap: true
                                            }}
                                        />
                                    </ListItemButton>
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {filteredItems.length > MAX_ITEMS_DISPLAY && (
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemButton onClick={() => setExpanded(!expanded)}>
                            <ListItemText
                                primary={expanded ? "Show Less" : "Show More"}
                                primaryTypographyProps={{
                                    variant: 'body2',
                                    color: 'primary'
                                }}
                            />
                            {expanded ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
                        </ListItemButton>
                    </ListItem>
                )}
            </Collapse>
            <Divider />
        </>
    );
}