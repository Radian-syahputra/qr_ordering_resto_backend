import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoute from './modules/auth/auth.router'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Router
app.use('/api/auth', authRoute)

app.get('/', (req, res) => {
    res.send('Server Berjalan')
})


app.listen(PORT, () => {
    console.log(`Server Berjalan Di http://localhost:${PORT}`);
})
