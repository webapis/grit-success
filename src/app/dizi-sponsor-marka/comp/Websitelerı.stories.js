import  Grid  from '@mui/material/Grid';
import WebsiteInfoComponent from './WebsiteInfoComponent'

const singleData= {
    "Name": "3p",
    "Website": "https://www.3p.tv.tr/",
    "ServiceName": "Ürün Yerleştirme Ajansı",
    "Acyklama": "3p iletişim çözümleri sunan bir markadır. Marka, stratejik planlama, medya planlama ve satın alma, içerik üretimi, dijital pazarlama, halkla ilişkiler, etkinlik yönetimi ve kreatif hizmetler gibi alanlarda faaliyet göstermektedir.",
    "TOTAL": 4,
    "TVSeriesTitle": "Bahar",
    "Tag": "31",
    "brandTag": "3p",
    "h3": " 3P: İletişim Çözümleri",
    "id": 8,
    "tag": "bahar",
    "duplicateTitles": [
        "Bahar",
        "Bambaşka Biri",
        "Ego",
        "Kader Bağları",
        "Kara",
        "Kara Sevda",
        "Kiralık Aşk",
        "Kirli Sepeti",
        "Kısmet",
        "Kızılcık Şerbeti",
        "Kopuk",
        "Korkma Ben Yanındayım",
        "Sandık Kokusu",
        "Veda Mektubu",
        "Yasak Elma"
    ]
}
export default {

    title:'Benzer Hizzmetler',
    component:WebsiteInfoComponent
}

const data = [{
  "Name": "3p",
  "Website": "https://www.3p.tv.tr/",
  "ServiceName": "Ürün Yerleştirme Ajansı",
  "Acyklama": "3p iletişim çözümleri sunan bir markadır. Marka, stratejik planlama, medya planlama ve satın alma, içerik üretimi, dijital pazarlama, halkla ilişkiler, etkinlik yönetimi ve kreatif hizmetler gibi alanlarda faaliyet göstermektedir.",
  "TOTAL": 4,
  "TVSeriesTitle": "Bahar",
  "Tag": "31",
  "brandTag": "3p",
  "h3": " 3P: İletişim Çözümleri",
  "id": 8,
  "tag": "bahar",
  "duplicateTitles": [
      "Bahar",
      "Bambaşka Biri",
      "Ego",
      "Kader Bağları",
      "Kara",
      "Kara Sevda",
      "Kiralık Aşk",
      "Kirli Sepeti",
      "Kısmet",
      "Kızılcık Şerbeti",
      "Kopuk",
      "Korkma Ben Yanındayım",
      "Sandık Kokusu",
      "Veda Mektubu",
      "Yasak Elma"
  ]
},
{
  "Name": "Cottonbox",
  "Website": "https://cottonbox.com.tr/",
  "ServiceName": "Ev tekstili ürünler ",
  "Acyklama": "Cottonbox, uyku tekstili ürünlerinde uzmanlaşmış bir markadır. Nevresim takımları, yorganlar, battaniyeler, çarşaflar, yastık kılıfları ve pike takımları gibi geniş bir ürün yelpazesine sahip olan Cottonbox, yüksek kaliteli ve konforlu ürünler sunmaktadır.",
  "TOTAL": 1,
  "TVSeriesTitle": "Altın Kafes",
  "Tag": "33",
  "brandTag": null,
  "h3": "Cottonbox: Uykuya Dokun, Hayallere Uç",
  "id": 746,
  "tag": "altin-kafes",
  "duplicateTitles": [
      "Altın Kafes",
      "baba",
      "Bahar",
      "Bambaşka Biri",
      "Bir Derdim Var",
      "Dilek Taşı",
      "Ego",
      "Gaddar",
      "Hudutsuz Sevda",
      "Kara",
      "Kara Ağaç Destanı",
      "Kara Sevda",
      "Kiralık Aşk",
      "Kirli Sepeti",
      "Kızılcık Şerbeti",
      "Kopuk",
      "Korkma Ben Yanındayım",
      "Kötü Kan",
      "Safir",
      "Şahane Hayatım",
      "Sakla Beni",
      "Sandık Kokusu",
      "Taş Kağıt Makas",
      "Tuzak",
      "Veda Mektubu",
      "Yalan",
      "Yalı Çapkını",
      "Yan Oda",
      "Yargı",
      "Yasak Elma"
  ]
},
    {
      "Name": "the Mia",
      "Website": "https://www.themia.com.tr/",
      "ServiceName": "Mutfak, ev gereçleri, ev tekstili",
      "Acyklama": "THE MIA, ev dekorasyonu, mutfak ve banyo aksesuarları, tekstil ürünleri ve hediyelik eşya gibi birçok farklı kategoride ürün yelpazesine sahip bir markadır.",
      "TOTAL": 12,
      "TVSeriesTitle": "Yasak Elma",
      "Tag": "1",
      "h3": "THE MIA: Evinize Dokunacak Şıklık",
      "id": 3255
    },
    {
      "Name": "Bambum",
      "Website": "https://www.bambum.com.tr/",
      "ServiceName": "Mutfak, ev gereçleri, ev tekstili",
      "Acyklama": "Bambum, mutfak gereçleri, ev aksesuarları ve tekstil ürünleri üreten bir markadır. Bambu ve doğal malzemelerden üretilen Bambum ürünleri, sağlıklı ve şık sunumlar için idealdir.",
      "TOTAL": 5,
      "TVSeriesTitle": "Tuzak",
      "Tag": "7",
      "h3": "Bambum: Sağlıklı ve Şık Sunumlar",
      "id": 376
    },
    {
      "Name": "Karaca Home",
      "Website": "https://www.karaca-home.com/",
      "ServiceName": "Yemek takımı, tencere seti, çatal kaşık bıçak takımı, küçük ev aletleri ve ev tekstili",
      "Acyklama": "Karaca Home, kaliteli ev tekstili ve mutfak ürünleri sunan tanınmış bir Türk markasıdır.",
      "TOTAL": 4,
      "TVSeriesTitle": "Kızılcık Şerbeti",
      "Tag": "17",
      "id": 1668
    }
  ];



export const Primary =()=><Grid container spacing={1}>{data.map(m=><Grid item> <WebsiteInfoComponent data={m}/></Grid>)}</Grid>