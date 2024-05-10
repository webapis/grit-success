
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);
const top = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/top.json'))
const bottom = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/bottom.json'))
const dis = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/dis.json'))
const bag = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/bag.json'))
const ayakkabi = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/ayakkabi.json'))
const gender = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/gender.json'))
const color = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/color.json'))
const aksesuar = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/aksesuar.json'))
const plaj = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/plaj.json'))
const ev = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/ev.json'))
const icgiyim = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/ic-giyim.json'))
const triko = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/triko.json'))
const kozmetik = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/kozmetik.json'))
const hamile = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/hamile.json'))
const taki = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/utils/meta-data/taki-mucevher.json'))

const kategoryArray = [...top,...aksesuar, ...icgiyim , ...bottom, ...dis, ...bag, ...ayakkabi, ...plaj, ...ev, ...kozmetik, ...hamile, ...taki,...triko]

export default kategoryArray