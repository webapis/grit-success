import navigationData from '../../../../../data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json'
const getCategoryData = (category, subCategory) => {
    const mainCategory = navigationData.find(item => item.title === category);

    if (!mainCategory) return null; // If the main category is not found

    const subCategoryData = mainCategory.children.find(child => child.title === subCategory);

    if (!subCategoryData) return null; // If the sub-category is not found

    return subCategoryData; // Return the filtered data
};


export default function Page({ params: { gender, kategori } }) {
  
    const category = decodeURI(gender)
    const subCategory = decodeURI(kategori).replace('-',' ').toLowerCase()

    const categoryData = getCategoryData(category, subCategory)

    if (!categoryData) {
        return <p>Category not found</p>;
    }

    return (
        <div>
            <h1>{categoryData.title}</h1>
            <ul>
                {categoryData.children.map((child) => (
                    <li key={child.uid}>{child.title}</li>
                ))}
            </ul>
        </div>
    );

    return
}