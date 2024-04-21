import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import deaccent from '../deaccent';
export default function Diziview({ title, content }) {
    const {image,category,gender}=content
    const keywordint =category.split(',').map((m,i)=>i.toString()).join('') 
    return (
        <List sx={{ maxWidth: 345 }}>


            <ListItem disablePadding>
                <ListItemButton component={Link}
    
                    href={`/sponsor-kiyafeti/${deaccent(gender).toLowerCase().replaceAll(' ','-')}/${deaccent( category).toLowerCase().replaceAll(' ','-').replaceAll(',','')}/${keywordint}/sayfa/1`}
                   >
                    {title}
                </ListItemButton>


            </ListItem>
        </List>
    );
}
