import mongoose from 'mongoose'

export const connectDB = (): void => {
    mongoose.connect(`${process.env.MONGO_URI}` , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log('MongoDB is connected'.cyan.underline.bold))
    .catch(err => console.log(`Mongodb is not connected says error : ${err.message}`.red.underline.bold))
}