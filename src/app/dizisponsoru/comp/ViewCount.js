import React from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ViewCount = ({ linkId, userViewData }) => {
  const viewCount = userViewData && 
    userViewData['data'].find(f => f.href.includes(linkId));

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        pl: { xs: 1.5, sm: 2 },
        py: 0.5
      }}
    >
      <Button 
        disabled
        size="small"
        sx={{
          p: 0.5,
          minWidth: 'auto',
          '&.Mui-disabled': {
            color: 'text.secondary',
            opacity: 0.8
          },
          '& .MuiButton-startIcon': {
            margin: 0,
            marginRight: '4px',
            display: 'flex',
            alignItems: 'center'
          }
        }}
        startIcon={
          <VisibilityIcon 
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' },
              display: 'flex'
            }} 
          />
        }
      >
        <Typography 
          variant="body2" 
          component="span"
          sx={{ 
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {viewCount && viewCount.count}
        </Typography>
      </Button>
    </Box>
  );
};

export default ViewCount;