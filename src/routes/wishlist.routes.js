import express from "express"
import { getWishlist,addToWishlist,removeFromWishlist } from "../controllers/wishlist.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
 

const router = express.Router();
router.use(verifyJwt)
router.get('/', getWishlist);
router.post('/:venueId',addToWishlist);
router.delete('/:venueId',removeFromWishlist);


export default router
