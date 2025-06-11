import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import SportVenue from "../models/sport_venues.model.js";
import Booking from "../models/booking.model.js";


export const getAdminData = asyncHandler(async (_req, res) => {
  try {
    const [games, bookings] = await Promise.all([
      SportVenue.find({}),
      Booking.find().populate("userId", "name email"), // Populate user details
    ]);

    res.status(200).json(new ApiResponse(200, "Admin data fetched successfully", { games, bookings }));
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).json(new ApiResponse(500, "Server error", error.message));
  }
});

export const addGame = asyncHandler(async (req, res) => {
  const { name, type, price, description, imageUrl } = req.body;

  if (!name || !type || !price || !description || !imageUrl) {
    throw new ApiError(400, "All fields are required");
  }

  const newGame = await SportVenue.create({ name, type, price, description, imageUrl });

  res.status(201).json(new ApiResponse(201, "Game added successfully", newGame));
});

export const editGame = asyncHandler(async (req, res) => {
  const { gameId } = req.params;
  const { name, type, price, description, imageUrl } = req.body;

  const game = await SportVenue.findById(gameId);
  if (!game) throw new ApiError(404, "Game not found");

  Object.assign(game, { name, type, price, description, imageUrl });

  await game.save();

  res.status(200).json(new ApiResponse(200, "Game updated successfully", game));
});

export const deleteGame = asyncHandler(async (req, res) => {
  const { gameId } = req.params;

  const game = await SportVenue.findById(gameId);
  if (!game) throw new ApiError(404, "Game not found");

  await game.deleteOne();

  res.status(200).json(new ApiResponse(200, "Game deleted successfully", { deletedId: gameId }));
});

export const getAllBookings = asyncHandler(async (_req, res) => {
  const bookings = await Booking.find().populate("userId", "name email");

  res.status(200).json(new ApiResponse(200, "All bookings fetched successfully", bookings));
});

export const verifyBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { verified } = req.body; // Boolean: true or false

  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  booking.verified = verified;
  await booking.save();

  res.status(200).json(new ApiResponse(200, `Booking ${verified ? "verified" : "rejected"} successfully`, booking));
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  await booking.deleteOne();

  res.status(200).json(new ApiResponse(200, "Booking deleted successfully", { deletedId: bookingId }));
});