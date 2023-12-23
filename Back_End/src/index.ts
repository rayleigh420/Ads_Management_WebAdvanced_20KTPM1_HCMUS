import express, { Request, Response, NextFunction } from 'express'
const app = express()
const router = express.Router()
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { myDataSource } from './orm/connectDb'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3001

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err)
  })

app.use(express.json())
app.use(defaultErrorHandler)
app.listen(PORT, () => {
  console.log('server is running on port', PORT)
})
