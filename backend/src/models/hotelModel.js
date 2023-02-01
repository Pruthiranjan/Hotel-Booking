import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
    hotel_name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
},{
    timestamps:true,
    versionKey: false
})
const Hotel  = mongoose.model('Hotels',hotelSchema)
export default Hotel