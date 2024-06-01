'use client'
import { useRef, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import dataURI from './dataURI';
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export default function ImageDialog({ obj, handleSelect }) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return <Dialog fullScreen={fullScreen} open={obj ? true : false}>
     
     <DialogActions>
     <IconButton
          aria-label="close"
          onClick={() => handleSelect(null)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 3,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
     </DialogActions>
        <DialogContent  onClick={() => handleSelect(null)} sx={{ position: 'relative', overflow: "hidden", display: 'flex', flexDirection: "column" }} >
 
            {obj && <Image obj={obj} />}

        </DialogContent>
        <DialogActions>

            {obj && <Button endIcon={<OpenInNewIcon/>} href={obj.link} target='_blank' >{extractHostname(obj.link)}</Button>}
        </DialogActions>
    </Dialog>;

}

function extractHostname(urlString) {
    try {
        const url = new URL(urlString);
        return url.hostname;
    } catch (error) {
        console.error("Invalid URL format:", urlString);
        return null; // Or handle the error as needed
    }
}
function Image({ obj, handleSelect }) {

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

    return <img ref={imageEl}
        src={dataURI} data-src={'https://ik.imagekit.io/mumrjdehaou/' + image[0]} loading="lazy" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#f5f5f5' }} />



}