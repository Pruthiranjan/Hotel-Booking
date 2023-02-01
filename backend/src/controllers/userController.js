import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Booking from '../models/bookingModel.js'
import Hotel from '../models/hotelModel.js'
import jwt from 'jsonwebtoken'

// @desc Auth user & get token
// @route POST /api/user/login
// @access Public
const authUser = asyncHandler( async (req,res) => {
 const {email,password} = req.body
 const user = await User.findOne({email})
 if (user && (await user.matchPassword(password,user.password))) {
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
 }else{
    res.status(401)
    throw new Error('Invalid email or password')
 }
})
// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
// @desc    Register a new user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
// @desc    Get all users
// @route   GET /api/user
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})
// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// @desc    Delete user
// @route   DELETE /api/user/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// @desc    Get user by ID
// @route   GET /api/user/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/user/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all hotels booked by a user
// @route   GET /api/user
// @access  Public
const getOrders = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user_id = decoded.id;
  const booking = await Booking.find({user_id})
  if(booking.length>0){
      const hotel_ids = [];
      booking.map((data)=>{
        var hotel_id = data.hotel_id.toString();
        if(hotel_ids.indexOf(hotel_id)==-1){
          hotel_ids.push(hotel_id)
        }
      })
    const hotels = await Hotel.find({"_id":{"$in":hotel_ids}},{ "_id": 1, "hotel_name": 1,"image":1 })
    var final_data = booking.map((data)=>{
      var hotel_id = data.hotel_id.toString();
      let obj = hotels.find(x => x._id == hotel_id);
      return{
          "booking_id":data._id,
          "booking_date":data.booking_date,
          "hotel_details":obj
      }
    })
    res.json(final_data)
  }else{
    res.status(400)
    throw new Error('Not Found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getOrders
}
