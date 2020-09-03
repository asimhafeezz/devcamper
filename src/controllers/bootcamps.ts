import {NextFunction, Request , Response} from 'express'

// bootcamp model
import BootcampModel from '../models/bootcamps'
import errorResponse from '../utils/errorResponse'

// @desc    get all bootcamps
// @route   GET api/v1/bootcamps
// @access  Public
export const getBootcamps = (req: Request , res: Response , next: NextFunction) => {

    BootcampModel.find().then(data => {

        if(data.length === 0){
            return res.status(400).json({
                success: false,
                msg:`did not found a bootcamp.`
            })
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

    try{
    const bootCamp = await  BootcampModel.findById(req.params.id)

    if(!bootCamp){
        return res.status(400).json({
                success: true,
                msg:`did not found a bootcamp of id ${req.params.id}`
            })
    }

    res
    .status(200)
    .json({
        success: true ,
        data: bootCamp
    })

    }
    catch(err:any){

    next(new errorResponse(err.message , 500))

    }


}

// @desc    create a new bootcamp
// @route   POST api/v1/bootcamps
// @access  Public
export const createBootcamp = (req: Request , res: Response) => {
    BootcampModel.create(req.body).then(data => {
    
        res
            .status(201)
            .json({
                success: true,
                data: data
            })
        })
    .catch((err:Error) => res.status(400).json({
        success: false,
        msg: err.message
    }))
}


// @desc    update a bootcamps
// @route   PUT api/v1/bootcamps/:id
// @access  Public
export const updateBootcamp = async (req: Request , res: Response) => {
    try{
        const bootCamp = await  BootcampModel.findByIdAndUpdate(req.params.id , req.body , {
            new:true,
            runValidators:true
        })
    
        if(!bootCamp){
            return res.status(400).json({
                    success: true,
                    msg:`did not found a bootcamp of id ${req.params.id} to update`
                })
        }
    
        res
        .status(200)
        .json({
            success: true ,
            data: bootCamp
        })
    
        }
        catch(err){
    
        res
        .status(400)
        .json({
            success: false
        })
    
        }
    
}


// @desc    delete a bootcamp
// @route   Delete api/v1/bootcamps/:id
// @access  Public
export const deleteBootcamp = async (req: Request , res: Response) => {
    try{
        const bootCamp = await  BootcampModel.findByIdAndDelete(req.params.id)
    
        if(!bootCamp){
            return res.status(400).json({
                    success: true,
                    msg:`did not found a bootcamp of id ${req.params.id} to delete.`
                })
        }
    
        res
        .status(200)
        .json({
            success: true ,
            data: bootCamp
        })
    
        }
        catch(err){
    
        res
        .status(400)
        .json({
            success: false
        })
    
        }
    
}
