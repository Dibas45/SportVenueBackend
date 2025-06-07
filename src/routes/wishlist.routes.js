import express from "express"
import { toggleWishlist } from "../controllers/wishlist.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
 

const router = express.Router();

router.route("/:venueId").post(verifyJwt,toggleWishlist)

export default router;