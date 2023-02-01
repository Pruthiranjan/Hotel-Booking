import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getOrders
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/register').post(registerUser)
router.post('/login', authUser)
router.route('/getOrders').get(protect, getOrders)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
