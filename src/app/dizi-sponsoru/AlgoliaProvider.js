'use client'

import algoliasearch from 'algoliasearch/lite';


const searchClient = algoliasearch("7JF244QSZZ", '9c4018bdcedb542cb7a0c9e5453aa7b0');
import { InstantSearchNext } from 'react-instantsearch-nextjs';

import 'instantsearch.css/themes/reset.css';

import 'instantsearch.css/themes/satellite.css';
export default function AlgoliaProvider({ children}) {


    return <InstantSearchNext indexName="dizisponsoru" searchClient={searchClient} routing>

        {children}

    </InstantSearchNext>
}


