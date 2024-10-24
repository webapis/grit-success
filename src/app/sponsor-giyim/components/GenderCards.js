import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const data = [
    { gender: 'Kadın',urlGender:'kadın', index: 0, url: '/sponsor-giyim/kadın/', imageSrc: '/gender/kadin.jpg' },
    { gender: 'Erkek',urlGender:'erkek',  index: 2, url: '/sponsor-giyim/erkek/', imageSrc: '/gender/erkek.jpg' },
    { gender: 'Kız Çocuk',urlGender:'kız-çocuk',  index: 3, url: '/sponsor-giyim/kız-çocuk/', imageSrc: '/gender/kiz-cocuk.jpg' },
    { gender: 'Erkek Bebek',urlGender:'erkek-bebek',  index: 4, url: '/sponsor-giyim/erkek-bebek/', imageSrc: '/gender/erkek-bebek.jpg' },
    { gender: 'Kız Bebek',urlGender:'kız-bebek',  index: 5, url: '/sponsor-giyim/kız-bebek/', imageSrc: '/gender/kiz-bebek.jpg' },
    { gender: 'Genç',urlGender:'genc',  index: 6, url: '/sponsor-giyim/genc/', imageSrc: '/gender/genc.jpg' },
    { gender: 'Unisex',urlGender:'unisex',  index: 1, url: '/sponsor-giyim/unisex/', imageSrc: '/gender/unisex.jpg' },
    { gender: 'Unrelated',urlGender:'unrelated',  index: 8, url: '/sponsor-giyim/unrelated/', imageSrc: '/gender/unrelated.jpg' },
];

export { data }

const GenderCards = () => {
    return (
        <Grid container spacing={2}>
            {data.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.imageSrc}
                            alt={item.gender}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {item.gender}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <a href={item.url}>More Info</a>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default GenderCards;