import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pzzrgorwoofzvvrwuyqt.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey,
  // { global: {
  //   fetch: (url, options = {}) => {
  //     return fetch(url, { ...options, cache: 'no-store' });
  //   }
  // } },
)
async function getViews({table}){
return  await supabase.from(table).select("*").limit(400)
}

export default getViews