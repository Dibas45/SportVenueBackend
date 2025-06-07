import {asyncHandler} from '../utils/asyncHandler.js';
import Booking from "../models/booking.model.js"

const createBooking=asyncHandler(async(req, res)=>{
    const {date, time, name, sportVenueId, userId, venue_name} = req.body;

    const booking = new Booking({
        date,
        time,
        name,
        sportVenueId,
        userId,
        venue_name
    });

    await booking.save();

    res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking
    });
})
 const editBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { date, time, name } = req.body;
  const userId = req.user._id;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }


  booking.date = date || booking.date;
  booking.time = time || booking.time;
  booking.name = name || booking.name;

  await booking.save();

  res.status(200).json({
    success: true,
    message: "Booking updated successfully",
    data: booking,
  });
});

 const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user._id;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }


  await booking.deleteOne();

  res.status(200).json({
    success: true,
    message: "Booking deleted successfully",
  });
});



export {createBooking,editBooking,deleteBooking};