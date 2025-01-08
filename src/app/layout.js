'use client'
import { permanentRedirect, usePathname } from 'next/navigation'
import { GoogleTagManager } from '@next/third-parties/google'
import { Inter, Poppins } from 'next/font/google'
import ScrollToTopButton from './components/ScrollToTopButton';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import HideOnScroll from './components/HideOnScroll';
import './globals.css'
import Footer from './components/Footer';
import Script from 'next/script'

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  display: 'swap',
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
  },
});

export default function RootLayout(props) {
  const {children} = props;
  const pathName = usePathname();
  
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
            }}
          >
            <Box 
              component="main" 
              sx={{ 
                flex: 1,
                py: 3,
                px: { xs: 0, sm: 0 },
              }}
            >
              {children}
            </Box>
            <Footer />
          </Box>
          <ScrollToTopButton />
        </ThemeProvider>
        
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1960990522971470" 
          crossOrigin="anonymous" 
        />
        <GoogleTagManager gtmId="GTM-WVW74LTW" />
      </body>
    </html>
  )
}


