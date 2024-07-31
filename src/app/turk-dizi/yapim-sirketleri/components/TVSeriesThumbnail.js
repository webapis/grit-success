import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Chip,
  Tooltip,
  Popper,
  Paper,
  ClickAwayListener,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const TVSeriesThumbnail = ({ series, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const getStateColor = (state) => {
    switch (state) {
      case 'Devam ediyor':
        return '#4caf50';
      case 'Sezon arası':
        return '#ff9800';
      case 'Sona erdi':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const hasWatchOptions = series.watchOptions && series.watchOptions.length > 0;

  return (
    <Card 
    elevation={0}
      sx={{ 
        width: isMobile ? 130 : 160, 
        mr: 2, 
        flexShrink: 0,
        mb: 1,
        display: 'flex',
        flexDirection: 'column',
      }} 
      id={series.sha}
    >
      <Box 
        sx={{ position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMenuOpen(false);
        }}
      >
        <CardMedia
          component="img"
          height={isMobile ? 195 : 240}
          image={series.thumbnail}
          alt={series.title}
          sx={{ objectFit: 'cover' }}
        />
        {isHovered && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 1,
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: getStateColor(series.state), fontWeight: 'bold' }}>
                {series.state}
              </Typography>
              <Typography variant="caption" color="white" display="block">
                {series.year}
              </Typography>
              <Typography variant="caption" color="white" display="block">
                Son Bölüm: {series.lastEpisode}
              </Typography>
              {series.productionCompanies && (
                <Tooltip title={series.productionCompanies.join(', ')} enterDelay={500} leaveDelay={200}>
                  <Typography variant="caption" color="white" display="block" noWrap>
                    Yapım: {series.productionCompanies.join(', ')}
                  </Typography>
                </Tooltip>
              )}
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {series.genres && series.genres.map((genre, index) => (
                  <Chip
                    key={index}
                    label={genre}
                    size="small"
                    sx={{
                      fontSize: '0.6rem',
                      height: 'auto',
                      '& .MuiChip-label': {
                        padding: '2px 4px',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              size="small"
              fullWidth
              onClick={handleClick}
              sx={{ fontSize: '0.8rem', mt: 1 }}
              disabled={!hasWatchOptions}
            >
              İzle
            </Button>
            <Popper open={menuOpen} anchorEl={anchorEl} placement="top" style={{ zIndex: 1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <Paper>
                  {hasWatchOptions && series.watchOptions.map((option, index) => (
                    <MenuItem 
                      key={index} 
                      onClick={() => {
                        window.open(option.url, '_blank');
                        handleClose();
                      }}
                    >
                      <img 
                        src={option.logo} 
                        alt={option.name}
                        style={{ width: '20px', marginRight: '8px' }}
                      />
                      {option.name}
                    </MenuItem>
                  ))}
                </Paper>
              </ClickAwayListener>
            </Popper>
          </Box>
        )}
      </Box>
      <CardContent sx={{ p: 1, pt: 0.5 }}>
        <Tooltip title={series.title} enterDelay={500} leaveDelay={200}>
          <Typography variant={isMobile ? "caption" : "subtitle2"} component="div" noWrap>
            {series.title}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default TVSeriesThumbnail;