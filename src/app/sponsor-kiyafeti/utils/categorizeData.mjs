
import { createRequire } from 'module';

import fs from 'fs'

import searchObject from './searchObject.mjs';

const require = createRequire(import.meta.url);
require("dotenv").config();

const top = require('./data/top.json')
const bottom = require('./data/bottom.json')
const dis = require('./data/dis.json')
const bag = require('./data/bag.json')
const ayakkabi = require('./data/ayakkabi.json')
const gender = require('./data/gender.json')
const color = require('./data/color.json')
const aksesuar = require('./data/aksesuar.json')
const plaj = require('./data/plaj.json')
const ev = require('./data/ev.json')
const icgiyim = require('./data/ic-giyim.json')
const triko = require('./data/triko.json')
const kozmetik = require('./data/kozmetik.json')
const hamile = require('./data/hamile.json')
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