import { asyncHandler } from "../utils/asyncHandler.js";
import  Review  from "../models/reviews.model.js";
import User  from "../models/user.model.js";
import  SportVenue  from "../models/sport_venues.model.js"
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createReview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { venue } = req.params;
  const { rating, comment } = req.body;
  const sportVenueId = venue;

  if (!rating || !comment || !sportVenueId) {
    throw new ApiError(400, "Rating, comment, and sport venue ID are required.");
  }

  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new ApiError(404, "User not found.");
  }

  const existingVenue = await SportVenue.findById(sportVenueId);
  if (!existingVenue) {
    throw new ApiError(404, "Sport venue not found.");
  }

  const review = await Review.create({
  userId: existingUser._id,
  sportVenueId: existingVenue._id,
  rating,
  comment,
  email: existingUser.email,
});


  res.status(201).json(new ApiResponse("Review created successfully", review));
});

const editReview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, "Review not found.");
  }

  if (review.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this review.");
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  await review.save();

  res.status(200).json(new ApiResponse("Review updated successfully", review));
})

const deleteReview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, "Review not found.");
  }

  if (review.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this review.");
  }

  await review.deleteOne();

  res.status(200).json(new ApiResponse("Review deleted successfully"));
});

const getReviewsByVenue = asyncHandler(async (req, res) => {
  const { venue } = req.params;

  if (!venue) {
    throw new ApiError(400, "Venue ID is required.");
  }

  const reviews = await Review.find({ sportVenueId: venue }).populate("userId", "email");

  if (!reviews.length) {
    throw new ApiError(404, "No reviews found for this venue.");
  }

  res.status(200).json(new ApiResponse("Reviews fetched successfully", reviews));
});



export { createReview,editReview,deleteReview ,getReviewsByVenue};