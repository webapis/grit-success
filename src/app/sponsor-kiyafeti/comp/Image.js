"use client"
import { Typography, Box, Grid } from "@mui/material"
import React, { useEffect, useRef } from "react";

import dataURI from "./dataURI";
export default function Image({ matchingCategories, obj, handleSelect }) {
  const { image, title, link, marka, price, currency } = obj
  const imageEl = useRef(null);
  useEffect(() => {
    imageEl.current.src = dataURI;
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
          threshold: 0,
        }
      );
      observer.observe(imageEl.current);
    }
  }, [marka, image]);

  const matchingWords = title.split(' ').map((m) => {

    if (matchingCategories.includes(m.toLowerCase())) {
      return <span key={m} style={{ color: "#1A73E8", textTransform: "capitalize", fontSize: 14, fontWeight: 700 }}>{m.toLowerCase()} {" "}</span>
    } else {
      return <span key={m} style={{ textTransform: "capitalize", fontSize: 14 }}>{m.toLowerCase()}{" "}</span>
    }
  })

  return <div onClick={() => handleSelect(obj)}  style={{ textDecoration: 'none', color: '#757575', padding: 0, margin: 0 }} >

    <Box sx={{ maxWidth: { xs: 190, sm: 300, md: 400 }, maxHeight: { xs: 300, sm: 450, md: 550 }, padding: 0, margin: 0 }}>
      {
        image && image[0] && <img ref={imageEl}
          src={dataURI} data-src={'https://ik.imagekit.io/mumrjdehaou/' + image[0]} loading="lazy" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#f5f5f5' }} />
      }

    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: { xs: 190, sm: 300, md: 400 }, paddingLeft: 1, paddingRight: 1 }} >
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item>
          <Typography sx={{ fontSize: 14, fontFamily: 'inherit' }}>{marka.replace('clothing.', '')}</Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 12, fontFamily: 'inherit', textAlign: 'end', width: '100%' }}>{price > 0 ? price : ''} {price > 0 ? currency : ""}</Typography>
        </Grid>
      </Grid>

    </Box>
    <Box sx={{ maxWidth: { xs: 190, sm: 300, md: 400 }, maxHeight: { xs: 300 }, paddingLeft: 1, paddingRight: 1 }}>
      {matchingWords}
      {/* <Typography variant="caption" style={{ width: '100%', wordWrap: 'break-word', textDecoration: 'none', color: 'inherit', fontFamily: 'inherit' }}>{matchingWords}</Typography> */}
    </Box>
  </div>
}