import express from 'express'
import mongoose from 'mongoose'
import router from './src/routes/router'
import dotenv from 'dotenv'
import responser from 'responser'

dotenv.config()

const app = express()
const port = Number(process.env.PORT ?? 4000)
const mongoString = process.env.DATABASE_URL

// Middlewares
app.use(express.json())
app.use(responser)

// Rotas
app.use('/api', router)

const startServer = async () => {
  if (!mongoString) {
    throw new Error('DATABASE_URL não foi configurada.')
  }

  await mongoose.connect(mongoString)
  console.log('Database Connected')

  app.listen(port, () => {
    console.log(`API running on port ${port}.`)
  })
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
}

export default app
