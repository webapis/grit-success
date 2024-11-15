'use client'

import { createClient } from '@supabase/supabase-js';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { 
  Button, 
  Box, 
  CircularProgress,
  Typography,
  Stack
} from '@mui/material';
import { useState } from 'react';

const supabaseUrl = 'https://pzzrgorwoofzvvrwuyqt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ClickableLink = ({ 
  linkId, 
  title, 
  brand, 
  rootPath, 
  clickable = 0,
  sx = {} 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    try {
      setIsLoading(true);
      await incrementCountByHref(rootPath, linkId);
    } catch (error) {
      console.error('Error handling click:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Brand link style (clickable === 0)
  if (clickable === 0) {
    return (
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="baseline"
        sx={{ 
          color: 'text.primary',
          ...sx
        }}
      >
        {brand && (
          <Typography 
            component="span"
            sx={{ 
              fontWeight: 700, 
              textTransform: 'uppercase',
              color: 'text.secondary'
            }}
          >
            {brand}:
          </Typography>
        )}
        <Box
          component="a"
          href={linkId}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          sx={{
            textTransform: 'capitalize',
            textDecoration: 'none',
            color: 'inherit',
            display: 'inline',
            '&:hover': {
              textDecoration: 'underline',
              color: 'primary.main'
            },
            cursor: isLoading ? 'wait' : 'pointer'
          }}
        >
          {isLoading ? (
            <Stack direction="row" spacing={1} alignItems="center">
          
              <CircularProgress size={12} />
            </Stack>
          ) : (
        ''
          )}
        </Box>
      </Stack>
    );
  }

  // Card overlay style (clickable === 1)
  if (clickable === 1) {
    return (
      <Box
        onClick={handleClick}
        component="a"
        href={linkId}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          cursor: isLoading ? 'wait' : 'pointer',
          textDecoration: 'none',
          color: 'inherit',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx
        }}
      >
        <span className="sr-only">{title}</span>
      </Box>
    );
  }

  // Default button style (clickable === 2 or any other value)
  return (
    <Button
      onClick={handleClick}
      href={linkId}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={isLoading ? <CircularProgress size={16} /> : <OpenInNewIcon />}
      disabled={isLoading}
      sx={{
        textTransform: 'none',
        ...sx
      }}
    >
      {title}
    </Button>
  );
};

const incrementCountByHref = async (table, href) => {
  try {
    const { data, error } = await supabase
      .rpc('inc', { 
        p_x: 1, 
        p_href_id: href, 
        p_table_name: table 
      });

    if (error) {
      console.error('Error incrementing count:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in incrementCountByHref:', error);
    throw error;
  }
};

export default ClickableLink;