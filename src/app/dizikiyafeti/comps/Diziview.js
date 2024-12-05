import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';

const cardStyles = { 
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease-in-out',
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        '& .MuiCardMedia-root': {
            transform: 'scale(1.05)'
        }
    }
};

const mediaStyles = { 
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    transition: 'transform 0.3s ease-in-out'
};

const boxStyles = {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 1.5,
    flexWrap: 'wrap'
};

const titleStyles = { 
    fontWeight: 700,
    fontSize: '1.2rem',
    textTransform: 'capitalize',
    color: 'primary.main',
    marginRight: 1,
    lineHeight: 1.3
};

const dateStyles = { 
    textAlign: 'end', 
    opacity: 0.7,
    fontSize: '0.85rem',
    color: 'text.secondary',
    fontWeight: 500
};

const descriptionStyles = { 
    textTransform: 'capitalize',
    color: 'text.secondary',
    marginBottom: 2,
    lineHeight: 1.6,
    fontSize: '0.95rem'
};

const cardActionsStyles = {
    marginTop: 'auto',
    borderTop: '1px solid',
    borderColor: 'divider',
    padding: 2,
    '& .MuiButton-root': {
        borderRadius: 6,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.9rem',
        '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white'
        }
    }
};

const cardContentStyles = {
    padding: 2.5
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
            <CardMedia
                sx={mediaStyles}
                image={imageUrl}
                title={description}
            />

            <CardContent sx={cardContentStyles}>
                <Box sx={boxStyles}>
                    <Typography sx={titleStyles} variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography sx={dateStyles} variant="caption" display="block">
                        {Date}
                    </Typography>
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
