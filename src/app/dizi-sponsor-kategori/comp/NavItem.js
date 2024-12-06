import React, { memo, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

// Move styles outside component to prevent recreation
const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: 2,
  textDecoration: 'none',
  '&:hover': {
    bgcolor: 'action.hover',
  },
};

const imageContainerStyles = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  overflow: 'hidden',
  marginRight: 2,
  bgcolor: 'grey.200',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const imageStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const NavItem = memo(({ title, href, totalCount, isActive, onClick, imageUrl }) => {
  // Memoize click handler
  const handleClick = useCallback((e) => {
    onClick();
  }, [onClick]);

  return (
    <Box
      component="a"
      href={href}
      onClick={handleClick}
      sx={{
        ...containerStyles,
        color: isActive ? 'primary.main' : 'text.primary',
        bgcolor: isActive ? 'action.selected' : 'background.paper',
      }}
      target="_blank"
      rel="noopener noreferrer" // Security best practice for target="_blank"
    >
      <Box sx={imageContainerStyles}>
        {imageUrl ? (
          <img 
            src={`${process.env.NEXT_PUBLIC_IMG_HOST}${imageUrl}`}
            alt={title}
            style={imageStyles}
            loading="lazy" // Lazy load images
            decoding="async" // Optimize image decoding
          />
        ) : (
          <ImageIcon sx={{ width: 24, height: 24, color: 'grey.400' }} />
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {totalCount} sponsor
        </Typography>
      </Box>
    </Box>
  );
});

// Add display name for debugging
NavItem.displayName = 'NavItem';

export default NavItem;