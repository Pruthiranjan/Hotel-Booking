import express from 'express'
const router = express.Router()
import {
    registerHotel,
    getHotels
} from '../controllers/hotelController.js'
import {
    bookHotel,
    getHotelstatus
} from '../controllers/BookingController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/create').post(registerHotel)
router.route('/getAll').get(getHotels)
router.route('/book').get(protect,bookHotel)
router.route('/getStatus').post(getHotelstatus)
export default router
