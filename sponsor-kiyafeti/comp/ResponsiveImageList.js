'use client'
import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Image from './Image';
const ResponsiveImageList = ({ data, slugObj }) => {
    const theme = useTheme();
    const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.down('md'));
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

    // Determine the number of columns based on screen size
    let cols;
    if (isXSmall) {
        cols = 1;
    } else if (isSmall) {
        cols = 2;
    } else if (isMedium) {
        cols = 3;
    } else if (isLarge) {
        cols = 5;
    } else {
        cols = 3; // default value for other sizes
    }

    return (
        <ImageList cols={cols} variant="masonry">
            {data.map((m, i) => (
                <ImageListItem key={i}>
                    <Image matchingCategories={[...slugObj.keywords, ...slugObj.positives.flat(), ...slugObj.words]} {...m} subcat={''} />
                </ImageListItem>
            ))}
        </ImageList>
    );
};


export default ResponsiveImageList