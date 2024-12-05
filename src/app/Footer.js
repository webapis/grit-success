import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export default function Footer() {
  const footerSections = [
    {
      title: 'Hızlı Erişim',
      links: [
        { name: 'Ana Sayfa', href: '/' },
        { name: 'Diziler', href: '/dizi' },
        { name: 'Dizi Kıyafetleri', href: '/dizikiyafeti' },
        { name: 'Dizi Sponsorları', href: '/dizisponsoru' },
      ],
    },
    {
      title: 'Kurumsal',
      links: [
        { name: 'Hakkımızda', href: '/hakkimizda' },
        { name: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
        { name: 'İletişim', href: '/iletisim' },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'white',
        py: 6,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand and Description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
              DİZİ PORTAL
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Türk dizileri, oyuncular, yapım şirketleri, kıyafetler ve sponsorlar hakkında kapsamlı bilgi sunan platformunuz.
            </Typography>
          </Grid>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <Grid item xs={6} md={4} key={section.title}>
              <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
                {section.title}
              </Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <Link href={link.href} passHref>
                      <MuiLink
                        underline="hover"
                        sx={{
                          color: 'text.secondary',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        {link.name}
                      </MuiLink>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}
        >
          © {new Date().getFullYear()} DİZİ PORTAL (glumzi.com). Tüm hakları saklıdır.
        </Typography>
      </Container>
    </Box>
  );
}