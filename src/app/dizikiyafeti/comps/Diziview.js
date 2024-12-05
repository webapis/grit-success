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
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }
};

const mediaStyles = { 
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
};

const boxStyles = {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 1
};

const titleStyles = { 
    fontWeight: 600,
    fontSize: '1.1rem',
    textTransform: 'capitalize',
    color: 'primary.main'
};

const dateStyles = { 
    textAlign: 'end', 
    opacity: 0.7,
    fontSize: '0.85rem'
};

const descriptionStyles = { 
    textTransform: 'capitalize',
    color: 'text.secondary',
    marginBottom: 2
};

const cardActionsStyles = {
    marginTop: 'auto',
    borderTop: '1px solid',
    borderColor: 'divider'
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

            <CardContent>
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
