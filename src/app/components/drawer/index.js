'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import DizivliewListItem from './DiziviewListItem';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        paddingTop: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ children, data=[], title }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = useCallback(() => {
        setOpen(false);
    }, []);

    // Memoize list items to prevent unnecessary re-renders
    const memoizedListItems = useMemo(() => 
        data.map((m, i) => {
            const { href, title } = m;
            return <DizivliewListItem key={i} href={href} title={title} />;
        }),
        [data]
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* <AppBar position="fixed" open={open} style={{ backgroundColor: 'white', zIndex: 500 }} elevation={1}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon sx={{ color: 'black' }} />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component='a'
                        sx={{
                            paddingLeft: 2,
                            paddingRight: 2,
                            borderRadius: 5,
                            color: 'black',
                            fontFamily: 'inherit',
                            fontWeight: 500,
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                            textDecoration: 'none'
                        }}
                        href={'/'}
                    >
                        Glumzi
                    </Typography>
                </Toolbar>
            </AppBar> */}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h5" gutterBottom>{title}</Typography>
                    {memoizedListItems}
                </Box>
            </Drawer>
            <Main open={open}>
                {children}
            </Main>
        </Box>
    );
}