import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'

//route files
import bootcamps from './routes/bootcamp'

//load env vars
dotenv.config({path:'./config/config.env'})

const app: Application = express()

// mount routers
app.use('/api/v1/bootcamps' , bootcamps)

const PORT: number|string = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))