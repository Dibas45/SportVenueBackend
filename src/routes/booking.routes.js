import express from 'express';
const router=express.Router();
import { createBooking,editBooking,deleteBooking,getBookingsByUserId } from '../controllers/booking.controller.js';
import { verifyJwt } from '../middleware/auth.middleware.js';
// Define the route for creating a booking
router.get('/:userId', getBookingsByUserId);
router.post('/', createBooking);
router.patch("/edit/:bookingId", verifyJwt, editBooking);
router.delete("/delete/:bookingId", verifyJwt, deleteBooking);

export default router;