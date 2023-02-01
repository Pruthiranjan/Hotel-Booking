import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    hotel_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Hotel'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    booking_date:{
        type:Date,
        required:true
    }
},{
    timestamps:true,
    versionKey: false
})
const Booking  = mongoose.model('Booking',bookingSchema)
export default Booking