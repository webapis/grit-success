


import Link from "next/link"
import { Typography, Box } from "@mui/material"

export default function Image({ image, title, link, marka, price, currency }) {



  return <Box  >
    <Box sx={{ width: { xs: 150, md: 200 }, height: { xs: 200, md: 300 } }}>
      {
        image && image[0] && <img
          src={'https://ik.imagekit.io/mumrjdehaou/' + image[0]} loading="lazy" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain' }} />
      }

    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between',width: { xs: 150, md: 200 } }}>
      <Typography sx={{ fontSize: 14, fontFamily: 'inherit' }}>{marka}</Typography>
      <Typography sx={{ fontSize: 12, fontFamily: 'inherit' }}>{price} {currency}</Typography>
    </Box>
    <Box sx={{width: { xs: 150, md: 200 }}}>
      <Typography variant="caption" style={{ width: '100%', wordWrap: 'break-word', textDecoration: 'none', color: 'inherit', fontFamily: 'inherit' }}>{title}</Typography>
    </Box>
  </Box>
}