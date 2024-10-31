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
    Tabs,
    Tab,
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

const CategoryItem = ({ category, gender, key }) => {
    const [open, setOpen] = React.useState(false);
    const MAX_ITEMS_DISPLAY = 5;
    debugger
    const sortedChildren = [...category.children].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    return (
        <>
            <ListItem
                disablePadding
                secondaryAction={
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1, minWidth: '3rem' }}>
                        ({category.childrenLength})
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
                <List component="div" disablePadding>
                    {sortedChildren.slice(0, MAX_ITEMS_DISPLAY).map((item) => {
                        debugger
                        return <ListItem
                            key={item.uid || item.title}
                            disablePadding
                            sx={{ pl: 4 }}
                        >
                            {item.uid ? (
                                <Link
                                    href={`/sponsor-giyim/${gender.replace(' ','-').toLowerCase()}/${category.title.replace(' ', '-')}/${item.title}/${item.uid}`}
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
                    })}
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

    const handleGenderChange = (event, selectedGender) => {

        window.location.href = `/sponsor-giyim/${selectedGender}/`;

    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                mb: 2,
                position: 'relative'
            }}>
                <Tabs
                    value={selectedGender}
                    onChange={handleGenderChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                        minHeight: 48,
                        '& .MuiTab-root': {
                            minHeight: 48,
                            minWidth: 'auto',
                            py: 0,
                            px: 2,
                            fontSize: '0.875rem',
                            fontWeight: 'medium',
                            textTransform: 'none',
                            '&.Mui-selected': {
                                color: 'primary.main',
                            },
                        },
                        '& .MuiTabs-scrollButtons': {
                            '&.Mui-disabled': {
                                opacity: 0.3,
                            },
                            '&.MuiTabs-scrollButtons--auto': {
                                display: 'flex',
                            },
                        },
                    }}
                >
                    {navData.map((gender, index) => (
                        <Tab
                            value={gender.title.replace(' ', '-').toLowerCase()}
                            key={gender.title}
                            label={gender.title}
                            id={`gender-tab-${index}`}
                            aria-controls={`gender-tabpanel-${index}`}
                        />
                    ))}
                </Tabs>
            </Box>

            <Box
                role="tabpanel"
                hidden={false}
                id={`gender-tabpanel-${selectedGender}`}
                aria-labelledby={`gender-tab-${selectedGender}`}
            >
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        p: 0
                    }}
                >
                    {navData.find((f => f.title.replace(' ', '-').toLowerCase() === selectedGender))?.children.map((category) => {

                        return <CategoryItem
                            key={category.title}
                            category={category}
                            gender={navData.find((f => f.title.replace(' ', '-').toLowerCase() === selectedGender)).title}
                        />
                    })}
                </List>
            </Box>
        </Box>
    );
};

export default DrawerNavigation;