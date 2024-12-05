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

// Enhanced static styles
const containerStyles = { 
    paddingTop: 4,
    paddingBottom: 8
};

const titleStyles = {
    marginBottom: 4,
    fontWeight: 700,
    color: 'primary.main',
    textTransform: 'capitalize',
    letterSpacing: '0.5px'
};

const gridContainerStyles = { 
    display: 'flex', 
    justifyContent: 'center',
    gap: 3  // Increased gap between cards
};

const gridItemStyles = { 
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    display: 'flex'  // This ensures equal height cards
};

export { mappedNavData };

export default async function Application() {
    const userViewData = await getViews({table:'dizikiyafeti-home'});
    
    return (
        <PersistentDrawerLeft data={mappedNavData} title="Dizi Kıyafeti">
            <Container maxWidth="xl" sx={containerStyles}>
                
                <Typography 
                    variant='h4' 
                    textAlign='center' 
                    sx={titleStyles}
                    component="h1"
                >
                    Dizi Kıyafetleri
                </Typography>
                
                <Grid 
                    container 
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
    return (
        <PersistentDrawerLeft data={mappedNavData} title="Dizi Kıyafeti">
            <Container maxWidth="xl" sx={containerStyles}>
                <Box sx={{ mb: 3 }}>
                    <Breadcrumbs 
                        separator="›" 
                        aria-label="breadcrumb"
                        sx={{
                            '& .MuiBreadcrumbs-separator': {
                                mx: 1,
                                color: 'text.secondary'
                            }
                        }}
                    >
                        <Link 
                            underline="hover" 
                            color="inherit" 
                            href="/"
                            sx={{ 
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                            Ana Sayfa
                        </Link>
                        <Typography 
                            color="text.primary"
                            sx={{ 
                                fontWeight: 500
                            }}
                        >
                            Dizi Kıyafetleri
                        </Typography>
                    </Breadcrumbs>
                </Box>

                <Typography 
                    variant='h4' 
                    textAlign='center' 
                    sx={titleStyles}
                    component="h1"
                >
                    Dizi Kıyafetleri
                </Typography>
                
                <Grid 
                    container 
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


