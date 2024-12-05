import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';

const cardStyles = { 
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#fff',
    position: 'relative',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
        '& .MuiCardMedia-root': {
            transform: 'scale(1.08)'
        },
        '& .card-overlay': {
            opacity: 0.3
        }
    }
};

const mediaStyles = { 
    height: 280,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative'
};

const mediaOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%)',
    transition: 'opacity 0.3s ease',
    opacity: 0.4,
    className: 'card-overlay'
};

const boxStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 2,
    flexWrap: 'wrap',
    gap: 1
};

const titleStyles = { 
    fontWeight: 700,
    fontSize: '1.3rem',
    textTransform: 'capitalize',
    color: 'primary.main',
    marginRight: 1,
    lineHeight: 1.3,
    transition: 'color 0.2s ease',
    '&:hover': {
        color: 'primary.dark'
    }
};

const dateChipStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '16px',
    padding: '4px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    '& .MuiSvgIcon-root': {
        fontSize: '0.9rem'
    }
};

const descriptionStyles = { 
    textTransform: 'capitalize',
    color: 'text.secondary',
    marginBottom: 2.5,
    lineHeight: 1.6,
    fontSize: '0.95rem',
    opacity: 0.85
};

const cardActionsStyles = {
    marginTop: 'auto',
    borderTop: '1px solid',
    borderColor: 'divider',
    padding: 2,
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiButton-root': {
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.9rem',
        padding: '8px 20px',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
            transform: 'translateY(-2px)'
        }
    }
};

const cardContentStyles = {
    padding: 3,
    paddingBottom: 2
};

const Diziview = React.memo(function Diziview({title, content, href, userViewData}) {
    const {ImageUrl, Date, tag} = content;
    
    const imageUrl = React.useMemo(() => 
        `${process.env.NEXT_PUBLIC_IMG_HOST}/dk-image/${ImageUrl}.jpg`,
        [ImageUrl]
    );

    const description = React.useMemo(() => 
        `${title} Dizi Kıyafetleri Oyuncuların Giydiği Kıyafetler.`,
        [title]
    );

    return (
        <Card sx={cardStyles}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    sx={mediaStyles}
                    image={imageUrl}
                    title={description}
                />
                <Box sx={mediaOverlayStyles} />
            </Box>

            <CardContent sx={cardContentStyles}>
                <Box sx={boxStyles}>
                    <Typography sx={titleStyles} variant="h5" component="div">
                        {title}
                    </Typography>
                    <Box sx={dateChipStyles}>
                        <AccessTimeIcon />
                        <Typography variant="caption" fontWeight={500}>
                            {Date}
                        </Typography>
                    </Box>
                </Box>
         
                <Typography sx={descriptionStyles} variant="body2">
                    {description}
                </Typography>

                <ViewCount 
                    rootPath="dizikiyafeti-home" 
                    linkId={href} 
                    userViewData={userViewData} 
                />
            </CardContent>

            <CardActions sx={cardActionsStyles}>
                <ClickableLink 
                    rootPath="dizikiyafeti-home" 
                    clickable={1} 
                    title="sayfaya git" 
                    linkId={href} 
                />
            </CardActions>
        </Card>
    );
});

export default Diziview;
