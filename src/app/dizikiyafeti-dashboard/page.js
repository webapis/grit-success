import { Suspense } from 'react'

import List from './components/list'
export default function DizikiyafetiDashboard(){

    return<Suspense fallback={<p style={{height:'100vh'}}>Loading feed....</p>}>
    <List />
  </Suspense>

}