

import fs from 'fs';
import path from 'path';
import React from 'react';
import WeddingDressList from '../components/WeddingDressList';
import getViews from "@/app/utils/firebase/supabase";


import AppBarComp from '../components/AppBarComp';



export async function generateMetadata({ params: { slug } }) {
  const keyword = slug[0].replaceAll('-', '_')

  const metaFilePath = path.join(process.cwd(), 'src/app/alternatif/page-meta', `${keyword}.json`);
  debugger
  debugger
  const metaDataRow = fs.readFileSync(metaFilePath, 'utf8');
  debugger
  const metaData = JSON.parse(metaDataRow)

  return {
    title: metaData.title,
    description: metaData.description,
    keywords: metaData.keywords

  }
}
const App = async ({ params: { slug } }) => {
  const keyword = slug[0].replaceAll('-', '_')
  const userViewData = await getViews({ table: 'alternatif' })
  const filePath = path.join(process.cwd(), 'aggregated-data/alternatif', keyword, `dataWithAveragePrice.json`);
  debugger
  const dataRow = fs.readFileSync(filePath, 'utf8');

  const data = JSON.parse(dataRow)

  const metaFilePath = path.join(process.cwd(), 'src/app/alternatif/page-meta', `${keyword}.json`);
  debugger
  debugger
  const metaDataRow = fs.readFileSync(metaFilePath, 'utf8');
  debugger
  const metaData = JSON.parse(metaDataRow)

  return (
    <div className="App">
      <AppBarComp>
        <WeddingDressList dresses={data} header={metaData.header} userViewData={userViewData} table={'alternatif'} />
      </AppBarComp>

    </div>
  );
};

export default App;




export async function generateStaticParams() {




  return [{ slug: ["gelinlik"] }, { slug: ["buyuk-beden-elbise"] }]




}