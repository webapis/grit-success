import { useState } from 'react';
import { Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ListItemIcon from '@mui/material/ListItemIcon';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import Check from '@mui/icons-material/Check';
import ColorPicker from './ColorPicker';
export default function PopupMenu() {
    const [selectedColor, setselectedColor] = React.useState('Renk');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleMenuItemClick  (color)  {
        setselectedColor(color);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return <div><Button size='small' endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} onClick={handleClickListItem}>{selectedColor}</Button>

        <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
            }}
            style={{ width: 180, display: 'flex', justifyContent: 'center' }}

        >
            <MenuList dense>
                <MenuItem  onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <Check />
                    </ListItemIcon>
                    Tüm renkler
                </MenuItem>

                <ColorPicker onChange={handleMenuItemClick} selectedColor={selectedColor} />
            </MenuList>

        </Menu>
    </div>
}