'use client';
import React, { useEffect,useRef } from "react";
import Link from "next/link"
import {  Typography, Box } from "@mui/material"
import placeholder from "./placeholders.js";
export default function Image({ content }) {
    const imageEl = useRef(null);
    const { image, title, link, marka, price, currency } = content


    useEffect(() => {
        imageEl.current.src = placeholder;
        if (window.IntersectionObserver) {
          let observer = new IntersectionObserver(
            (entries, observer) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.src = entry.target.dataset.src;
                  observer.unobserve(entry.target);
                }
              });
            },
            {
              root: null,
              rootMargin: "0px",
              threshold: 0.5,
            }
          );
          observer.observe(imageEl.current);
        }
      }, [marka,image]);
    return <Box container sx={{ xs: 150, md: 300 }}>
        <Box item xs={12} component={Link} href={link} target="_blank">
            <img    ref={imageEl}
        data-src={'https://ik.imagekit.io/mumrjdehaou/'+image[0]} src={placeholder} style={{ maxWidth: '100%', height: 'auto' }}  />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{fontSize:14,fontFamily:'inherit'}}>{marka}</Typography>
            <Typography sx={{fontSize:12,fontFamily:'inherit'}}>{price} {currency}</Typography>
        </Box>
        <Box>
            <Typography  component={Link} href={link} target="_blank" variant="caption" style={{ width: '100%', wordWrap: 'break-word', textDecoration: 'none', color:'inherit',fontFamily:'inherit' }}>{title}</Typography>
        </Box>
    </Box>
}