
import Navigation from "./components/Navigations"

import getNavigationData from './components/getNavigationData';

export default async function Application({ selectedGender }) {

    const data = await getNavigationData({ URI: 'data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json' })

    return <Navigation navData={data} selectedGender={selectedGender} />

}