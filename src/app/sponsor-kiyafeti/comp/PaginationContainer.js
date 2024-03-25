'use client';

import Pagination from '@mui/material/Pagination';
export default function PaginationContainer({ count, page, url }) {

    const handleChange = (event, value) => {
      window.location.replace(url+ value)
    };

    return <Pagination count={count} page={page} onChange={handleChange}/>
}