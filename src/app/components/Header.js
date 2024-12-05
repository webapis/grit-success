import { AppBar, Toolbar, Typography, Button, Container, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Diziler', path: '/dizi' },
    { name: 'Dizi Kıyafetleri', path: '/dizikiyafeti' },
    { name: 'Dizi Sponsorları', path: '/dizisponsoru' },
    { name: 'Hakkımızda', path: '/hakkimizda' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo/Brand */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: '#1a1a1a',
                  fontWeight: 700,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mr: 1
                }}
              >
                DİZİ PORTAL
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{
                  color: 'primary.main',
                  fontSize: { xs: '0.7rem', md: '0.8rem' },
                  alignSelf: 'flex-end',
                  mb: '4px',
                  opacity: 0.9,
                  fontWeight: 500
                }}
              >
                glumzi.com
              </Typography>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' }, color: '#1a1a1a' }}
            >
              <MenuIcon />
            </IconButton>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.path}
                  sx={{
                    color: pathname === item.path ? '#007FFF' : '#1a1a1a',
                    mx: 1,
                    '&:hover': {
                      color: '#007FFF',
                      backgroundColor: 'transparent',
                    },
                    textTransform: 'none',
                    fontWeight: pathname === item.path ? 700 : 400,
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 700, mr: 1 }}>
              DİZİ PORTAL
            </Typography>
            <Typography variant="caption" sx={{ 
              color: 'primary.main',
              opacity: 0.9,
              fontWeight: 500
            }}>
              glumzi.com
            </Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <Link href={item.path} style={{ width: '100%', textDecoration: 'none' }}>
                  <ListItemText 
                    primary={item.name} 
                    sx={{
                      textAlign: 'center',
                      color: pathname === item.path ? '#007FFF' : '#1a1a1a',
                      fontWeight: pathname === item.path ? 700 : 400,
                    }}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
} 