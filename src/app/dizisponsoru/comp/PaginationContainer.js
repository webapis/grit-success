'use client';

import Pagination from '@mui/material/Pagination';
import Box  from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function PaginationContainer({ count, page, url }) {

    const handleChange = (event, value) => {
      window.location.replace(url+ value)
    };

    return <Stack 
      spacing={2}
      sx={{
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0'
      }}
    >
      <Pagination count={count} page={page} onChange={handleChange}/>
    </Stack>
}