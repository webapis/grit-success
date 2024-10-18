import React from 'react';
import { Box, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const NavItem = ({ title, href, totalCount, isActive, onClick, imageUrl }) => (
  <Box
    component="a"
    href={href}
    onClick={(e) => {
     // e.preventDefault();
      onClick();
    }}
    sx={{
      display: 'flex',
      alignItems: 'center',
      padding: 2,
      textDecoration: 'none',
      color: isActive ? 'primary.main' : 'text.primary',
      bgcolor: isActive ? 'action.selected' : 'background.paper',
      '&:hover': {
        bgcolor: 'action.hover',
      },
    
    }}

    target='_blank'
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        overflow: 'hidden',
        marginRight: 2,
        bgcolor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {imageUrl ? (
        <img src={`${process.env.NEXT_PUBLIC_IMG_HOST}`+imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <ImageIcon sx={{ width: 24, height: 24, color: 'grey.400' }} />
      )}
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body2" color="text.secondary">{totalCount} sponsor</Typography>
    </Box>
  </Box>
);

export default NavItem;