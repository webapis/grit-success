
import Link from "next/link"
import {  Typography, Box } from "@mui/material"
export default function Image({ content }) {
    const { image, title, link, marka, price, currency } = content
    return <Box container sx={{ xs: 150, md: 300 }}>
        <Box item xs={12} component={Link} href={link} target="_blank">
            <img src={'/public/placeholder.jpg'} style={{ maxWidth: '100%', height: 'auto' }} srcSet={image[0]} loading="lazy"  />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>{marka}</Typography>
            <Typography>{price} {currency}</Typography>
        </Box>
        <Box>
            <Typography  component={Link} href={link} target="_blank" variant="caption" style={{ width: '100%', wordWrap: 'break-word', textDecoration: 'none' }}>{title}</Typography>
        </Box>
    </Box>
}