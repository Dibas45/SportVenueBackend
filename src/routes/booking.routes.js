import express from 'express';
const router=express.Router();
import { createBooking,editBooking,deleteBooking,getBookingsByUserId, checkAvailability } from '../controllers/booking.controller.js';
import { verifyJwt } from '../middleware/auth.middleware.js';
import { getVenueById } from '../controllers/sport_venues.controller.js';
// Define the route for creating a booking

router.get("/:venueId",getVenueById)
router.get('/fetch', verifyJwt,getBookingsByUserId);
router.post('/', verifyJwt,createBooking);
router.patch("/edit/:bookingId", verifyJwt, editBooking);
router.delete("/delete/:bookingId", verifyJwt, deleteBooking);
router.post("/check-availability",checkAvailability);


export default router;