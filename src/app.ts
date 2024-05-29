import express, {type Response} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger'
import errorHandler from './middlewares/error'


const app = express()

// Body Parser
app.use(express.json())
app.use(cookieParser())

// CORS
app.use(cors({
    credentials: true // allows cookies from the frontend
}))

app.get('/', (_, res: Response) => {
    res.send('Welcome to the smart attendance system')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

// Error handler
app.use(errorHandler)
export default app