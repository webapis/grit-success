require("dotenv").config();
const algoliasearch = require('algoliasearch');
const client = algoliasearch("7JF244QSZZ", '9c4018bdcedb542cb7a0c9e5453aa7b0');
const sql = require('mssql/msnodesqlv8');
const {deaccent}=require('./deaccent.js')
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
    const objectsWithTags =objects.filter(f=> f.Website!=='YBA').map((m,i)=>{return {...m,id:i,tag: deaccent( m.TVSeriesTitle).replaceAll(' ','-').toLowerCase() }})
    debugger
    const groubByDizi = groupBy(objectsWithTags, 'TVSeriesTitle')
    for (let currentGroup in groubByDizi) {
      const toplamSponsor = groubByDizi[currentGroup].length
      
  
      groubByDizi[currentGroup] = {...groubByDizi[currentGroup][0],toplamSponsor}

      

    }
    debugger
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