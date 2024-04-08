

import Application from "./Application"
import TopNavigation from "../components/TopNavigation"
export async function generateMetadata() {

  return {
    title: 'Sponsor Kiyafeti',

  }
}

export default async function Home(props) {


  return <>    <TopNavigation selected={3}/>
    <Application {...props} gender="kadın"/>
</>

}