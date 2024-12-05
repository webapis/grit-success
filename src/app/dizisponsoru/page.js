

import Application from "./Application"

import TopNavigation from "../components/TopNavigation";
export  function generateMetadata() {

  return {
    title: 'Dizi Sponsoru',

  }
}

export default  function Home(props) {




  return <>
{/* <TopNavigation selected={2}/> */}
    <Application {...props}/>
  

  </>

}