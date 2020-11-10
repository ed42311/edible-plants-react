import * as dotenv from 'dotenv'
import express from 'express'
import { use as passUse, initialize } from 'passport'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { json, urlencoded } from 'body-parser'

// Local
import { exitOne, stringToNumber } from './utils'
import { auth as authApi, loggerMiddleware } from './middleware'
import {
  baseRouter,
  plantRouter,
  userRouter,
  apiRouter,
  authRouter,
} from './routes'
import { localLoginStrategy, localSignupStrategy } from './passport'

// Configuration Options
dotenv.config()
const { PORT } = process.env
const port: number = stringToNumber(PORT)
const databaseName = 'plants'
const dbUri = `mongodb://localhost:27017/${databaseName}`
const mongodbOpts = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// Check port and set
exitOne(PORT)
const app = express()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(json())
app.use(initialize())
app.use(urlencoded({ extended: true }))

// Local Middlewares
app.use(loggerMiddleware)
passUse('local-signup', localSignupStrategy)
passUse('local-login', localLoginStrategy)

// Routes
// Public
app.use(baseRouter)

// Auth
app.use('/auth', authRouter)

// Private
app.use('/api', authApi)
app.use('/api', apiRouter)
app.use('/api', userRouter)
app.use('/api', plantRouter)

// Attach to mongo
mongoose.connect(dbUri, mongodbOpts, () => {
  console.log('Connected to database')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
