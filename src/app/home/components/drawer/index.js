'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


import {

    RefinementList
} from 'react-instantsearch';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(1),
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ children }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} style={{ color: '' }}>
                <Toolbar>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" >
                        Glumzi
                    </Typography>

                </Toolbar>
            </AppBar>
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
                <div style={{ padding: 10 }}>
                <Divider sx={{ paddingTop: 2 }} />
                    <Typography variant='h4'>Dizi</Typography>
                    <RefinementList attribute='TVSeriesTitle' operator='or' showMore={true} />
                    <Typography variant='h4'>Oyuncu</Typography>
                    <RefinementList searchable={true} attribute='FullName' showMore={true} translations={{
                        showMoreButtonText({ isShowingMore }) {
                            return isShowingMore ? 'Az göster' : 'Fazla göster';
                        },
                    }} />
                    <Divider sx={{ paddingTop: 2 }} />
                    <Typography variant='h4'>Karakter</Typography>
                    <RefinementList attribute='CaracterName' operator='or' showMore={true} translations={{
                        showMoreButtonText({ isShowingMore }) {
                            return isShowingMore ? 'Az göster' : 'Fazla göster';
                        },
                    }} />

                    <Divider sx={{ paddingTop: 2 }} />
                    <Typography variant='h4'>Kıyafet</Typography>
                    <RefinementList attribute='ProductTitle' operator='or' showMore={true} translations={{
                        showMoreButtonText({ isShowingMore }) {
                            return isShowingMore ? 'Az göster' : 'Fazla göster';
                        },
                    }}/>
                    
                    <Divider sx={{ paddingTop: 2 }} />
                    <Typography variant='h4'>Sezon</Typography>
                    <RefinementList attribute='Season' operator='and' showMore={true} translations={{
                        showMoreButtonText({ isShowingMore }) {
                            return isShowingMore ? 'Az göster' : 'Fazla göster';
                        },
                    }}/>
                    <Divider sx={{ paddingTop: 2 }} />
                    <Typography variant='h4'>Bölüm</Typography>
                    <RefinementList attribute='Episode' operator='or' showMore={true} translations={{
                        showMoreButtonText({ isShowingMore }) {
                            return isShowingMore ? 'Az göster' : 'Fazla göster';
                        },
                    }}/>
                </div>

            </Drawer>
            <Main open={open} style={{padding:3}}>
            {children}
                <DrawerHeader />

               


            </Main>
        </Box>
    );
}