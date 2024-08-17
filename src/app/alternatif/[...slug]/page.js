


import React from 'react';
import WeddingDressList from '../components/WeddingDressList';
import aggegatedData from '../../../../aggregated-data/alternatif/dataWithAveragePrice.json'
import AppBarComp from '../components/AppBarComp'



export async function generateMetadata() {

  return {
    title: 'DeFacto, Koton ve Addax Alternatifleri – Şık Gelinlikler',
    description: 'DeFacto, Koton ve Addax gibi markalara alternatif şık gelinlikler arıyorsanız, aradığınızı bulamadıysanız, size uygun diğer siteleri keşfedin. Özel gününüz için zarif ve uygun fiyatlı gelinlik seçenekleri burada.',
    keywords: 'DeFacto gelinlik alternatifleri, Koton gelinlik alternatifleri, Addax gelinlik alternatifleri, şık gelinlikler, zarif gelinlikler, uygun fiyatlı gelinlikler, kadın gelinlikleri, gelinlik satın alabileceğiniz siteler'

  }
}
const App = () => {


  return (

    
    <div className="App">
      <AppBarComp>
      <WeddingDressList dresses={aggegatedData} />
      </AppBarComp>

    </div>
  );
};

export default App;