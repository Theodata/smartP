import { Pool } from 'pg'
import dotenv from 'dotenv'

const current_env = process.env.NODE_ENV || 'dev';
dotenv.config()
const config = {
  "dev": {
    host: process.env.host,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.database
  },
  "test": process.env.testDB,
  "production": process.env.productionDB
}

const pool = new Pool(
  config[current_env]
)
pool.connect()
.then(()=>console.log(`connected to ${current_env} DB`))
.catch((err)=>console.log(err))

export default pool;