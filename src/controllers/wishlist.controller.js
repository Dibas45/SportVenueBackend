import Wishlist from "../models/wishlist.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId) throw new ApiError(400, "Missing user");

  const items = await Wishlist.find({ userId }).populate('sportVenueId');
  return res.status(200).json(new ApiResponse(200, "Successfully fetched wishlist", items));
});

const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { venueId } = req.params;

    if (!userId || !venueId) throw new ApiError(400, "Missing user or venueId");

    const exists = await Wishlist.findOne({ userId, sportVenueId: venueId });
    if (exists) throw new ApiError(400, "Item already in wishlist");

    const newItem = new Wishlist({ userId, sportVenueId: venueId });
    await newItem.save();

    await newItem.populate('sportVenueId');

    res.status(201).json(new ApiResponse(201, "Added to wishlist", newItem));
  } catch (error) {
    console.error("addToWishlist error:", error);
    throw error;
  }
});


const removeFromWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { venueId } = req.params;

  if (!userId || !venueId) throw new ApiError(400, "Missing user or venueId");

  const deleted = await Wishlist.findOneAndDelete({ userId, sportVenueId: venueId });
  if (!deleted) throw new ApiError(404, "Wishlist item not found");

  res.status(200).json(new ApiResponse(200, "Wishlist item removed"));
});


export { addToWishlist, removeFromWishlist, getWishlist };
