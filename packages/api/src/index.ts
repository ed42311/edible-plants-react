import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { json, urlencoded } from 'body-parser'

// Local
import { WebpackHotModule } from '../../typings'
import { exitOne, stringToNumber } from './utils'
import { loggerMiddleware } from './middleware'

// Config
dotenv.config()
const { PORT } = process.env

// Check port and set
exitOne(PORT)
const port: number = stringToNumber(PORT)
const app = express()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

// Local Middlewares
app.use(loggerMiddleware)

// Routes
app.get('/test', (req, res) => {
  res.send('Hello world!')
})

app.post('/', (req, res) => {
  res.send(req.body)
})

const server = app.listen(port, () => {
  console.log(`Listenin on port ${port}`)
})

// HMR dev
declare const module: WebpackHotModule

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.close())
}
