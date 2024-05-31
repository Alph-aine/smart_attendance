import express, { type Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger'
import errorHandler from './middlewares/error'
import authRouter from './routes/auth'
import profileRouter from './routes/profile'
import courseRouter from './routes/course'

const app = express()

// Body Parser
app.use(express.json())
app.use(cookieParser())

// CORS
app.use(
  cors({
    credentials: true // allows cookies from the frontend
  })
)

app.get('/', (_, res: Response) => {
  res.send('Welcome to the smart attendance system')
})

// auth router
app.use(authRouter)

// profiles
app.use(profileRouter)

// courses
app.use(courseRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

// Error handler
app.use(errorHandler)
export default app
