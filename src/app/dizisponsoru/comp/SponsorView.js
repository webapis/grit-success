'use client'
import * as React from 'react';
import { 
  Card, 
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ClickableLink from './ClickableLinkResponsive';
import ViewCount from './ViewCount';

export default function SponsorView({ title, content, href, userViewData }) {
  const { tag, toplamSponsor, Tag, Year } = content;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card 
      sx={{ 
        display: 'flex',
        height: { xs: '120px', sm: '140px' },
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          bgcolor: 'action.hover',
          transform: 'translateY(-2px)',
          boxShadow: (theme) => theme.shadows[4],
          '& .hover-icon': {
            opacity: 1
          }
        }
      }}
    >
      {/* Left side image with its own clickable area */}
      <Box
        sx={{ 
          position: 'relative',
          width: { xs: '96px', sm: '140px' },
          '&:hover': {
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.2s'
            }
          }
        }}
      >
        <CardMedia
          component="img"
          sx={{ 
            height: '100%',
            objectFit: 'cover',
            transition: 'all 0.2s ease-in-out'
          }}
          image={`${process.env.NEXT_PUBLIC_IMG_HOST}/dizi-image/${Tag}.jpg`}
          alt={`${title} Dizi Sponsorları`}
        />
        <ClickableLink 
          rootPath="dizisponsoru-home"
          clickable={1}
          linkId={href}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2
          }}
        />
      </Box>

      {/* Right side content */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        flex: 1,
        p: { xs: 1.5, sm: 2 },
        position: 'relative'
      }}>
        <CardContent sx={{ 
          flex: '1 0 auto', 
          p: 0,
          '&:last-child': { pb: 0 }
        }}>
          {/* Header with title and year */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 0.5,
            gap: 1
          }}>
            {/* Title */}
            <Typography 
              component="h2" 
              sx={{ 
                fontSize: { xs: '0.95rem', sm: '1.15rem' },
                fontWeight: 600,
                lineHeight: 1.2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textTransform: 'capitalize',
                flex: 1,
              }}
            >
              {title}
            </Typography>

            {/* Year */}
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                opacity: 0.8,
                whiteSpace: 'nowrap',
                pt: 0.5
              }}
            >
              {Year}
            </Typography>
          </Box>

          {/* Series Type */}
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              textTransform: 'capitalize',
              mb: 0.5
            }}
          >
            Dizi Sponsorları
          </Typography>

          {/* Sponsor Count */}
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              display: 'block',
              mb: 1
            }}
          >
            Sponsor sayısı: {toplamSponsor}
          </Typography>

          {/* Footer with view count */}
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            pr: { xs: 1.5, sm: 2 }
          }}>
            <ViewCount 
              rootPath="dizisponsoru-home" 
              linkId={href} 
              userViewData={userViewData}
            />
            
            <OpenInNewIcon 
              className="hover-icon"
              sx={{
                fontSize: '1rem',
                opacity: 0,
                transition: 'opacity 0.2s ease-in-out',
                color: 'text.secondary'
              }}
            />
          </Box>
        </CardContent>

        {/* Main content clickable overlay */}
        <ClickableLink 
          rootPath="dizisponsoru-home"
          clickable={1}
          linkId={href}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
          }}
        />
      </Box>
    </Card>
  );
}