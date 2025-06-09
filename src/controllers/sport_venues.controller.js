import { asyncHandler } from "../utils/asyncHandler.js"
import SportVenue from "../models/sport_venues.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const fetchAllGames = asyncHandler(async (req, res) => {
  try {
    const allGames = await SportVenue.find();
    return res
      .status(200)
      .json(new ApiResponse(200, "Games fetched successfully", allGames));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Internal Server Error", null));
  }
});

const fetchGame = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching game with ID:", id);

    const game = await SportVenue.findById(id).lean(); // Use .lean() to get plain object

    if (!game) {
      return res
        .status(404)
        .json(new ApiResponse(404, "Game not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Game fetched successfully", {...game}));
  } catch (error) {
    console.error("Error in fetchGame:", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, "Internal server error in fetchGame"));
  }
});


export {fetchAllGames,fetchGame}