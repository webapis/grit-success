


//import Link from "next/link"
import { Typography, Box, Grid } from "@mui/material"
import deaccent from "./deaccent"
export default function Image({ image, title, link, marka, price, currency,matchingCategories,subcat }) {
const selectedCategories = matchingCategories.map(m=>m.category)

const matchingWords = title.split(' ').map((m) => {

  if (matchingCategories.includes(m.toLowerCase())) {
    return <span key={m} style={{ color: "#1A73E8", textTransform: "capitalize", fontSize: 14, fontWeight: 700 }}>{m.toLowerCase()} {" "}</span>
  } else {
    return <span key={m} style={{ textTransform: "capitalize", fontSize: 14 }}>{m.toLowerCase()}{" "}</span>
  }
})

  return <a href={link} target="_blank" style={{ textDecoration: 'none', color: '#757575',padding:0,margin:0 }} >

    <Box sx={{ maxWidth: { xs: 190,sm:300, md: 400 }, maxHeight: { xs: 300,sm:450, md: 550 },padding:0 ,margin:0}}>
      {
        image && image[0] && <img
          src={'https://ik.imagekit.io/mumrjdehaou/' + image[0]} loading="lazy" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#f5f5f5',borderRadius:3 }} />
      }

    </Box>

   <Box sx={{ display: 'flex', justifyContent: 'space-between',  maxWidth: { xs: 190,sm:300, md: 400  },paddingLeft:1,paddingRight:1 }} >
      <Grid container sx={{display:'flex',justifyContent:'space-between'}}>
        <Grid item>
          <Typography sx={{ fontSize: 14, fontFamily: 'inherit' }}>{marka.replace('clothing.','')}</Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 12, fontFamily: 'inherit', textAlign:'end',width:'100%'}}>{price>0 ? price:''} {price>0 ?currency:""}</Typography>
        </Grid>
      </Grid>

    </Box> 
    <Box sx={{maxWidth: { xs: 190,sm:300, md: 400  }, maxHeight: { xs: 300 },paddingLeft:1,paddingRight:1 }}>
      {matchingWords}
      {/* <Typography variant="caption" style={{ width: '100%', wordWrap: 'break-word', textDecoration: 'none', color: 'inherit', fontFamily: 'inherit' }}>{matchingWords}</Typography> */}
    </Box>
  </a>
}