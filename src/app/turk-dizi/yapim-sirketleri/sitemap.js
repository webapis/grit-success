
import ysData from '../../../../turk-dizi-data/yapim-sirketleri.json'



export default async function sitemap() {

    return ysData.map((m) => {

        return {
            url: `https://www.glumzi.com/turk-dizi/yapim-sirketleri/${m.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly'
        }


    })
}