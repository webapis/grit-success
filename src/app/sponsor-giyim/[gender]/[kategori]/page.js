//import navigationData from '../../../../../data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json'

import genderData from '../../components/genderData';
import SponsorGiyimDrawerContainer from '../../components/drawer/SponsorGiyimDrawerContainer';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import getNavigationData from '../../components/getNavigationData';

const navigationData = await getNavigationData({URI:'data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json'})
const getCategoryData = (genderDecoded, kategoriDecoded) => {
    const mainCategory = navigationData.find(item => item.title === genderDecoded);

    if (!mainCategory) return null; // If the main genderDecoded is not found

    const kategoriDecodedData = mainCategory.children.find(child => child.title === kategoriDecoded);

    if (!kategoriDecodedData) return null; // If the sub-genderDecoded is not found

    return kategoriDecodedData; // Return the filtered data
};


export default function Page({ params: { gender, kategori,id } }) {
  debugger
    const genderDecoded = decodeURI(gender)
    const kategoriDecoded = decodeURI(kategori).replace('-',' ').toLowerCase()
    const selectedGender = genderData.find(f => f.urlGender === genderDecoded).index
    const genderDecodedData = getCategoryData(genderDecoded, kategoriDecoded)

    if (!genderDecodedData) {
        return <p>Category not found</p>;
    }

    return (

        <SponsorGiyimDrawerContainer selectedGender={selectedGender}>
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
        </SponsorGiyimDrawerContainer>
    );

    return
}


export async function generateStaticParams() {
    const datas = await getNavigationData({ URI: 'data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json' })
    const paramCandidates = []
    for (let d in datas) {
      const currentNav = datas[d]
      const gender = currentNav.title.replace(' ', '-').toLowerCase()
      const children2 = currentNav.children
      for (let c2 in children2) {
        const currentc2 = children2[c2]
        const kategori = currentc2.title.replace(' ', '-').toLowerCase()
    
        const id = currentc2.uid
        paramCandidates.push({ params: { gender, kategori,id } })
        debugger

  
  
      }
  
  
    }
  
    debugger
  
    return paramCandidates
  }