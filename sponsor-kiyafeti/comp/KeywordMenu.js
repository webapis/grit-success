import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Check from '@mui/icons-material/Check';
//import Link from 'next/link';



const ITEM_HEIGHT = 48;

export default function AccountMenu({ obj, slug, id, letter, tooltipTitle, backgroundC }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {

    setAnchorEl(null);
  };
  const currentSlugState = slug.slice(0, slug.length - 2)


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title={tooltipTitle}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: backgroundC }}>{letter}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id={id}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            overflow: 'auto',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {Object.entries(obj).map((option) => {

          const nextcurrentSlugState = [...currentSlugState.map(m => decodeURI(m))]
          const test =[...nextcurrentSlugState]
     
    
          nextcurrentSlugState.indexOf(option[0]) === -1 ? (nextcurrentSlugState.reverse().splice(1,0,option[0]) && nextcurrentSlugState.reverse()): nextcurrentSlugState.splice(nextcurrentSlugState.indexOf(option[0]), 1)
          const nextSlugState = '/sponsor-kiyafeti/' + [...nextcurrentSlugState].join('/').toString()

          return <MenuItem component='a' href={nextSlugState + '/sayfa/1'} key={option[0]} selected={decodeURI(slug).includes(option[0])} >
            <>
            {decodeURI(slug).includes(option[0])?  <IconButton color="primary"><Check/></IconButton>:    <IconButton color="white">{"  "}  </IconButton>}
        
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}><span>{option[0]}</span> <span>{option[1].total}</span></div>
            </>
      
          </MenuItem>
        })}
      </Menu>
    </React.Fragment>
  );
}
