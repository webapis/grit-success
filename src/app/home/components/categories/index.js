'use client'
import { Grid, Typography,Container } from "@mui/material"

const products = [
    
{ image: '/home-images/elbise.jpg', title: 'Kadın Kıyafeti', url: '/?brand%5Bquery%5D=kadin%20elbise',alt:'Kadın Kıyafet Markalar'  }, 
{ image: '/home-images/taki.jpg', title: 'Takı Markaları', url: '/?brand%5Bquery%5D=yüzük' },
{ image: '/home-images/erkek-giyim-markalari.jpg', title: 'Erkek Kıyafeti', url: '/?brand%5Bquery%5D=erkek%20giyim',alt:'Erkek Kıyafet Markaları' },
{ image: '/home-images/bebek-kiyafet-markalari.jpg', title: 'Bebek Kıyafeti', url: '/?brand%5Bquery%5D=bebek%20giyim',alt:'Bebek Kıyafet Markaları' },
{ image: '/home-images/kiz-cocuk-kiyafet-markalari.jpg', title: 'Kız Çocuk Kıyafeti', url: '/?brand%5Bquery%5D=kiz%20cocuk%20giyim',alt:'Kız Çocuk Kıyafet Markaları' },
{ image: '/home-images/erkek-cocuk-kiyafeti-markalar.jpg', title: 'Erkek Çocuk Kıyafeti', url: '/?brand%5Bquery%5D=erkek%20cocuk%20giyim',alt:'Erkek Çocuk Kıyafet Markaları' },
{ image: '/home-images/kozmetik-urun-markalari.jpg', title: 'Kozmetik Ürünleri', url: '/?brand%5Bquery%5D=kozmetik',alt:'Kozmetik Ürün Markaları' },
{ image: '/home-images/kadin-canta-markalari.jpg', title: 'Kadın Çantaları', url: '/?brand%5Bquery%5D=kadin%20canta',alt:'Kadın Çanta Markaları' }
]

export default function Categories() {
    const borderStyles = {
        border: '2px solid #3498db', // Border width and color
        borderRadius: '8px', // Border radius for rounded corners
        padding: '2px', // Padding inside the border
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle effect
      };
    
      function handler({url}) {
      
        window.open(url);
     }

    return <Container >
        <Typography variant="h4" sx={{textAlign:'center'}}>Kıyafet, Takı, Çanta Markaları</Typography>
         <Grid container gap={1} sx={{display:'flex',justifyContent:'center'}}>
        {products.map((m, i) => <Grid onClick={()=>handler({url:m.url})} key={i} item xs={5} md={3} ><div style={{...borderStyles, textAlign:'center',cursor: 'pointer'}}><div><img alt={m.alt} src={`${m.image}`} style={{ width: 120, height: 200, objectFit: 'contain' }} /></div><Typography variant="body" style={{ textAlign: 'center',padding:3 }}>{m.title}</Typography></div></Grid>)}
    </Grid></Container>
}