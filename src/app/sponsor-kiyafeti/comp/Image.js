


import Link from "next/link"
import { Typography, Box, Grid } from "@mui/material"

export default function Image({ image, title, link, marka, price, currency }) {



  return <Link href={link} target="_blank" style={{ textDecoration: 'none', color: '#757575' }} >

    <Box sx={{ width: { xs: 150, md: 200 }, height: { xs: 200, md: 300 } }}>
      {
        image && image[0] && <img
          src={'https://ik.imagekit.io/mumrjdehaou/' + image[0]} loading="lazy" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#f5f5f5' }} />
      }

    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: { xs: 140, md: 200 } }}>
      <Grid container sx={{display:'flex',justifyContent:'space-between'}}>
        <Grid item>
          <Typography sx={{ fontSize: 14, fontFamily: 'inherit' }}>{marka}</Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 12, fontFamily: 'inherit', textAlign:'end',width:'100%'}}>{price>0 ? price:''} {price>0 ?currency:""}</Typography>
        </Grid>
      </Grid>

    </Box>
    <Box sx={{ width: { xs: 140, md: 200 } }}>
      <Typography variant="caption" style={{ width: '100%', wordWrap: 'break-word', textDecoration: 'none', color: 'inherit', fontFamily: 'inherit' }}>{title}</Typography>
    </Box>
  </Link>
}