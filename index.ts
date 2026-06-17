import express from 'express'
import mongoose from 'mongoose'
import router from './src/routes/router'
import dotenv from 'dotenv'
import responser from 'responser'
import { logError, logInfo } from './src/helpers/logger'
import cors from 'cors'

dotenv.config()

const app = express()
const port = Number(process.env.PORT ?? 4000)
const mongoString = process.env.DATABASE_URL
const isVercel = process.env.VERCEL === '1'

// Middlewares
app.use(express.json())
app.use(responser)

app.use(cors())

// Rotas
app.use(router)

const connectToDatabase = async () => {
  if (!mongoString) {
    throw new Error('DATABASE_URL não foi configurada.')
  }

  if (mongoose.connection.readyState === 1) {
    return
  }

  await mongoose.connect(mongoString)
  logInfo('database.connected')
}

const startServer = async () => {
  await connectToDatabase()

  app.listen(port, () => {
    logInfo('server.started', { port })
  })
}

if (process.env.NODE_ENV !== 'test') {
  const bootstrap = isVercel ? connectToDatabase : startServer

  bootstrap().catch((error: unknown) => {
    logError('server.startup_failed', error, { port })
    process.exit(1)
  })
}

export default app
