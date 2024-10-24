import navigationData from '../../../../../data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json'

import genderData from '../../components/genderData';
import SponsorGiyimDrawer from '../../components/drawer/SponsorGiyimDrawer';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
const getCategoryData = (genderDecoded, kategoriDecoded) => {
    const mainCategory = navigationData.find(item => item.title === genderDecoded);

    if (!mainCategory) return null; // If the main genderDecoded is not found

    const kategoriDecodedData = mainCategory.children.find(child => child.title === kategoriDecoded);

    if (!kategoriDecodedData) return null; // If the sub-genderDecoded is not found

    return kategoriDecodedData; // Return the filtered data
};


export default function Page({ params: { gender, kategori,id } }) {
  
    const genderDecoded = decodeURI(gender)
    const kategoriDecoded = decodeURI(kategori).replace('-',' ').toLowerCase()
    const selectedGender = genderData.find(f => f.urlGender === genderDecoded).index
    const genderDecodedData = getCategoryData(genderDecoded, kategoriDecoded)

    if (!genderDecodedData) {
        return <p>Category not found</p>;
    }

    return (

        <SponsorGiyimDrawer selectedGender={selectedGender}>
            <BreadcrumbsComponent urlPath={`/sponsor-giyim/${genderDecoded}/${kategoriDecoded}/${id}`}/>
            <h1>{genderDecodedData.title}</h1>
            <ul>
                {genderDecodedData.children.map((child) => {
                    debugger
                    return <li key={child.uid}>
                        <a href={`/sponsor-giyim/${genderDecoded}/${genderDecodedData.title.replace(' ', '-')}/${child.title.replace(' ', '-')}/${child.uid}`}>
                        {child.title}
                        </a>
                        </li>
                 } )}
            </ul>
        </SponsorGiyimDrawer>
    );

    return
}