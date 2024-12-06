import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutPage = () => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Glumzi'ye Hoş Geldiniz!
      </Typography>
      <Typography variant="body1" paragraph>
        Glumzi, Türk dizilerindeki moda dünyasını keşfetmeniz için tasarlanmış özel bir platformdur. 
        Favori dizilerinizdeki kıyafetleri ve markaları bulmanızı sağlayan, moda ve dizi dünyasını bir araya getiren benzersiz bir deneyim sunuyoruz.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        Misyonumuz
      </Typography>
      <Typography variant="body1" paragraph>
        Misyonumuz, dizi severler ile moda markalarını buluşturmaktır. Türk dizilerinde gördüğünüz kıyafetleri kolayca bulmanızı sağlayarak, 
        ekrandaki stili gerçek hayata taşımanıza yardımcı oluyoruz. Her bölümde yer alan ürünleri detaylı bir şekilde kategorize ederek 
        size en doğru alışveriş deneyimini sunuyoruz.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Neler Sunuyoruz?
      </Typography>
      <Box component="ul">
        <Typography component="li" variant="body1">
          <strong>Dizi Kıyafetleri:</strong> Türk dizilerinde gördüğünüz kıyafetleri marka, kategori ve cinsiyet bazında filtreleyerek bulabilirsiniz.
        </Typography>
        <Typography component="li" variant="body1">
          <strong>Yapım Şirketleri:</strong> Türk dizi sektöründeki yapım şirketlerini ve projelerini keşfedebilirsiniz.
        </Typography>
        <Typography component="li" variant="body1">
          <strong>Kolay Alışveriş:</strong> Beğendiğiniz ürünlere doğrudan erişim sağlayarak, güvenilir markalardan alışveriş yapabilirsiniz.
        </Typography>
        <Typography component="li" variant="body1">
          <strong>Detaylı Filtreleme:</strong> Kadın, erkek ve çocuk kategorilerinde, farklı giyim türlerine göre arama yapabilirsiniz.
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        Kullanıcı Deneyimi
      </Typography>
      <Typography variant="body1" paragraph>
        Platformumuzda her ürün için detaylı bilgiler, fiyat karşılaştırmaları ve doğrudan satın alma linkleri sunuyoruz. 
        Modern ve kullanıcı dostu arayüzümüz sayesinde aradığınız ürünleri kolayca bulabilir, favori dizilerinizdeki 
        stili yakalayabilirsiniz.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Bize Katılın
      </Typography>
      <Typography variant="body1">
        Türk dizilerindeki modayı keşfetmek ve sevdiğiniz karakterlerin stilini yakalamak için Glumzi'yi keşfetmeye başlayın. 
        Size en trend ürünleri, en kolay ulaşılabilir şekilde sunmaktan mutluluk duyuyoruz.
      </Typography>
    </Container>
  );
};

export default AboutPage;