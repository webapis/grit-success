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

    pool.request().query('select * from View_DiziKiyafeti', async(err, result) => {
          if(err) res.send(err)
          const objects = result.recordsets[0].map(m=>{return {...m,Time: Math.round( new Date(m.Time).getTime() /1000) }})
        
          const index = client.initIndex('dizikiyafeti');
          await  index.clearObjects()
          await  index.saveObjects(objects, { autoGenerateObjectIDIfNotExist: true });
        console.log('data uploaded',objects.length)
      })
      sql.close();
      console.log('end sql');
    })