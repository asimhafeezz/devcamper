import express, { Request , Response } from 'express'

//controller bootcamps
import {
    getBootcamp,
    getBootcamps,
    deleteBootcamp,
    updateBootcamp,
    createBootcamp
} from '../controller/bootcamps'

const router = express.Router()

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp)

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp)


export default router