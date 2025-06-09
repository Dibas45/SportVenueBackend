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

const fetchGame=asyncHandler(async (req,res)=>{
  try {
    const {id}=req.params;
    const game=await SportVenue.findById(id)
   return res
   .status(200)
   .json(new ApiResponse(200,"Game fetched Succesfully",{...game}))
  } catch (error) {
    return res
    .status(500)
    .json(new ApiResponse(500, "Internal server error in fetchGame"))
  }
})

export {fetchAllGames,fetchGame}