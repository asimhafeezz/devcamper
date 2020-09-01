import express, { Application } from 'express'
import dotenv from 'dotenv'

import morgan from 'morgan'

//route files
import bootcamps from './routes/bootcamp'

//load env vars
dotenv.config({path:'./config/config.env'})

const app: Application = express()

//Dev logging middleware
process.env.NODE_ENV === 'development' && app.use(morgan('dev'))

// mount routers
app.use('/api/v1/bootcamps' , bootcamps)

const PORT: number|string = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))