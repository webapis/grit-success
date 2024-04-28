import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
//import Link from 'next/link';

export default function Diziview({ title, content }) {
    const { tag } = content;

    return (
        <List sx={{ maxWidth: 345 }}>
            <ListItem disablePadding
            >
                <ListItemButton component='a'
                    href={`/dizi/${tag}-dizi-sponsorlari`}  target='_blank'
                >
                    {title}
                </ListItemButton>


            </ListItem>
        </List>
    );
}
