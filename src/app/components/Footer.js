import React, { memo } from "react";
import { Box, Container, Typography, Divider, Link, Stack } from "@mui/material";

const footerLinks = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  // { name: "Hizmetler", href: "/services" },
  // { name: "İletişim", href: "/contact" },
];

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[200],
        borderTop: '1px solid',
        borderColor: 'divider',
        py: { xs: 3, md: 4 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={2.5}
          alignItems="center"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'text.secondary',
              fontFamily: 'inherit',
              fontWeight: 500,
              textDecoration: 'none',
              padding: '0.5rem 1rem',
            }}
          >
            © {currentYear} glumzi.com
          </Typography>

          <Stack
            direction="row"
            spacing={{ xs: 2, sm: 3 }}
            flexWrap="wrap"
            justifyContent="center"
            useFlexGap
          >
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {link.name}
              </Link>
            ))}
          </Stack>

          <Divider flexItem sx={{ opacity: 0.7 }} />

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              opacity: 0.8,
              fontSize: '0.75rem',
              fontWeight: 400,
            }}
          >
            Her hakkı saklıdır.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
});

Footer.displayName = 'Footer';

export default Footer;