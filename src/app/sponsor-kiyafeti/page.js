

import Application from "./Application"
import TopNavigation from "../components/TopNavigation"
export async function generateMetadata() {

  return {
    title: 'Sponsor Kiyafeti',

  }
}

export default async function Home(props) {


  return <>    <TopNavigation selected={0}/>
    <Application {...props} gender="kadın"/>
</>

}


export async function generateStaticParams() {

    const file = await fs.readFile(process.cwd() +  `src/app/sponsor-kiyafeti/data/kadın/sponsorkiyafeti.json`, 'utf8');
    const data = JSON.parse(file);
    return data.filter(f=>f.gender==='kadın').map((post) => {
      const {category,gender}= post
      return {
        slug: [gender,category,'sayfa',1]
      }
      
    })
}