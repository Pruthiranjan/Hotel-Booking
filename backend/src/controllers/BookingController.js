import Booking from '../models/bookingModel.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import moment from 'moment'
// @desc    Book a hotel
// @route   GET /api/hotel
// @access  Public
const bookHotel = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user_id = decoded.id;
    const {hotel_id,booking_date} = req.body
    const date = moment(booking_date, "DD-MM-YYYY").toISOString();
    const is_booked = await Booking.find({hotel_id,user_id,"booking_date":date})
    if(is_booked.length>0){
        res.status(400)
        throw new Error('Already Booked.')
    }else{
        const booked = await Booking.create({
            hotel_id,
            "user_id":user_id,
            "booking_date":date
        })
        if(booked){
            res.json({
                "status":"200",
                "msg":"Hotel Booked successfully",
                "booking_id":booked._id
            })
        }else {
            res.status(400)
            throw new Error('Invalid Booking data')
        }
    }
  })

// @desc    Get hotel status
// @route   GET /api/hotel
// @access  Public
const getHotelstatus = asyncHandler(async (req, res) => {
    const {hotel_id, booking_date} = req.body
    const date = moment(booking_date, "DD-MM-YYYY").toISOString();
    if(!hotel_id || !booking_date){
        res.json({
            "status":"200",
            "msg":"Required Params missing",
        })   
    }else{
        const is_available = await Booking.find({hotel_id,"booking_date":date})
        if(is_available.length>0){
            res.json({
                "status":"200",
                "msg":"Already Booked By Someone Try Another Hotel",
                "hotel_status":0
            })
        }else{
            res.json({
                "status":"200",
                "msg":"Hotel Available for booking",
                "hotel_status":1
            })
        }
    }
  })
export {
    bookHotel,
    getHotelstatus
}