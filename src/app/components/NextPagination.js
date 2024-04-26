'use client'
//import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation'
//import LinearProgress from '@mui/material/LinearProgress';
export default function NextPagination({ pageCount, page,pagePrefix }) {
  //  const [loading, setLoading] = useState(false)
    const router = useRouter()


    function handleChange(event, value) {
        event.preventDefault()
     //   setLoading(true)
        const href = `${pagePrefix}page/${value}`
        router.push(href)

    }

    return <div> <Pagination count={pageCount} onChange={handleChange} page={page} />
        {/* {loading && <LinearProgress />} */}
    </div>

}
