
import { createRequire } from 'module';

import fs from 'fs'
import path from 'path';
import searchObject from './searchObject.mjs';

const require = createRequire(import.meta.url);
require("dotenv").config();

const top = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/top.json'))
const bottom = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/bottom.json'))
const dis = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/dis.json'))
const bag = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/bag.json'))
const ayakkabi = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/ayakkabi.json'))
const gender = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/gender.json'))
const color = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/color.json'))
const aksesuar = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/aksesuar.json'))
const plaj = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/plaj.json'))
const ev = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/ev.json'))
const icgiyim = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/ic-giyim.json'))
const triko = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/triko.json'))
const kozmetik = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/kozmetik.json'))
const hamile = require(path.join(process.cwd(),'src/app/sponsor-kiyafeti/utils/data/hamile.json'))
export default function categorizedProducts(items) {


  const filterArray = ['Katlanabilir Kasa', 'LAPTOP KILIFI', 'Katlanabilir Kasa'];
  const data = items.map(m => {

    //gender
    const colorArray = color.map(m => m.keywords).flat()
    const colorKeyword = searchObject(m, colorArray)
    const colorName = color.find(f => f.keywords.includes(colorKeyword))

    //gender
    const genderArray = gender.map(m => m.keywords).flat()
    const genderKeyword = m['duplicateTitles'] ? searchObject({ ...m, duplicateTitles: m['duplicateTitles'].join(' ') }, genderArray) : searchObject(m, genderArray)
    const genderName = gender.find(f => f.keywords.includes(genderKeyword))
    //kategori
    const kategoryArray = [...top, ...bottom, ...dis, ...bag, ...ayakkabi, ...aksesuar, ...plaj, ...ev, ...icgiyim, ...triko, ...kozmetik,...hamile].map(m => m.keywords).flat()
    const kategoryKeyword = searchObject(m, kategoryArray)
    const kategoryName = [...top, ...bottom, ...dis, ...bag, ...ayakkabi, ...aksesuar, ...plaj, ...ev, ...icgiyim, ...triko, ...kozmetik,...hamile].find(f => f.keywords.includes(kategoryKeyword))
    if (!genderKeyword) {
debugger
   
    }
    if (!kategoryKeyword) {

   

    }

    return {
      ...m,
      color: colorKeyword ? colorName.name : "diğer",
      gender: genderKeyword ? genderName.name : "diğer",
      category: kategoryKeyword ? kategoryName.name : "diğer", 
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