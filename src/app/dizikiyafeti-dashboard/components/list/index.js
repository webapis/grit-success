'use client'
// App.js
import { InstantSearchNext } from 'react-instantsearch-nextjs';


import React from 'react';

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

    const handleActorEdit = async (editedActor) => {

        const response = await fetch('/dizikiyafeti-dashboard/api', { method: 'post', body: JSON.stringify(editedActor) })
     
    
    };

    return (
        <InstantSearchNext indexName="dizikiyefeti" searchClient={customSearchClient} >
            
            <ActorTable  onActorEdit={handleActorEdit}  />
       
        </InstantSearchNext>
    );
};

export default App;


