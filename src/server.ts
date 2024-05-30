import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'

// eslint-disable-next-line n/no-path-concat
dotenv.config({ path: __dirname + '/config/.env' })

connectDB()

const PORT = process.env.PORT ?? 3000

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})