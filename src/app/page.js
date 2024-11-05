

import Application from "./sponsor-kiyafeti/Application"
import TopNavigation from "./components/TopNavigation"
export  function generateMetadata() {

  return {
    title: 'Sponsor Kiyafeti',

  }
}

export default  function Home(props) {


  return <>    <TopNavigation selected={0}/>
    <Application {...props} gender="kadin"/>
</>

}