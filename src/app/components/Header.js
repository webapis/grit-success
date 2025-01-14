import { AppBar, Toolbar, Typography, Button, Container, IconButton, Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Tabs, Tab } from '@mui/material';
import { Menu as MenuIcon, Home, Movie, Checkroom, Business, Info } from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeLoadingPath, setActiveLoadingPath] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
    setActiveLoadingPath(null);
    setMobileOpen(false);
  }, [pathname]);

  const handleNavigation = (path) => {
    if (path === pathname) {
      setMobileOpen(false);
      return;
    }
    setIsLoading(true);
    setActiveLoadingPath(path);
    router.push(path);
  };

  const mainNavItems = [
    { name: 'Ana Sayfa', path: '/', icon: Home },
    { name: 'Diziler', path: '/turk-dizi/yapim-sirketleri', icon: Movie },
    { name: 'Dizi Kıyafetleri', path: '/dizikiyafeti', icon: Checkroom },
    { name: 'Dizi Sponsorları', path: '/dizisponsoru', icon: Business },
    { name: 'Sponsor Kategori', path: '/dizi-sponsor-kategori', icon: Business },
    { name: 'Hakkımızda', path: '/hakkimizda', icon: Info },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        {/* Top Bar */}
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: '64px', md: '72px' } }}>
            {/* Logo/Brand */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    color: '#1a1a1a',
                    fontWeight: 700,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    mr: 1,
                    '&:hover': {
                      color: 'primary.main',
                    },
                    transition: 'color 0.2s ease-in-out'
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
              </Link>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5 }}>
              {mainNavItems.map((item) => {
                const isActive = pathname === item.path;
                const isLoadingThis = isLoading && activeLoadingPath === item.path;
                const Icon = item.icon;
                return (
                  <Box
                    key={item.name}
                    sx={{ position: 'relative' }}
                  >
                    <Button
                      onClick={() => handleNavigation(item.path)}
                      startIcon={<Icon />}
                      sx={{
                        color: isActive ? 'primary.main' : '#1a1a1a',
                        mx: 0.5,
                        py: 1,
                        px: 2,
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: 'rgba(0, 127, 255, 0.04)',
                        },
                        textTransform: 'none',
                        fontWeight: isActive ? 600 : 400,
                        borderRadius: 2,
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      {item.name}
                    </Button>
                    
                    {/* Loading indicator under desktop nav button */}
                    {isLoadingThis && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          bgcolor: 'primary.main',
                          zIndex: 1,
                          animation: 'loading 1s infinite linear',
                          '@keyframes loading': {
                            '0%': {
                              transform: 'translateX(-100%)',
                            },
                            '100%': {
                              transform: 'translateX(100%)',
                            },
                          },
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { sm: 'none' }, 
                color: '#1a1a1a',
                '&:hover': {
                  backgroundColor: 'rgba(0, 127, 255, 0.04)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
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
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            backgroundColor: 'white',
            borderLeft: '1px solid',
            borderColor: 'divider'
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%'
        }}>
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
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

          <List sx={{ flex: 1, pt: 2 }}>
            {mainNavItems.map((item) => {
              const isActive = pathname === item.path;
              const isLoadingThis = isLoading && activeLoadingPath === item.path;
              const Icon = item.icon;
              return (
                <ListItem 
                  key={item.name} 
                  disablePadding
                  sx={{
                    backgroundColor: isActive ? 'rgba(0, 127, 255, 0.04)' : 'transparent',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItem 
                    sx={{ 
                      px: 3,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 127, 255, 0.04)',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ 
                      color: isActive ? 'primary.main' : '#1a1a1a',
                      minWidth: 40
                    }}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? '#007FFF' : '#1a1a1a'
                        }
                      }}
                    />
                  </ListItem>
                  
                  {/* Loading indicator under the nav item */}
                  {isLoadingThis && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        bgcolor: 'primary.main',
                        zIndex: 1,
                        animation: 'loading 1s infinite linear',
                        '@keyframes loading': {
                          '0%': {
                            transform: 'translateX(-100%)',
                          },
                          '100%': {
                            transform: 'translateX(100%)',
                          },
                        },
                      }}
                    />
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
} 