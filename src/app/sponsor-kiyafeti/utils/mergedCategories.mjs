
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);

const buyukbeden = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/buyuk-beden.json'))
const davet = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/davet.json'))
const elbise = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/elbise.json'))
const gomlekBluzTunik = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/gomlek-bluz-tunik.json'))
const tisortAtletBody = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/tisort-atlet-body.json'))
const kazakHirkaSuveter = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/kazak-hirka-suveter.json'))
const triko = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/triko.json'))
const sweatshirt = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/sweatshirt-hoodie.json'))
const pantolon = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/pantolon-esofman-tayt-jogger.json'))
const sortEtek = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/sort-etek.json'))
const blazerCeketYelek = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/blazer-ceket-yelek.json'))
const kaban = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/kaban-mont-palto-manto-pardosu-trenckot.json'))
const plaj = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/plaj.json'))
const gecelik = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/gecelik-sabahlik-pijama-kimono.json'))
const icgiyim = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/ic-giyim.json'))
const bag = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/bag.json'))
const ayakkabi = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/ayakkabi.json'))
const kozmetik = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/kozmetik.json'))
const taki = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/taki.json'))
const sapka = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/sapka.json'))
const corapEldiven = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/сorap-eldiven.json'))
const salAtkiFular = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/sal-atki-fular.json'))
const kemer = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/kemer.json'))
const toka = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/toka.json'))
const gelinlik = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/gelinlik.json'))
const hamile = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/hamile.json'))
const mezuniyet = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/mezuniyet.json'))
const ofis = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/ofis.json'))
const spor = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/spor.json'))
const kategoryArray = [...elbise, ...davet, ...gelinlik, ...mezuniyet,  ...gomlekBluzTunik, ...tisortAtletBody, ...kazakHirkaSuveter, ...triko,...sweatshirt,...pantolon,...sortEtek,...blazerCeketYelek,...kaban,...ofis, ...spor, ...buyukbeden, ...hamile,...plaj,...gecelik,...icgiyim,...bag,...ayakkabi,...kozmetik,...taki,...sapka,...corapEldiven,...salAtkiFular,...kemer,...toka]

export default kategoryArray