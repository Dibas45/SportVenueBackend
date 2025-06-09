import { fetchAllGames, fetchGame } from "../controllers/sport_venues.controller.js";
import express from "express";
const router = express.Router();


// Define the route for fetching games


router.get("/", fetchAllGames);
router.get("/:id",fetchGame)

export default router;