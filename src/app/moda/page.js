import Application from "../AlgoliaProvider"
import Categories from "../home/components/categories"
export async function generateMetadata() {

    return {
        title: 'Kıyafet Markaları',

    }
}

export default async function Home({ searchParams }) {

    console.log("searchParams", searchParams)

    return <Application query={searchParams} />
}

