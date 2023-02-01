import Hotel from '../models/hotelModel.js'
import asyncHandler from 'express-async-handler'
// @desc    Register a new hotel
// @route   POST /api/hotel
// @access  Public
const registerHotel = asyncHandler(async (req, res) => {
    const {name, image} = req.body
    const hotel = await Hotel.create({
      "hotel_name":name,
      image
    })
  
    if (hotel) {
      res.status(201).json({
        "msg":"Hotel Created Successfully",
        _id: hotel._id,
        name: hotel.hotel_name
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
// @desc    Get all hotels
// @route   GET /api/hotel
// @access  Private/Admin
const getHotels = asyncHandler(async (req, res) => {
    const hotels = await Hotel.find({})
    res.json({
        "status":"200",
        "msg":"Hotels fetched successfully",
        "data":hotels
    })
  })
export {
  registerHotel,
  getHotels
}