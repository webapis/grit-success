'use client'
// App.js
import { InstantSearchNext } from 'react-instantsearch-nextjs';

import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import ActorTable from './ActorTable';

const searchClient = algoliasearch('7JF244QSZZ', 'af8e387eae1a3614f7b0ba204c59f4a5');

const customSearchClient = {
    search(requests) {
        return fetch(`${window.location.origin}/dizikiyafeti-dashboard/search`, {
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
        console.log('response', response)
    
    };

    return (
        <InstantSearchNext indexName="dizikiyefeti" searchClient={customSearchClient} >
            <ActorTable  onActorEdit={handleActorEdit}  />
       
        </InstantSearchNext >
    );
};

export default App;


