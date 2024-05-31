import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import allRoutes from './Routes/allRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

const port = process.env.PORT || 3501
const dbUrl = process.env.dbString

app.use(express.json())
app.use(cors())
app.use(cookieParser())


// Routes
app.use('/', allRoutes)

app.get('/*', async (req, res) => {
    res.status(200).send('Server is up and running!')
})

mongoose
    .connect(dbUrl)
    .then(() => {
        console.log('Connected to DB Successfully!')
        app.listen(port, () => {
            console.log(`Server running at port ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })