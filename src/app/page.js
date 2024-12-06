import React from 'react';
import { memo } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BreadcrumbsComponent from "@/app/components/BreadcrumbsComponent";
import GenderCards from "./sponsor-giyim/components/gender-card/GenderCards";

const MemoizedBreadcrumbsComponent = memo(BreadcrumbsComponent);
const MemoizedGenderCards = memo(GenderCards);

export function generateMetadata() {
  return {
    title: 'Dizi Sponsoru Giyim Markalar',
    description: 'Discover our collection of clothing brands featured in popular TV series',
  }
}

export default function Home() {
  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs Section */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <MemoizedBreadcrumbsComponent
            items={[
              { label: 'Ana Sayfa', href: '/', icon: HomeIcon }
            ]}
          />
        </Paper>

        {/* Page Title Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: 'text.primary',
              letterSpacing: '-0.5px'
            }}
          >
            Dizi Sponsoru Giyim Markalar
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            Popüler dizilerde yer alan en trend giyim markalarını keşfedin
          </Typography>
        </Box>

        {/* Gender Cards Section */}
        <Box sx={{ mt: 4 }}>
          <MemoizedGenderCards />
        </Box>
      </Container>
    </Box>
  );
}