'use client'
import React from 'react';
import { Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import Check from '@mui/icons-material/Check';
import ColorPicker from './ColorPicker';
import './ColorPicker.css';
const colors = [
    { index: 0, value: '#FFA500', label: 'turuncu' },
    { index: 1, value: '#A020F0', label: 'mor' },
    { index: 2, value: '#0000FF', label: 'mavi' },
    { index: 3, value: '#40E0D0', label: 'turkuvaz' },
    { index: 4, value: '#FFC0CB', label: 'pembe' },
    { index: 5, value: '#FF0000', label: 'kırmızı' },
    { index: 6, value: '#FFFF00', label: 'sarı' },
    { index: 7, value: '#00FF00', label: 'yeşil' },
    { index: 8, value: '#000080', label: 'lacivert' },
    { index: 9, value: '#000000', label: 'siyah' },
    { index: 10, value: '#FFFFFF', label: 'beyaz' },
    { index: 11, value: '#808080', label: 'gri' },
    { index: 12, value: '#FF00FF', label: 'fuşya' },
    { index: 13, value: '#FAD9D2', label: 'pudra' },
    { index: 14, value: '#800020', label: 'bordo' },
    { index: 15, value: '#FFFDD0', label: 'krem' },
    { index: 16, value: '#F5F5DC', label: 'bej' },
    { index: 17, value: '#A52A2A', label: 'kahverengi' },
    { index: 18, value: '#FFC87C', label: 'somon' },
    { index: 19, value: '#FFDB58', label: 'hardal' },
    { index: 20, value: '#FFFFFF', label: 'Renk' }
    // Add more colors as needed
];

export default function PopupMenuColor() {
    const [selectedColor, setSelectedColor] = React.useState(20);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleMenuItemClick(color) {
        setSelectedColor(color);
      
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return <div><Button size='small' endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} onClick={handleClickListItem}>{selectedColor !== 20 && <div className='color-square' style={{ backgroundColor: colors[selectedColor].value }}></div>} <span style={{ marginLeft: 1, textTransform: "capitalize" }}>{colors[selectedColor].label}</span> </Button>

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
                <MenuItem onClick={() => handleMenuItemClick(20)}>
                    {selectedColor === 20 && <ListItemIcon>
                        <Check />
                    </ListItemIcon>}
                    Tüm renkler
                </MenuItem>

                <ColorPicker colors={colors} onChange={handleMenuItemClick} selectedColor={selectedColor} />
            </MenuList>

        </Menu>
    </div>
}