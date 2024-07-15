import TVSeriesCompany from "./TVSeriesCompany";
import CompanyPage from "./CompanyPage";

export default {
    title:'turk-dizi/TVSeriesCompany',
    component:TVSeriesCompany
}

const companyData = {
    logo: 'data:image/jpeg;base64,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',
    title: 'Ay yapım',
    description: 'Company description...',
    tvSeries: [
        {
            id: 0,
            title: 'Gaddar',
            year: 2023,
            thumbnail: 'https://ayyapim.com/media/images/yapim/1708006081.jpg?v=1721024364',
            streamingUrl:'https://ayyapim.com/media/images/yapim/1708006081.jpg?v=1721024364'
          },
      {
        id: 1,
        title: 'Ne Gemiler Yaktım',
        year: 2023,
        thumbnail: 'https://ayyapim.com/media/images/yapim/ne-gemiler-yaktim.jpg?v=1721024364',
           streamingUrl:'https://ayyapim.com/media/images/yapim/1708006081.jpg?v=1721024364'
      },
      {
        id: 2,
        title: 'Ne Gemiler Yaktım',
        year: 2023,
        thumbnail: 'https://ayyapim.com/media/images/yapim/ne-gemiler-yaktim.jpg?v=1721024364',
           streamingUrl:'https://ayyapim.com/media/images/yapim/1708006081.jpg?v=1721024364'
      },
      {
        id: 1,
        title: 'Ne Gemiler Yaktım',
        year: 2023,
        thumbnail: 'https://ayyapim.com/media/images/yapim/ne-gemiler-yaktim.jpg?v=1721024364',
           streamingUrl:'https://ayyapim.com/media/images/yapim/1708006081.jpg?v=1721024364'
      },
      {
        id: 1,
        title: 'Ne Gemiler Yaktım',
        year: 2023,
        thumbnail: 'https://ayyapim.com/media/images/yapim/ne-gemiler-yaktim.jpg?v=1721024364',
           streamingUrl:'https://ayyapim.com/media/images/yapim/1708006081.jpg?v=1721024364'
      },
      {
        id: 1,
        title: 'Ne Gemiler Yaktım',
        year: 2023,
        thumbnail: 'https://ayyapim.com/media/images/yapim/ne-gemiler-yaktim.jpg?v=1721024364',
           streamingUrl:'https://ayyapim.com/media/images/yapim/1708006081.jpg?v=1721024364'
      },
      {
        id: 1,
        title: 'Ne Gemiler Yaktım',
        year: 2023,
        thumbnail: 'https://ayyapim.com/media/images/yapim/ne-gemiler-yaktim.jpg?v=1721024364',
           streamingUrl:'https://ayyapim.com/media/images/yapim/1708006081.jpg?v=1721024364'
      },
      // ... more TV series
    ],
  };
export const Primary =()=> <TVSeriesCompany company={companyData}/>
export const CompanyPagePrimary =()=> <CompanyPage company={companyData}/>