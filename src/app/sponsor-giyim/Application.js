import Navigation from "./components/Navigations"
import navigation from '../../../data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json'



export default function Application({selectedGender}){


    return  <Navigation navData={navigation} selectedGender={selectedGender}/>
    
}