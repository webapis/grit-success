
'use client';
import React, { useEffect, useState,useRef } from "react";
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
    return <Box container >
        <Box item xs={12} component={Link} href={link} target="_blank">
          {image && image[0] &&             <img    ref={imageEl}
        data-src={'https://ik.imagekit.io/mumrjdehaou/'+image[0]} src={placeholder} style={{ maxWidth: '100%', height: 'auto' }}  />}

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


// import Link from "next/link"
// import {  Typography, Box } from "@mui/material"

// export default function Image({ image, title, link, marka, price, currency }) {



//     return <Box container sx={{ width:{ xs: 150, md: 200},height:{xs:200,md:300} }}>
//         <Box item xs={12} >
//           {
//             image && image[0] &&       <img   
//             src={'https://ik.imagekit.io/mumrjdehaou/'+image[0]} loading="lazy" style={{ maxWidth: '100%', height: '100%',objectFit:'contain' }}  />
//           }
      
//         </Box>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography sx={{fontSize:14,fontFamily:'inherit'}}>{marka}</Typography>
//             <Typography sx={{fontSize:12,fontFamily:'inherit'}}>{price} {currency}</Typography>
//         </Box>
//         <Box>
//             <Typography  variant="caption" style={{ width: '100%', wordWrap: 'break-word', textDecoration: 'none', color:'inherit',fontFamily:'inherit' }}>{title}</Typography>
//         </Box>
//     </Box>
// }