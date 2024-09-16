'use client'
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
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

const CompanyInfo = ({ company, compact = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 'auto', objectFit: 'contain' }}
        image={company.logo}
        alt={company.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
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
        </CardContent>
      </Box>
    </Card>
  );
};

export default CompanyInfo;
