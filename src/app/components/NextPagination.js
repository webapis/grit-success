'use client'
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation'
export default function NextPagination({ pageCount, page }) {
    const router = useRouter()


    function handleChange(event, value){
        event.preventDefault()
        const href = `/page/${value}`
        router.push(href)
    }

    return <Pagination count={pageCount} onChange={handleChange} page={page} />

}
