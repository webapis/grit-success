'use client';

import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function PaginationContainer({ count, page, url }) {

    const handleChange = (event, value) => {
      if(value===1){
        window.location.replace(url.replace('/sayfa/', ''));
      }else{
        window.location.replace(url+ value)
      }

   
    };

    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Pagination 
            count={count} 
            page={page} 
            onChange={handleChange} 
            size="large"
            sx={{ '& .MuiPagination-ul': { justifyContent: 'center' } }}
          />
        </Box>
      </Container>
    );
}