import express, {type Response} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


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

export default app