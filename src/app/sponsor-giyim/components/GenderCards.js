'use client'
import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Container,
    CardActionArea
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Image from 'next/image';
import genderData from './genderData'



// Styled components for custom styles
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}));

const ImageWrapper = styled('div')({
    position: 'relative',
    width: '100%',
    paddingTop: '62.5%', // 16:10 aspect ratio
    overflow: 'hidden',
});

// Individual card component
const GenderCard = ({ item }) => {
    return (
        <Link href={item.url} passHref style={{ textDecoration: 'none' }}>
            <StyledCard elevation={2}>
                <CardActionArea>
                    <ImageWrapper>
                        <Image
                            src={item.imageSrc}
                            alt={item.gender}
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                            style={{
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                            priority={item.index < 4} // Load first 4 images immediately
                        />
                    </ImageWrapper>
                    <CardContent>
                        <Typography
                            variant="h6"
                            component="h3"
                            gutterBottom
                            sx={{ fontWeight: 'medium' }}
                        >
                            {item.gender}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                            }}
                        >
                            Kategoriye Git →
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </StyledCard>
        </Link>
    );
};

// Main component
const GenderCards = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {genderData.map((item) => (
                    <Grid
                        item
                        xs={4}
                        sm={4}
                        md={3}
                        key={item.index}
                        sx={{ display: 'flex' }}
                    >
                        <GenderCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default GenderCards;