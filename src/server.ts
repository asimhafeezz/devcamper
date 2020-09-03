import express, { Application } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import {errorHandler} from './middleware/error'
import { connectDB } from './config/db'
import 'colors'

//load env vars
dotenv.config({path:'./env/config.env'})

//connect database
connectDB()

//route files
import bootcamps from './routes/bootcamp'

const app: Application = express()

//body parser

app.use(express.json())

//Dev logging middleware
process.env.NODE_ENV === 'development' && app.use(morgan('dev'))

// mount routers
app.use('/api/v1/bootcamps' , bootcamps)
app.use(errorHandler)

const PORT: number|string = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgWhite.black))