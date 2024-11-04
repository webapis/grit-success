'use client';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Box } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5),
  }
}));

export const ImageWrapper = styled(Box)(({ theme, image }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '120%',
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  [theme.breakpoints.up('sm')]: {
    paddingTop: '133.33%',
  }
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  }
}));

export const StyledLink = styled('a')({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  height: '100%',
  width: '100%',
  '&:focus': {
    outline: 'none',
  },
});