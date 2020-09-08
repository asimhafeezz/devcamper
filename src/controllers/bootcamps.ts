import {NextFunction, Request , Response} from 'express'
import { asyncHandler } from '../middleware/async'

// bootcamp model
import BootcampModel from '../models/bootcamps'
import ErrorResponse from '../utils/errorResponse'

// @desc    get all bootcamps
// @route   GET api/v1/bootcamps
// @access  Public
export const getBootcamps = (req: Request , res: Response , next: NextFunction) => {

    BootcampModel.find().then(data => {

        if(data.length === 0){
            return next( new ErrorResponse(`Bootcamp not found of id ${req.params.id}` , 404))
        }
        else{
        return res
        .status(200)
        .json({
            success: true,
            count: data.length,
            data: data
        })
        }
    
    
    })
    .catch(err => {
        next(err)
    })

}


// @desc    get a bootcamp
// @route   GET api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = async (req: Request , res: Response , next: NextFunction) => {

    BootcampModel.findById(req.params.id).then(data => {
        
        if(!data){
            return next( new ErrorResponse(`No Bootcamp found` , 404))
        }

        res
        .status(200)
        .json({
            success: true ,
            data: data
        })

    })
    .catch((err: any) => {
    next(err)
    })

}

// @desc    create a new bootcamp
// @route   POST api/v1/bootcamps
// @access  Public
export const createBootcamp = (req: Request , res: Response , next: NextFunction) => {
    BootcampModel.create(req.body).then(data => {
    
        res
            .status(201)
            .json({
                success: true,
                data: data
            })
        })
    .catch((err:any) => next(err))
}


// @desc    update a bootcamps
// @route   PUT api/v1/bootcamps/:id
// @access  Public
export const updateBootcamp = asyncHandler( async function(req: Request , res: Response , next: NextFunction) {
    
        const bootCamp = await  BootcampModel.findByIdAndUpdate(req.params.id , req.body , {
            new:true,
            runValidators:true
        })
    
        if(!bootCamp){
            return next( new ErrorResponse(`did not found a bootcamp of id ${req.params.id} to update` , 404))
        }
    
        res
        .status(200)
        .json({
            success: true ,
            data: bootCamp
        })
    
})


// @desc    delete a bootcamp
// @route   Delete api/v1/bootcamps/:id
// @access  Public
export const deleteBootcamp = asyncHandler( async (req: Request , res: Response , next: NextFunction) => {
    
        const bootCamp = await  BootcampModel.findByIdAndDelete(req.params.id)
    
        if(!bootCamp){
            return next( new ErrorResponse(`did not found a bootcamp of id ${req.params.id} to delete` , 404))
        }
    
        res
        .status(200)
        .json({
            success: true ,
            data: bootCamp
        })  
})
