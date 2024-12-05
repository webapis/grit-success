import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Diziview from '@/app/dizikiyafeti/comps/Diziview';
import data from '@/app/dizikiyafeti/page-data/dizikiyafetiMenu.json';
import PersistentDrawerLeft from '@/app/components/drawer';
import getViews from '@/app/utils/firebase/supabase';

// Move data processing outside component
const mappedNavData = Object.entries(data).map(([title, content]) => ({
    title,
    content,
    href: `/dizikiyafeti/${content.tag}-dizi-kiyafetleri`
}));

// Sort data once, outside the component
const sortedNavData = [...mappedNavData].sort((a, b) => b.content.Time - a.content.Time);

// Static styles
const containerStyles = { marginTop: 0 };
const gridContainerStyles = { 
    display: 'flex', 
    justifyContent: 'center' 
};
const gridItemStyles = { xs: 12, md: 3 };

export { mappedNavData };

export default async function Application() {
    const userViewData = await getViews({table:'dizikiyafeti-home'});
    
    return (
        <PersistentDrawerLeft data={mappedNavData} title="Dizi Kıyafeti">
            <Container>
                <Typography 
                    variant='h4' 
                    textAlign='center' 
                    sx={containerStyles}
                >
                    Dizi kıyafetleri
                </Typography>
                
                <Grid 
                    container 
                    gap={1} 
                    sx={gridContainerStyles}
                >
                    {sortedNavData.map((item, i) => (
                        <Grid 
                            key={item.href} 
                            item 
                            {...gridItemStyles}
                        >
                            <Diziview {...item} userViewData={userViewData} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </PersistentDrawerLeft>
    );
}


