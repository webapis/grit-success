'use client'

import { useState, useEffect } from 'react'
import { Box, Button, Typography, Slide, Link } from '@mui/material'
import CookieIcon from '@mui/icons-material/Cookie'
import { initGTM, updateGTMConsent } from '../utils/gtm'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent')
    if (!hasConsented) {
      // Small delay to prevent hydration issues
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    // Initialize GTM and update consent state
    initGTM()
    updateGTMConsent(true)
    // Enable AdSense
    const adsenseScript = document.getElementById('adsense')
    if (adsenseScript) {
      adsenseScript.removeAttribute('data-consent-pending')
    }
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false')
    // Update GTM consent state to denied
    updateGTMConsent(false)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <Slide direction="up" in={isVisible} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'background.paper',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
          zIndex: 1200,
          p: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          maxWidth: '100%',
          mx: 'auto',
          borderTopLeftRadius: { xs: 16, sm: 0 },
          borderTopRightRadius: { xs: 16, sm: 0 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
          <CookieIcon color="primary" sx={{ fontSize: 24, mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
              🍪 Çerez Politikası
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Size daha iyi bir deneyim sunmak için çerezleri kullanıyoruz. 
              <Link 
                href="/gizlilik-politikasi" 
                sx={{ ml: 0.5 }}
                color="primary"
                underline="hover"
              >
                Gizlilik Politikamızı
              </Link> inceleyebilirsiniz.
            </Typography>
          </Box>
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            minWidth: { sm: '260px' },
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={handleDecline}
            sx={{ 
              minWidth: { xs: '100%', sm: '120px' },
              order: { xs: 2, sm: 1 }
            }}
          >
            Reddet
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleAccept}
            sx={{ 
              minWidth: { xs: '100%', sm: '120px' },
              order: { xs: 1, sm: 2 }
            }}
          >
            Kabul Et
          </Button>
        </Box>
      </Box>
    </Slide>
  )
} 