require("dotenv").config();


const sql = require('mssql/msnodesqlv8');
const { deaccent } = require('./deaccent.js')
const {groupByServiceName}=require('./groupByServiceName.js')
const { removeDuplicatesAndCollectTitles } = require('./removeDuplicatesAndCollectTitles.js')

debugger
const fs = require('fs')
// config for your database
const config = {
  database: 'ForGoogleAdense',
  server: '(localdb)\\v11.0',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
};
console.log('starting sql');

const pool = new sql.ConnectionPool(config);
pool.connect().then(() => {

  pool.request().query('select * from View_Sponsor_Brands', async (err, result) => {
    if (err) res.send(err)
    const objects = result.recordsets[0]
    const objectsWithTags = objects.filter(f => f.Website !== 'YBA').map((m, i) => { return { ...m, id: i, tag: deaccent(m.TVSeriesTitle).replaceAll(' ', '-').toLowerCase() } })
    debugger
    const removeDuplicateDizi = removeDuplicatesAndCollectTitles(objectsWithTags, 'Website')




const groupedData = groupByServiceName(removeDuplicateDizi)
    debugger
    fs.writeFileSync(`${process.cwd()}/src/app/dizi-sponsor-kategori/page-data/keywordMeta.json`, JSON.stringify(groupedData), { encoding: 'utf8' })
    fs.writeFileSync(`${process.cwd()}/src/app/dizi-sponsor-kategori/page-data/sponsor-kategori.json`, JSON.stringify(removeDuplicateDizi), { encoding: 'utf8' })
    console.log('data uploaded', objectsWithTags.length)

  })
  sql.close();
  console.log('end sql');
})




function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};