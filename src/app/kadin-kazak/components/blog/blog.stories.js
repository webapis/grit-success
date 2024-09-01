
import BlogBox from "./BlogBox"
import ProductCard from "./ProductCard"
export default {
    title: 'KADIN KAZAK',
    component: BlogBox

}


const data = [{
    title: 'Boğazlı Kazak',
    description: `Boğazlı kazak, boynun tamamını örtecek kadar kumaşa sahip bir çeşit kazaktır. Bazen ekstra kumaş eklenir ve yaka, boyun için sert bir örtü oluşturacak şekilde katlanabilir şekilde tasarlanır.
Boğazlı kazak hem erkek hem de kadın çeşitleri ile mevcuttur. En iyi şekilde, vücudun şeklini vurgulayan dar kesimli bir giysi olarak giyilir.
Boğazlı kazak tek başına giyilebileceği gibi, daha resmi veya şık bir görünüm için ceket veya blazer ile de eşleştirilebilir. Ayrıca, giyenin boynunu vurgulamak üzere tasarlanmış daha düşük yakalı bir hırka veya düz kazak ile de giyilebilir.`,
    alt: 'alt',
    link: 'link',
    src: 'https://i.pinimg.com/564x/d7/f0/34/d7f034ae8d2a234bfeedb908b1e2b41b.jpg'
},
{
    title: 'Boğazlı Kazak',
    description: `Boğazlı kazak, boynun tamamını örtecek kadar kumaşa sahip bir çeşit kazaktır. Bazen ekstra kumaş eklenir ve yaka, boyun için sert bir örtü oluşturacak şekilde katlanabilir şekilde tasarlanır.
Boğazlı kazak hem erkek hem de kadın çeşitleri ile mevcuttur. En iyi şekilde, vücudun şeklini vurgulayan dar kesimli bir giysi olarak giyilir.
Boğazlı kazak tek başına giyilebileceği gibi, daha resmi veya şık bir görünüm için ceket veya blazer ile de eşleştirilebilir. Ayrıca, giyenin boynunu vurgulamak üzere tasarlanmış daha düşük yakalı bir hırka veya düz kazak ile de giyilebilir.`,
    alt: 'alt',
    link: 'link',
    src: 'https://i.pinimg.com/564x/d6/1a/9d/d61a9db027bc29871ecdf2f37e482233.jpg'
}




]
const prod ={
    title: "Çizgili Siyah Moda Tutkusu Çizgili Salaş Triko Kazak",
    img: "https://www.dilvin.com.tr/productimages/130304/middle/101a10536_acikbej.jpg",
    link: "https://www.adl.com.tr/siyah-moda-tutkusu-cizgili-salas-triko-kazak-8681927681200/",
    priceFormatted: "₺999,95",
    brand: "adl",
  }
export const Primary = () => data.map(m => <BlogBox title={m.title} description={m.description} alt={m.alt} link={m.link} src={m.src} />)

export const ImageBox=()=><ProductCard product={prod}/>