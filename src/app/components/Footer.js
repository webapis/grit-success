import React from "react";
import { Box, Container, Typography, Divider, Link } from "@mui/material";

const Footer = () => {
  const footerLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    // { name: "Hizmetler", href: "/services" },
    // { name: "İletişim", href: "/contact" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[100],
        py: 3, // Reduced from 6 to 3
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1 // Reduced from 2 to 1
          }}
        >
        <Typography
                        variant="h5"
                        noWrap
                        component='a'
                        sx={{
                            // border:'1px solid #bdbdbd',
                            paddingLeft: 2,
                            paddingRight: 2,
                            borderRadius: 5,
                            color: 'black',
                            fontFamily: 'inherit',
                            fontWeight: 500,
                            // fontSize: '1.5rem',
                            // letterSpacing: '0.05em',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                            textDecoration: 'none'
                        }}
                        href={'/'}
                    >
                        Glumzi
                    </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 3,
              my: 1 // Reduced from 2 to 1
            }}
          >
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                underline="hover"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {link.name}
              </Link>
            ))}
          </Box>

          <Divider sx={{ width: '100%', my: 1 }} /> {/* Reduced from 2 to 1 */}

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              opacity: 0.8
            }}
          >
            © {new Date().getFullYear()} glumzi.com. Her hakkı saklıdır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;