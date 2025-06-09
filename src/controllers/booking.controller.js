import { asyncHandler } from '../utils/asyncHandler.js';
import Booking from '../models/booking.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import  ApiError  from '../utils/ApiError.js';

// Get bookings by user ID
const getBookingsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const bookings = await Booking.find({ userId });

  return res.status(200).json(
    new ApiResponse(
      200,
      bookings.length === 0 ? "No bookings found for this user" : "Bookings fetched successfully",
      bookings
    )
  );
});

// Create a new booking
const createBooking = asyncHandler(async (req, res) => {
  const { date, time, name, venueName } = req.body;
  const {venueID}=req.params;

  const userId = req.user._id;

  const booking = await Booking.create({
    date,
    time,
    name,
    userId,
    venue_name: venueName, 
    sportVenueId:venueID
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Booking created successfully", booking));
});


// Edit an existing booking
const editBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { date, time, name } = req.body;

  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  booking.date = date || booking.date;
  booking.time = time || booking.time;
  booking.name = name || booking.name;

  await booking.save();

  res.status(200).json(new ApiResponse(200, "Booking updated successfully", booking));
});

// Delete a booking
const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  await booking.deleteOne();
  res.status(200).json(new ApiResponse(200, "Booking deleted successfully"));
});

// Check venue availability
const checkAvailability = asyncHandler(async (req, res) => {
  const { venueName, date, time } = req.body;

  const existingBooking = await Booking.findOne({ venueName, date, time });

  res.status(200).json({
    success: true,
    isAvailable: !existingBooking,
    message: existingBooking ? "Venue already booked" : "Venue is available",
  });
});

export {
  getBookingsByUserId,
  createBooking,
  editBooking,
  deleteBooking,
  checkAvailability,
};
