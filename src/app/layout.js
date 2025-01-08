'use client'
import { permanentRedirect, usePathname } from 'next/navigation'
import { Inter, Poppins } from 'next/font/google'
import ScrollToTopButton from './components/ScrollToTopButton';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import HideOnScroll from './components/HideOnScroll';
import CookieConsent from './components/CookieConsent';
import './globals.css'
import Footer from './components/Footer';
import Script from 'next/script'
import { useEffect } from 'react'
import { initGTM } from './utils/gtm'

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#007FFF',
    },
    background: {
      default: '#F5F5F7',
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          height: '100%',
        },
      },
    },
    MuiImageListItem: {
      styleOverrides: {
        root: {
          aspectRatio: '16/9',
        },
      },
    },
  },
});

export default function RootLayout(props) {
  const {children} = props;
  const pathName = usePathname();
  
  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent') === 'true'
    if (hasConsented) {
      initGTM()
    }
  }, [])

  const endsWithSayfa = pathName.match(/\/sayfa\/?$/) !== null;
  if(endsWithSayfa){
    let redirectPath = pathName+'/1'
    permanentRedirect(redirectPath.replace('//','/'))
  }

  return (
    <html lang="tr">
      <head>
        <meta name="fo-verify" content="8de09664-17ab-4040-a646-0c5652e5e37d" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Türk dizilerindeki kıyafetler ve sponsorlar hakkında detaylı bilgi" />
        <link 
          rel="preconnect" 
          href={process.env.NEXT_PUBLIC_IMG_HOST} 
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HideOnScroll>
            <Header />
          </HideOnScroll>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              bgcolor: 'background.default',
              pt: { xs: '56px', sm: '64px' },
              height: '100%',
            }}
          >
            <Box 
              component="main" 
              sx={{ 
                flex: 1,
                py: 3,
                px: { xs: 0, sm: 0 },
                minHeight: 0,
                overflowX: 'hidden',
                '& img': {
                  height: 'auto',
                  maxWidth: '100%',
                },
                '& .MuiGrid-item': {
                  display: 'flex',
                },
              }}
            >
              {children}
            </Box>
            <Footer />
          </Box>
          <ScrollToTopButton />
          <CookieConsent />
        </ThemeProvider>
        
        {/* Load AdSense only if consent is given */}
        <Script 
          id="adsense"
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1960990522971470" 
          crossOrigin="anonymous"
          strategy="lazyOnload"
          data-consent-pending="true"
        />
      </body>
    </html>
  )
}


