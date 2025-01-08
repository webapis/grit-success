import { Box, Container, Typography, Paper } from '@mui/material';

export const metadata = {
  title: 'Gizlilik Politikası | Glumzi',
  description: 'Glumzi gizlilik politikası, çerez kullanımı ve veri toplama politikaları hakkında bilgi.',
  alternates: {
    canonical: '/gizlilik-politikasi'
  }
};

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Gizlilik Politikası
        </Typography>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            1. Genel Bakış
          </Typography>
          <Typography paragraph>
            Bu gizlilik politikası, Glumzi web sitesinin kullanıcılarının gizliliğini nasıl koruduğumuzu ve 
            bilgilerini nasıl kullandığımızı açıklar. Sitemizi kullanarak bu politikayı kabul etmiş olursunuz.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            2. Toplanan Bilgiler
          </Typography>
          <Typography paragraph>
            Sitemizde aşağıdaki bilgileri toplayabiliriz:
          </Typography>
          <ul>
            <Typography component="li" sx={{ mb: 1 }}>
              Ziyaret edilen sayfalar ve görüntüleme sayıları
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              Kullanılan cihaz ve tarayıcı bilgileri
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              IP adresi ve konum bilgileri
            </Typography>
          </ul>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            3. Çerezler
          </Typography>
          <Typography paragraph>
            Sitemiz, daha iyi bir kullanıcı deneyimi sunmak için çerezleri kullanır. Çerezler şu amaçlarla kullanılır:
          </Typography>
          <ul>
            <Typography component="li" sx={{ mb: 1 }}>
              Site tercihlerinizi hatırlamak
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              Ziyaret istatistiklerini toplamak
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              Site performansını analiz etmek
            </Typography>
          </ul>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            4. Google Analytics
          </Typography>
          <Typography paragraph>
            Sitemiz, ziyaretçi davranışlarını analiz etmek için Google Analytics kullanmaktadır. 
            Bu hizmet çerezler kullanarak bilgi toplar ve Google'ın gizlilik politikasına tabidir.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            5. Reklam Hizmetleri
          </Typography>
          <Typography paragraph>
            Sitemizde Google AdSense gibi üçüncü taraf reklam hizmetleri kullanılmaktadır. 
            Bu hizmetler, size ilgi alanlarınıza yönelik reklamlar göstermek için çerezler kullanabilir.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            6. Bilgilerin Kullanımı
          </Typography>
          <Typography paragraph>
            Topladığımız bilgileri şu amaçlarla kullanırız:
          </Typography>
          <ul>
            <Typography component="li" sx={{ mb: 1 }}>
              Sitemizi geliştirmek ve iyileştirmek
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              Kullanıcı deneyimini kişiselleştirmek
            </Typography>
            <Typography component="li" sx={{ mb: 1 }}>
              Site performansını analiz etmek
            </Typography>
          </ul>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            7. Bilgi Güvenliği
          </Typography>
          <Typography paragraph>
            Bilgilerinizin güvenliğini sağlamak için uygun teknik ve organizasyonel önlemler alıyoruz. 
            Ancak, internet üzerinden yapılan veri iletiminin %100 güvenli olmadığını unutmayın.
          </Typography>
        </Box>

        <Box component="section">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            8. İletişim
          </Typography>
          <Typography paragraph>
            Bu gizlilik politikası hakkında sorularınız varsa, bizimle iletişime geçebilirsiniz.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
} 