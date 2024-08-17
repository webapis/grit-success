'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';









export default function PersistentDrawerLeft({ children }) {

    return (
        <Box sx={{ display: 'flex', flexDirection:'column' }}>
            <CssBaseline />
            <AppBar position="static"  style={{ backgroundColor: 'white', zIndex: 500 }} elevation={1} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
               
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon sx={{ color: 'black' }} />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component='a'
                        sx={{
                            // border:'1px solid #bdbdbd',
                            paddingLeft: 2,
                            paddingRight: 2,
                            borderRadius: 5,
                            color: 'black',
                            fontFamily: 'inherit',
                            fontWeight: 500,
                            // fontSize: '1.5rem',
                            // letterSpacing: '0.05em',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                            textDecoration: 'none'
                        }}
                        href={'#'}
                    >
                        Glumzi
                    </Typography>
                </Toolbar>
            </AppBar>

            <>
                {children}
            </>
        </Box>
    );
}


