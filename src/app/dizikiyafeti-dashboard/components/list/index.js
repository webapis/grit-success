'use client'
// App.js
import { InstantSearchNext } from 'react-instantsearch-nextjs';

import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import ActorTable from './ActorTable';



const customSearchClient = {
    search(requests) {
        return fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/dizikiyafeti-dashboard/search`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({requests}),
        }).then(res => res.json());
    }
};

const App = () => {
    const router = useRouter()
    console.log('router',router)
    const handleActorEdit = async (editedActor) => {
        const response = await fetch('/dizikiyafeti-dashboard/api', { method: 'post', body: JSON.stringify(editedActor) })
        console.log('response', response)
    
    };

    return (
        <InstantSearchNext indexName="dizikiyefeti" searchClient={customSearchClient} >
       
            <ActorTable  onActorEdit={handleActorEdit}  />
       
        </InstantSearchNext>
    );
};

export default App;


