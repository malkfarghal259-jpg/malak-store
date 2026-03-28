import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'malak_store',
  multipleStatements: true,
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL database.')
})

export default connection
