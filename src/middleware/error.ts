import { NextFunction, Request , Response} from 'express';
import ErrorResponse from '../utils/errorResponse';

const errorHandler = ( err:any , req:Request , res: Response , next: NextFunction ) =>{

    let error = { ...err }

    // //set message
    error.message = err.message


    console.log(err)

    // mongoose bad objectId
    if(err.name === 'CastError') {
        let message: string = `Bootcamp not found with this id ${err.value}`
        err = new ErrorResponse( message , 404)
        }

    // Mongoose Duplicate key
    if(err.code === 11000){
        let message: string = 'Duplicate field value entered'
        err = new ErrorResponse( message , 400)
    }

    //mongoose validation error
    if(err.name ==='ValidationError'){
        const message: any = Object.values(err.errors).map((val:any) => val.message)
        err = new ErrorResponse( message , 400)
    }


    res.status(err.statusCode || 500).json({
        success: false,
        err: err.message || 'Server Error'
    })

    
}

export default errorHandler