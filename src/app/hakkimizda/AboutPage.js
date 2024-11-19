import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutPage = () => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Glumzi'ye Hoş Geldiniz!
      </Typography>
      <Typography variant="body1" paragraph>
        Glumzi, ziyaretçilerimize benzersiz ve ilgi çekici bir çevrimiçi deneyim sunmaya kendini adamıştır. 
        Platformumuz, popüler diziler ve onların sponsorları üzerine odaklanarak moda, yaşam tarzı ve eğlence alanındaki en son trendleri keşfetmek için bir merkezdir.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        Misyonumuz
      </Typography>
      <Typography variant="body1" paragraph>
        Misyonumuz, hayranları sevdikleri markalarla buluşturmaktır. Favori dizilerinde yer alan ürünleri sergileyerek, 
        hikaye anlatımının gücüne inanıyor ve bu bağlamda izleyiciler ile markalar arasında anlamlı bir bağlantı kurmayı hedefliyoruz.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Neler Sunuyoruz?
      </Typography>
      <Box component="ul">
        <Typography component="li" variant="body1">
          <strong>Dizi Sponsorlukları:</strong> Favori TV dizilerinizi destekleyen çeşitli markaları keşfedin.
        </Typography>
        <Typography component="li" variant="body1">
          <strong>Moda Bilgileri:</strong> Popüler dizilerden ilham alan en son moda trendleriyle güncel kalın.
        </Typography>
        <Typography component="li" variant="body1">
          <strong>Çevrimiçi Alışveriş:</strong> Özelliklerini tanıttığımız ürünleri güvenilir ortaklarımızdan satın almak için doğrudan bağlantılarla sorunsuz bir alışveriş deneyimi yaşayın.
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        Gizlilik Taahhüdü
      </Typography>
      <Typography variant="body1" paragraph>
        Gizliliğiniz bizim için çok önemlidir. Verilerinizin korunmasını ve sorumlu bir şekilde kullanılmasını sağlıyoruz. 
        Daha fazla bilgi için lütfen Gizlilik Politikamız sayfasını ziyaret edin.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Bize Katılın
      </Typography>
      <Typography variant="body1" paragraph>
        Sitemizi keşfetmeye, içeriklerimizle etkileşimde bulunmaya ve yaşam tarzınızı zenginleştirecek yeni ürünler keşfetmeye davet ediyoruz. 
        İster moda meraklısı, ister dizi tutkunuz olun, Glumzi'de herkes için bir şeyler var.
      </Typography>

      <Typography variant="body1">
        Glumzi'yi ziyaret ettiğiniz için teşekkür ederiz! Moda ve eğlencede en iyileri keşfetme yolculuğunuzda sizinle birlikte olmayı dört gözle bekliyoruz.
      </Typography>
    </Container>
  );
};

export default AboutPage;