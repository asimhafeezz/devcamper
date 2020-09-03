import { NextFunction, Request , Response} from 'express';

export const errorHandler = ( error:any , req:Request , res: Response ) =>{
    console.log(error.stack?.red)

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

