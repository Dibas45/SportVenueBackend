import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import SportVenue from '../models/sport_venues.model.js';
import Booking from '../models/booking.model.js';


const getAdminData =asyncHandler( async (req, res) => {
  try {
    const [games, bookings] = await Promise.all([
      SportVenue.find({}),
      Booking.find({}),
    ]);

    res.status(200).json({ games, bookings });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const addGame =asyncHandler(async (req,res)=>{
  const {name,type,price,description,imageUrl} = req.body;
    if (!name || !type || !price || !description || !imageUrl) {
        throw new ApiError(400, 'All fields are required');
    }
    const newGame = await SportVenue.create({
        name,
        type,
        price,
        description,
        imageUrl
    });
    res.status(201).json( new ApiResponse('201,Game added successfully', newGame));
})

const editGame = asyncHandler(async (req, res) => {
  const { gameId } = req.params;
  const { name, type, price, description, imageUrl } = req.body;

  const game = await SportVenue.findById(gameId);
  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  game.name = name || game.name;
  game.type = type || game.type;
  game.price = price || game.price;
  game.description = description || game.description;
  game.imageUrl = imageUrl || game.imageUrl;

  await game.save();

  res.status(200).json(new ApiResponse(200, "Game updated successfully", game));
});
 const deleteGame = asyncHandler(async (req, res) => {
  const { gameId } = req.params;

  const game = await SportVenue.findById(gameId);
  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  await game.deleteOne();

  res.status(200).json(new ApiResponse(200, "Game deleted successfully"));
});

// Get all bookings (for admin)
const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().populate("userId", "name email"); // optional population

  res.status(200).json(
    new ApiResponse(200, "All bookings fetched successfully", bookings)
  );
});

// Verify or reject a booking
const verifyBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { verified } = req.body; // Boolean: true or false

  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  booking.verified = verified;
  await booking.save();

  res.status(200).json(
    new ApiResponse(200, `Booking ${verified ? "verified" : "rejected"} successfully`, booking)
  );
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  await booking.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, "Booking deleted successfully", bookingId));
});


export {addGame,editGame,deleteGame,getAllBookings,verifyBooking,getAdminData,deleteBooking}