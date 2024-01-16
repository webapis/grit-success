
import BrandInfor from './components/BrandInfor'

import { promises as fs } from 'fs';
import { Grid } from '@mui/material';
export default async function Home() {
  const brandNames = await fs.readFile(process.cwd() + '/public/brandNames.json', 'utf8');
  const brandObjects = JSON.parse(brandNames)
  return <Grid container style={{ backgroundColor: "orange" }}>
      {brandObjects.map((m, i) => { return <Grid key={i} item> <BrandInfor description={m.description} tag={m.tag} title={m.title} /> </Grid> })}
    </Grid>
  
}


