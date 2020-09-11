import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import 'colors'
import dotenv from 'dotenv'
import { connectDB } from './config/db'

//load env var
dotenv.config({path:'./env/config.env'})

//load model
import Bootcamp from './models/bootcamps'


//connect database
connectDB()

let oPath = path.resolve('./data/bootcamps.json')
console.log('main path' , oPath)
//Read json files
const bootcamps = JSON.parse(fs.readFileSync(oPath , 'utf-8'))

//import into DB
const importData = () => {
    Bootcamp.create(bootcamps)
    .then(()=> {
        console.log('Data is being Imported to Database'.green.inverse)
        process.exit()
    })
    .catch((error: Error)=> console.log('error occured in importing data to Database' , error.message.red.inverse))
}

//delete all data from Database
const deleteData = async () => {
    // Bootcamp.deleteMany()
    // .then(()=> {
    //     console.log('Data is being Deleted from Database'.green.inverse)
    //     process.exit()
    // })
    // .catch((error: Error)=> console.log('error occured in deleting data from Database' , error.message.red.inverse))
}

if(process.argv[2] === '-i'){
    importData()
}
else if(process.argv[2] === '-d'){
    deleteData()
}
