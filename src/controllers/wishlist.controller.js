import Wishlist from "../models/wishlist.model";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId) throw new ApiError(400, "Missing user");

  const items = await Wishlist.find({ userId }).populate('sports_venues');
  return res.status(200).json(new ApiResponse(200, "Successfully fetched wishlist", items));
});

const addToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { venueId } = req.params;  

  if (!userId || !venueId) throw new ApiError(400, "Missing user or venueId");

  // Check if already exists
  const exists = await Wishlist.findOne({ userId, venue_id: venueId });
  if (exists) throw new ApiError(400, "Item already in wishlist");

  // Create new wishlist item
  const newItem = new Wishlist({ userId, venue_id: venueId });
  await newItem.save();

  await newItem.populate('sports_venues');

  res.status(201).json(new ApiResponse(201, "Added to wishlist", newItem));
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { venueId } = req.params;  

  if (!userId || !venueId) throw new ApiError(400, "Missing user or venueId");

  const deleted = await Wishlist.findOneAndDelete({ userId, venue_id: venueId });
  if (!deleted) throw new ApiError(404, "Wishlist item not found");

  res.status(200).json(new ApiResponse(200, "Wishlist item removed"));
});

export { addToWishlist, removeFromWishlist, getWishlist };
