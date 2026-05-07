import express from 'express'
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderToDelivered
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createOrder)                          // ← POST
router.get('/myorders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)                      // ← removed admin
router.get('/all', protect, admin, getAllOrders)                // ← changed to /all
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)

export default router