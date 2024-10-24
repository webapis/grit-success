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
    Box
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

const CategoryItem = ({ category, gender }) => {
    const [open, setOpen] = React.useState(false);
    const MAX_ITEMS_DISPLAY = 5;

    const sortedChildren = [...category.children].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    return (
        <>
            <ListItem 
                disablePadding
                secondaryAction={
                    <Typography variant="caption" color="text.secondary">
                        ({category.childrenLength})
                    </Typography>
                }
            >
                <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                        {getIcon(category.title)}
                    </ListItemIcon>
                    <ListItemText 
                        primary={category.title}
                        primaryTypographyProps={{
                            variant: 'body2',
                            fontWeight: 'medium'
                        }}
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {sortedChildren.slice(0, MAX_ITEMS_DISPLAY).map((item) => (
                        <ListItem 
                            key={item.uid || item.title} 
                            disablePadding
                            sx={{ pl: 4 }}
                        >
                            {item.uid ? (
                                <Link 
                                    href={`/sponsor-giyim/${gender}/${category.title.replace(' ', '-')}/${item.uid}`}
                                    style={{ textDecoration: 'none', width: '100%' }}
                                >
                                    <ListItemButton>
                                        <ListItemText 
                                            primary={item.title}
                                            secondary={`${item.childrenLength} marka`}
                                            primaryTypographyProps={{
                                                variant: 'body2'
                                            }}
                                            secondaryTypographyProps={{
                                                variant: 'caption'
                                            }}
                                        />
                                        <KeyboardArrowRight 
                                            fontSize="small"
                                            sx={{ opacity: 0.5 }}
                                        />
                                    </ListItemButton>
                                </Link>
                            ) : (
                                <ListItemButton disabled>
                                    <ListItemText 
                                        primary={item.title}
                                        secondary={`${item.childrenLength} marka`}
                                        primaryTypographyProps={{
                                            variant: 'body2'
                                        }}
                                        secondaryTypographyProps={{
                                            variant: 'caption'
                                        }}
                                    />
                                </ListItemButton>
                            )}
                        </ListItem>
                    ))}
                    {sortedChildren.length > MAX_ITEMS_DISPLAY && (
                        <ListItem sx={{ pl: 4 }}>
                            <Link 
                                href={`/sponsor-giyim/${gender}/${category.title.replace(' ', '-')}`}
                                style={{ textDecoration: 'none', width: '100%' }}
                            >
                                <ListItemButton>
                                    <ListItemText 
                                        primary="Show More"
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                            color: 'primary'
                                        }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    )}
                </List>
            </Collapse>
            <Divider />
        </>
    );
};

const DrawerNavigation = ({ navData, selectedGender }) => {
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                p: 0
            }}
        >
            {navData[selectedGender]?.children.map((category) => (
                <CategoryItem 
                    key={category.title} 
                    category={category} 
                    gender={navData[selectedGender].title}
                />
            ))}
        </List>
    );
};

export default DrawerNavigation;