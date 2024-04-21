
import { createRequire } from 'module';

import fs from 'fs'
import path from 'path';
import searchObject from './searchObject.mjs';
import mapPrice from './mapPrice.mjs'
import {deaccent} from './deaccent.mjs';
const require = createRequire(import.meta.url);
require("dotenv").config();

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
export default function categorizedProducts(items) {



  const data = items.map(m => { return { ...m, price: mapPrice(m.price) } }).map(m => {

    //gender
    const colorArray = color.map(m => m.keywords).flat()
    const colorKeyword = searchObject(m, colorArray)
    const colorName = color.find(f => f.keywords.includes(colorKeyword))

    //gender
    const genderArray = gender.map(m => m.keywords).flat()
    const genderKeyword = m['duplicateTitles'] ? searchObject({ ...m, duplicateTitles: m['duplicateTitles'].join(' ') }, genderArray) : searchObject(m, genderArray)
    const genderName = gender.find(f => f.keywords.includes(genderKeyword))
    //kategori
    const kategoryArray = [...aksesuar, ...icgiyim, ...top, ...bottom, ...dis, ...bag, ...ayakkabi, ...plaj, ...ev, ...kozmetik, ...hamile, ...taki]
    const flatkategoryArray = kategoryArray.map(m => m.keywords.map(m => m.split('=')).flat()).flat()
    const kategoryKeyword = searchObject(m, flatkategoryArray)
    debugger
    const kategoryName = [...aksesuar, ...icgiyim, ...top, ...bottom, ...dis, ...bag, ...ayakkabi, ...plaj, ...ev, ...kozmetik, ...hamile, ...taki].find(f => f.keywords.map(m => m.split('=')).flat().includes(kategoryKeyword))
    if (!genderKeyword) {
      debugger

    }
    if (!kategoryKeyword) {

      debugger

    }
const subcat =kategoryKeyword?kategoryArray.find(f=>f.keywords.map(m=>m.indexOf('=')!==-1 ? m.substring(0,m.indexOf('=')):m ).includes(kategoryKeyword) ) :'diğer'
const subkey = kategoryKeyword?subcat.keywords.find(f=>f.indexOf('=')!==-1? f.substring(0,f.indexOf('=')).includes(kategoryKeyword):f.includes(kategoryKeyword)  ):'diğer'


debugger

    return {
      ...m,
      color: colorKeyword ? colorName.name : "diğer",
      gender: genderKeyword ? genderName.name : "diğer",
      category: kategoryKeyword ? kategoryName.name : "diğer",
      subcat:kategoryKeyword? subkey.replace('=',' '):'diğer',
      group: kategoryKeyword ? kategoryName.group : "diğer"

    }



  })
  return data
}




function getDomainWithoutWwwAndTld(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?([^.]+)\..*/;
  const match = url.match(regex);
  return match ? match[1] : null;
}