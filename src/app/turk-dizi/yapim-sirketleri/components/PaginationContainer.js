'use client'

import Link from 'next/link';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

export default function PaginationContainer({ totalPages, currentPage, basePath }) {
    return (
        <Stack spacing={2} alignItems="end" mt={3}>
            <Pagination 
                count={totalPages} 
                page={parseInt(currentPage)} 
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        href={item.page === 1 ? basePath : `${basePath}/sayfa/${item.page}`}
                        {...item}
                    />
                )}
            />
        </Stack>
    );
}