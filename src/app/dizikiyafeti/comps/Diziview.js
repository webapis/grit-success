import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';

// Extract static styles
const cardStyles = { maxWidth: 345 };
const mediaStyles = { height: 170 };
const boxStyles = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between'
};
const dateStyles = { textAlign: 'end', opacity: 0.5 };
const capitalizeStyles = { textTransform: 'capitalize' };

const Diziview = React.memo(function Diziview({title, content, href, userViewData}) {
    const {ImageUrl, Date, tag} = content;
    
    // Memoize the image URL construction
    const imageUrl = React.useMemo(() => 
        `${process.env.NEXT_PUBLIC_IMG_HOST}/dk-image/${ImageUrl}.jpg`,
        [ImageUrl]
    );

    // Memoize the description text
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
                    <Typography variant="h5" component="div" sx={capitalizeStyles}>
                        {title}
                    </Typography>
                    <Typography variant="caption" display="block" sx={dateStyles}>
                        {Date}
                    </Typography>
                </Box>
         
                <Typography variant="body2" color="text.secondary" sx={capitalizeStyles}>
                    {description}
                </Typography>

                <ViewCount rootPath="dizikiyafeti-home" linkId={href} userViewData={userViewData} />
            </CardContent>
            <CardActions>
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
