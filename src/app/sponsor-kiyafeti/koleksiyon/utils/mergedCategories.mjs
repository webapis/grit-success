
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);

const buyukbeden = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/koleksiyon/meta-data/buyuk-beden.json'))
const davet = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/koleksiyon/meta-data/davet.json'))
const elbise = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/koleksiyon/meta-data/elbise.json'))
const gelinlik = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/koleksiyon/meta-data/gelinlik.json'))
const hamile = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/koleksiyon/meta-data/hamile.json'))
const mezuniyet = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/koleksiyon/meta-data/mezuniyet.json'))
const ofis = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/koleksiyon/meta-data/ofis.json'))
const spor = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/koleksiyon/meta-data/spor.json'))
const kategoryArray = [ ...elbise,...buyukbeden,...davet,...gelinlik,...hamile,...mezuniyet, ...ofis,...spor]

export default kategoryArray