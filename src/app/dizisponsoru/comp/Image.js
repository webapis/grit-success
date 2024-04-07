'use client';
import React, { useEffect, useRef } from "react";


import placeholder from "./placeholder.js";
export default function Image({ alt, height, src,width }) {
    const imageEl = useRef(null);



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
    }, [src]);
    return <img ref={imageEl} alt={alt} height={height}
        data-src={src} src={placeholder} style={{ maxWidth: '50%', objectFit: 'contain', margin: 0 }} />



}