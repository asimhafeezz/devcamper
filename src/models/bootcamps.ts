import mongoose, { Schema , Document } from 'mongoose'

interface locationI {
    type: string,
    coordinates: number[],
    formattedAddress: String,
    street: string,
    city: string,
    state: string,
    zipcode: string,
    country: string
}

export interface bootcampI extends Document{
    name: string,
    slug: string,
    description: string,
    website: string,
    email: string,
    location: locationI,
    careers: string[],
    averageRating: number,
    averageCost: number,
    photo: string,
    housing: boolean,
    jobAssistance: boolean,
    jobGurrentee: boolean,
    acceptGi: boolean,
    createdAt: boolean,
}

const bootcampScheme: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'please add a name'],
        unique:true,
        trim:true,
        maxlength:[50 , 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true , 'please add a Description'],
        maxlength:[500 , 'Descriptio can not be more than 500 characters']
    },
    website:{
        type: String,
        match:[
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'please enter a valid url with http or https'
        ]
    },
    email:{
        type:String,
        match:[
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please enter a valid email address'
        ]
    },
    address:{
        type:String,
        required:[
            true,
            'please add an address'
        ]
    },
    location:{
        //geoJSON Point
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        //   required: true
        },
        coordinates: {
          type: [Number],
        //   required: true
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
      },
      careers:{
          //array of strings
          type:[String],
          required:true,
          enum:[
              'Web Development',
              'Mobile Development',
              'UI/UX',
              'Data Science',
              'Buisness',
              'Others'
          ]
      },
      averageRating:{
          type:Number,
          min:[1, 'Ratting must be atleast 1'],
          max:[10 , 'Ratting must can not be more than 10']
      },
      averageCost: Number,
      photo:{
          type:String,
          default:'no-photo.jpg'
      },
      housing:{
          type: Boolean,
          default: false
      },
      jobAssistance: {
          type: Boolean,
          default:false
      },
      jobGurrentee: {
          type:Boolean,
          default:false
      },
      acceptGi: {
        type:Boolean,
        default:false
      },
      createdAt: {
          type: Date,
          default: Date.now()
      }
})

export default mongoose.model<bootcampI>('bootcamp' , bootcampScheme)