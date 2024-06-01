import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
//import Link from 'next/link';
import deaccent from '../deaccent';
export default function Diziview({ title, keywords,slug }) {

const keywordint = keywords.sort().map((m,i)=>m).join('-') 
    return (
        <List sx={{ maxWidth: 345 }}>


            <ListItem disablePadding>
                <ListItemButton component='a'
    
                    href={`/sponsor-kiyafeti/kadin/${slug}/${keywordint}/sayfa/1`}
                   >
                    {title}
                </ListItemButton>


            </ListItem>
        </List>
    );
}
