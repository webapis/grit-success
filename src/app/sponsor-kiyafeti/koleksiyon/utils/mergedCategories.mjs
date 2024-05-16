
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);
const koleksiyon = require(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/koleksiyon/meta-data/koleksiyon.json'))


const kategoryArray = [...koleksiyon]

export default kategoryArray