'use client'
import React from 'react';
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

const SocialMediaIcon = ({ platform, url }) => {
  const icons = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
  };

  const Icon = icons[platform];

  return Icon ? (
    <Tooltip title={`Visit ${platform}`}>
      <IconButton
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${platform} link`}
        size="small"
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      >
        <Icon fontSize="small" />
      </IconButton>
    </Tooltip>
  ) : null;
};

const CompanyInfo = ({ company }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' }, 
      mb: 2,
      overflow: 'hidden',
      boxShadow: 3,
      borderRadius: 2,
      bgcolor: 'background.paper',
    }}>
      <Box
        sx={{
          width: { xs: '100%', sm: '25%', md: '180px' },
          height: { xs: '160px', sm: '100%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          borderRight: { md: 1 },
          borderBottom: { xs: 1, md: 0 },
          borderColor: 'divider',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: '90%',
            height: '90%',
            objectFit: 'contain',
          }}
          image={`${process.env.NEXT_PUBLIC_IMG_HOST}`+company.logo}
          alt={company.title}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: { xs: 2, sm: 3 } }}>
        <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom fontWeight="bold" color="text.primary">
          {company.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {company.description}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          <Chip
            icon={<MovieIcon />}
            label={`${company.tvSeries.length} TV dizisi`}
            color="primary"
            size="small"
          />
          <Tooltip title={`Kurucu: ${company.founder}`} arrow>
            <Chip
              icon={<CalendarTodayIcon />}
              label={`Kuruluş: ${company.establishedYear}`}
              color="secondary"
              size="small"
            />
          </Tooltip>
          <Chip
            icon={<PersonIcon />}
            label={`Kurucu: ${company.founder}`}
            color="default"
            size="small"
          />
        </Stack>
        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Link
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
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
};

export default CompanyInfo;