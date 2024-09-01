'use client'

import React from 'react';

import ProductCard from "../components/blog/ProductCard";
import { ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';


export default function PageContainer({ orderedData}) {


    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const isLg = useMediaQuery(theme.breakpoints.down('lg'));

    const getCols = () => {
        if (isXs) return 1;
        if (isSm) return 2;
        if (isMd) return 3;
        if (isLg) return 4;
        return 5; // Default for extra large screens
    };

    return (
        <ImageList variant="masonry" cols={getCols()} gap={8}>
            {orderedData.map((m, i) => (
                <ImageListItem key={i}>
                    <ProductCard product={m} />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
