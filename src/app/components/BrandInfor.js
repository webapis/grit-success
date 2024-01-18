

import React from "react";
import Chip from '@mui/material/Chip';
export default function BrandInfor({ description, tag, title, keywords, href }) {


    return <div className="image-text-box" >
        <img loading="lazy" src={`/brand-images-v1/${tag}1.JPG`} style={{ margin: 5, width: 280, height: 180, objectFit: 'contain' }} alt={`${title} kıyafet markası web sitesinin ana sayfa ekran görüntüsü`} />
        <h3><a href={href} target="_blank">{title}</a> </h3>
        <div style={{ margin: 5 }}>{keywords && keywords.split(',').map((m, k) => <Chip variant={keywords.split(',').includes(m)?'filled':'outlined'} key={k} sx={{ marginRight: 1 }} size="small" label={m} />)}</div>
        {description}
    </div>

}




