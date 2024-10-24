import getNavigationData from "../getNavigationData";
import SponsorGiyimDrawer from "./SponsorGiyimDrawer";

export default async function SponsorGiyimDrawerContainer({ children, selectedGender }) {
    const navData = await getNavigationData({ URI: 'data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json' })
    return <SponsorGiyimDrawer selectedGender={selectedGender} navData={navData}>{children}</SponsorGiyimDrawer>
}