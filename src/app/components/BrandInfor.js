

import React from "react";
import Chip from '@mui/material/Chip';
export default function BrandInfor({ description, tag, title, keywords, href }) {


    return <div className="image-text-box" >
        <img src={`/brand-images/${tag}1.JPG`} style={{ margin: 5, width: 280, height: 180, objectFit: 'contain' }} alt={`${title} marka web sitesinin ana sayfa ekran görüntüsü`} />
        <h4><a href={href} target="_blank">{title}</a> </h4>
        <div style={{ margin: 5 }}>{keywords && keywords.split(',').map((m, k) => <Chip key={k} sx={{ marginRight: 1 }} size="small" label={m} />)}</div>
        {description}
    </div>

}




