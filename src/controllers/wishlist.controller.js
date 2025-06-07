import Wishlist from '../models/wishlist.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const toggleWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { venueId } = req.params;

  if (!venueId) {
    throw new ApiError(400, "Venue ID is required");
  }

  const existing = await Wishlist.findOne({ userId: userId, sportVenueId: venueId });

  if (existing) {
    await Wishlist.deleteOne({ userId: userId, sportVenueId: venueId });
    return res.status(200).json({ success: true, message: "Removed from wishlist", status: "removed" });
  } else {
    await Wishlist.create({ userId: userId, sportVenueId: venueId });
    return res.status(201).json({ success: true, message: "Added to wishlist", status: "added" });
  }
});

export {toggleWishlist}