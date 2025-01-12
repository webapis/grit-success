require("dotenv").config();

const sql = require('mssql/msnodesqlv8');
const { deaccent } = require('./deaccent.js')
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
    const groubByDizi = groupBy(objectsWithTags, 'TVSeriesTitle')
    for (let currentGroup in groubByDizi) {
      const toplamSponsor = groubByDizi[currentGroup].length
      groubByDizi[currentGroup] = { ...groubByDizi[currentGroup][0], toplamSponsor }

    }
    //pageMetaData
    debugger
    const pageMetaData = Object.entries(groubByDizi).map(m => { return { url: deaccent(m[0]).replaceAll(' ', '-').toLowerCase(), ...m[1] } }).map(m => {
      const {
        TVSeriesTitle, url } = m
 
      return {
        "slug": `${url}-dizi-sponsorlari`,
        "pageTitle": `${TVSeriesTitle} Dizi Sponsorları`,
        "description": "",
        "dizi": TVSeriesTitle,
        "search": {
          "$and": [
            {
              "TVSeriesTitle": TVSeriesTitle
            }
          ]
        }
      }
    })


    debugger
    fs.writeFileSync(`${process.cwd()}/src/app/dizi/pageMetadata.json`, JSON.stringify(pageMetaData), { encoding: 'utf8' })
    fs.writeFileSync(`${process.cwd()}/src/app/dizi/dizisponsoru.json`, JSON.stringify(objectsWithTags), { encoding: 'utf8' })
    fs.writeFileSync(`${process.cwd()}/src/app/dizi/dizisponsoruMenu.json`, JSON.stringify(groubByDizi), { encoding: 'utf8' })
    debugger

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