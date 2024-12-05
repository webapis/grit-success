'use client'
import React, { memo } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Link,
  IconButton,
  Chip,
  Tooltip,
  useMediaQuery,
  useTheme,
  Stack,
  Skeleton,
} from '@mui/material';
import {
  Language as LanguageIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Movie as MovieIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

// Memoize SocialMediaIcon component since it's pure
const SocialMediaIcon = memo(({ platform, url }) => {
  const icons = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
  };

  const Icon = icons[platform];

  return Icon ? (
    <Tooltip title={`Visit ${platform}`} placement="top">
      <IconButton
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${platform} link`}
        size="small"
        sx={{
          color: 'text.secondary',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { 
            color: 'primary.main',
            transform: 'scale(1.1)',
          }
        }}
      >
        <Icon fontSize="small" />
      </IconButton>
    </Tooltip>
  ) : null;
});

SocialMediaIcon.displayName = 'SocialMediaIcon';

const CompanyInfo = memo(({ company }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' }, 
      mb: 2,
      overflow: 'hidden',
      boxShadow: theme.shadows[3],
      borderRadius: 2,
      bgcolor: 'background.paper',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[6],
      }
    }}>
      <Box
        sx={{
          width: { xs: '100%', sm: '25%', md: '200px' },
          height: { xs: '180px', sm: '100%' },
          position: 'relative',
          bgcolor: 'background.default',
          borderRight: { md: 1 },
          borderBottom: { xs: 1, md: 0 },
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          image={`${process.env.NEXT_PUBLIC_IMG_HOST}${company.logo}`}
          alt={company.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '8px',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          loading="lazy"
        />
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        p: { xs: 2.5, sm: 3 },
        gap: 2 
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          fontWeight="bold" 
          color="text.primary"
          sx={{ 
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            width: 'fit-content'
          }}
        >
          {company.title}
        </Typography>

        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            lineHeight: 1.7,
            maxWidth: '800px' 
          }}
        >
          {company.description}
        </Typography>

        <Stack 
          direction="row" 
          spacing={1.5} 
          flexWrap="wrap" 
          useFlexGap 
          sx={{ mb: 1 }}
        >
          <Chip
            icon={<MovieIcon />}
            label={`${company.tvSeries.length} TV dizisi`}
            color="primary"
            size="small"
            sx={{ 
              fontWeight: 500,
              '&:hover': { transform: 'scale(1.05)' },
              transition: 'transform 0.2s ease'
            }}
          />
          <Tooltip title={`Kurucu: ${company.founder}`} arrow>
            <Chip
              icon={<CalendarTodayIcon />}
              label={`Kuruluş: ${company.establishedYear}`}
              color="secondary"
              size="small"
              sx={{ 
                fontWeight: 500,
                '&:hover': { transform: 'scale(1.05)' },
                transition: 'transform 0.2s ease'
              }}
            />
          </Tooltip>
          <Chip
            icon={<PersonIcon />}
            label={`Kurucu: ${company.founder}`}
            color="default"
            size="small"
            sx={{ 
              fontWeight: 500,
              '&:hover': { transform: 'scale(1.05)' },
              transition: 'transform 0.2s ease'
            }}
          />
        </Stack>

        <Box sx={{ 
          mt: 'auto', 
          display: 'flex', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 1.5,
          pt: 2,
          borderTop: 1,
          borderColor: 'divider'
        }}>
          <Link
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'primary.main',
              textDecoration: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                color: 'primary.dark',
              },
            }}
          >
            <LanguageIcon sx={{ mr: 0.5, fontSize: 'small' }} />
            <Typography variant="body2" fontWeight="medium">
              Siteyi ziyaret et
            </Typography>
          </Link>
          {company.socialMedia && Object.entries(company.socialMedia).map(([platform, url]) => (
            <SocialMediaIcon key={platform} platform={platform} url={url} />
          ))}
        </Box>
      </Box>
    </Card>
  );
});

CompanyInfo.displayName = 'CompanyInfo';

export default CompanyInfo;