import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';

export default function Diziview({ title, keyword }) {
   

    return (
        <List sx={{ maxWidth: 345 }}>
            <ListItem disablePadding
            >
                <ListItemButton component={Link}
                    href={`/dizi-sponsor-kategori/${keyword}/sayfa/1`}  target='_blank'
                >
                    {title}
                </ListItemButton>


            </ListItem>
        </List>
    );
}
