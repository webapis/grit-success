import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';

export default function Diziview({ title, content }) {
    const {image,category,gender}=content

    return (
        <List sx={{ maxWidth: 345 }}>


            <ListItem disablePadding

            >
                <ListItemButton component={Link}
                    href={`/sponsor-kiyafeti/${gender}/${category}/sayfa/1`}
                   >
                    {title}
                </ListItemButton>


            </ListItem>
        </List>
    );
}
