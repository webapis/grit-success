require("dotenv").config();
const algoliasearch = require('algoliasearch');
const client = algoliasearch("7JF244QSZZ", '9c4018bdcedb542cb7a0c9e5453aa7b0');
const sql = require('mssql/msnodesqlv8');

// config for your database
const config = {
    database: 'ForGoogleAdense',
    server: '(localdb)\\v11.0',
    driver: 'msnodesqlv8',
    options : {
        trustedConnection : true
    }
};
console.log('starting sql');

const pool = new sql.ConnectionPool(config);
pool.connect().then(() => {

    pool.request().query('select * from View_Sponsor_Brands', async(err, result) => {
          if(err) res.send(err)
          const objects = result.recordsets[0]
          const filteredObjects= objects.filter(f=> f.Website!=='YBA')
          const mappedData =filteredObjects.map((m)=>{return {...m,}})
          const index = client.initIndex('dizisponsoru');
          await  index.clearObjects()
          await  index.saveObjects(filteredObjects, { autoGenerateObjectIDIfNotExist: true });
        console.log('data uploaded',filteredObjects.length)
      })
      sql.close();
      console.log('end sql');
    })