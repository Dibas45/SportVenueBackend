import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import SportVenue from '../models/sport_venues.model.js';


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



export {addGame,editGame,deleteGame}