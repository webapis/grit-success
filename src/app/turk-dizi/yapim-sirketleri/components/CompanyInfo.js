'use client'
import React from 'react';
import {
  Typography,
  Grid,
  Box,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import Image from 'next/image';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MovieIcon from '@mui/icons-material/Movie';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

const SocialMediaIcon = ({ platform, url }) => {
  const icons = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
  };

  const Icon = icons[platform];

  return Icon ? (
    <IconButton
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${platform} link`}
    >
      <Icon />
    </IconButton>
  ) : null;
};

const CompanyInfo = ({ company, compact = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={compact ? 4 : 3} md={compact ? 3 : 3}>
        <Box sx={{ width: '100%', maxWidth: compact ? 150 : 250, margin: 'auto' }}>
          <img
            src={company.logo}
            alt={company.title}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: compact ? '80px' : 'none',
              objectFit: 'contain'
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={compact ? 8 : 9} md={compact ? 9 : 9}>
        <Typography variant={compact ? (isMobile ? "h6" : "h5") : "h4"} component="h1" gutterBottom>
          {company.title}
        </Typography>
        <Typography variant={compact ? (isMobile ? "body2" : "body1") : "body1"} color={compact ? "text.secondary" : "text.primary"} paragraph>
          {company.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip
            icon={<MovieIcon />}
            label={`${company.tvSeries.length} TV dizisi`}
            color="primary"
            variant="outlined"
          />
          <Tooltip title={`Kurucu: ${company.founder}`} arrow>
            <Chip
              icon={<CalendarTodayIcon />}
              label={`Kuruluş: ${company.establishedYear}`}
              color="secondary"
              variant="outlined"
            />
          </Tooltip>
          <Chip
            icon={<PersonIcon />}
            label={`Kurucu: ${company.founder}`}
            color="info"
            variant="outlined"
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <MuiLink
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
            <Typography variant="body2">
              Siteyi ziyaret et
            </Typography>
          </MuiLink>
          {company.socialMedia && Object.entries(company.socialMedia).map(([platform, url]) => (
            <SocialMediaIcon key={platform} platform={platform} url={url} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CompanyInfo;