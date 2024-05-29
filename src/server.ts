import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'

dotenv.config({ path: __dirname + '/config/.env' })

connectDB()

const PORT = process.env.PORT ?? 3000

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})