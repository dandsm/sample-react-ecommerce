import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  authUser,
  deleteUserbyId,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserById,
  updateUserProfile,
} from '../controllers/userController.js'
const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById)
  .delete(protect, admin, deleteUserbyId)
router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
