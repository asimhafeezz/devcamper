import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'

//load env vars
dotenv.config({path:'./config/config.env'})

const app: Application = express()

app.get('/' , (req: Request , res: Response) => {
    res.send({
        success:true
    })
})

const PORT: number|string = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))