import GenderCards from "./sponsor-giyim/components/gender-card/GenderCards"
import BreadcrumbsComponent from "@/app/components/BreadcrumbsComponent"
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

export function generateMetadata() {
  return {
    title: 'Dizi Sponsoru Giyim Markalar',
    description: 'Discover our collection of clothing brands featured in popular TV series',
  }
}

export default function Home() {
  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs Section */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <BreadcrumbsComponent
            items={[
              { label: 'Ana Sayfa', href: '/', icon: HomeIcon }
            ]}
          />
        </Paper>

        {/* Page Title Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: 'text.primary'
            }}
          >
            Dizi Sponsoru Giyim Markalar
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Popüler dizilerde yer alan en trend giyim markalarını keşfedin
          </Typography>
        </Box>

        {/* Gender Cards Section */}
        <GenderCards />
      </Container>
    </Box>
  );
}