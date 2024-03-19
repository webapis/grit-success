
import 'dotenv/config'

 import{ downloadCollection } from'./uploadCollection.mjs'

   const genders = [

    { gender: 'sponsor', gender1: 'temp-sponsor'  }
  ]

    for (let g of genders) {
        const { gender, gender1 } = g
        await downloadCollection(gender,gender1)
    }
 

