import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, Stack } from '@mui/material';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

export default function Footer() {
  const footerSections = [
    {
      title: 'Keşfet',
      links: [
        { name: 'Diziler', href: '/dizi' },
        { name: 'Dizi Kıyafetleri', href: '/dizikiyafeti' },
        { name: 'Dizi Sponsorları', href: '/dizisponsoru' },
        { name: 'Yapım Şirketleri', href: '/yapim-sirketleri' },
      ],
    },
    {
      title: 'Kurumsal',
      links: [
        { name: 'Hakkımızda', href: '/hakkimizda' },
        { name: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
        { name: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
        { name: 'İletişim', href: '/iletisim' },
      ],
    },
    {
      title: 'Sosyal Medya',
      links: [
        { name: 'Facebook', href: '#', icon: Facebook },
        { name: 'Twitter', href: '#', icon: Twitter },
        { name: 'Instagram', href: '#', icon: Instagram },
        { name: 'LinkedIn', href: '#', icon: LinkedIn },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'white',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Brand and Description */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#1a1a1a',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'baseline',
                      mb: 1
                    }}
                  >
                    DİZİ PORTAL
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{
                        color: 'primary.main',
                        ml: 1,
                        fontWeight: 500
                      }}
                    >
                      glumzi.com
                    </Typography>
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 300 }}>
                  Türk dizileri, oyuncular, yapım şirketleri, kıyafetler ve sponsorlar hakkında kapsamlı bilgi sunan platformunuz.
                </Typography>
              </Box>
            </Grid>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <Grid item xs={6} md={section.title === 'Sosyal Medya' ? 2 : 3} key={section.title}>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {section.title}
                </Typography>
                {section.title === 'Sosyal Medya' ? (
                  <Stack direction="row" spacing={1}>
                    {section.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <IconButton
                          key={link.name}
                          component="a"
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'primary.main',
                              backgroundColor: 'rgba(0, 127, 255, 0.04)',
                            },
                          }}
                        >
                          <Icon />
                        </IconButton>
                      );
                    })}
                  </Stack>
                ) : (
                  <Stack spacing={1}>
                    {section.links.map((link) => (
                      <Link key={link.name} href={link.href} passHref>
                        <MuiLink
                          underline="hover"
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'primary.main',
                            },
                            fontSize: '0.875rem',
                          }}
                        >
                          {link.name}
                        </MuiLink>
                      </Link>
                    ))}
                  </Stack>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Bottom Bar */}
      <Box
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.02)',
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            © {new Date().getFullYear()} DİZİ PORTAL (glumzi.com). Tüm hakları saklıdır.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}