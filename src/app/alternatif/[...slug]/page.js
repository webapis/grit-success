import React from 'react';
import WeddingDressList from '../components/WeddingDressList';
import aggegatedData from '../../../../aggregated-data/alternatif/dataWithAveragePrice.json'
import AppBarComp from '../components/AppBarComp'
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