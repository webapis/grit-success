
"use client"
import React, { useEffect, useRef } from "react";


function Image({ title, fotografUrl, marka, width,height, link, alt }) {

  const imageEl = useRef(null);

  useEffect(() => {
    imageEl.current.src = '/placeholdersvg.svg';
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
  }, [fotografUrl]);



  return (

    <img
    src='/placeholdersvg.svg'

      className="image"
      style={{ width:"100%",height:250,  borderRadius: 0,  objectFit: 'contain', borderRadius:10, paddingTop:5, paddingBottom:5 ,backgroundColor:'#eeeeee'}}
      ref={imageEl}
      data-src={'https://ik.imagekit.io/mumrjdehaou/'+fotografUrl}

      alt={alt}
    />

  );
}
//backgroundColor:'#eeeeee'

export default Image