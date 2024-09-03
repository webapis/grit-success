'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function BlogBox({ title, description, alt, src, link }) {
    const [expanded, setExpanded] = React.useState(false);
    const [showExpandIcon, setShowExpandIcon] = React.useState(false);
    const descriptionRef = React.useRef(null);

    React.useEffect(() => {
        if (descriptionRef.current) {
            setShowExpandIcon(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
        }
    }, [description]);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 600, display: 'flex' }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <CardMedia
                        sx={{ height: '100%', width: '100%' }}
                        image={src}
                        title={alt}
                        component="img"
                    />
                </Grid>
                <Grid item xs={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Box
                            ref={descriptionRef}
                            sx={{
                                height: expanded ? 'auto' : '3.6em',
                                overflow: 'hidden',
                                transition: 'height 0.3s ease',
                            }}
                        >
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} dangerouslySetInnerHTML={{ __html: description }}>
                             
                            </Typography>
                        </Box>
                        {showExpandIcon && (
                            <IconButton 
                                size="small" 
                                onClick={toggleExpanded} 
                                sx={{ mt: 1 }}
                                aria-label={expanded ? "show less" : "show more"}
                            >
                                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        )}
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small" href={link} component='a'>Benzer Ürünler</Button>
                    </CardActions> */}
                </Grid>
            </Grid>
        </Card>
    );
}
