import express from 'express';
import {  createReview,editReview,deleteReview,getReviewsByVenue } from '../controllers/reviews.controller.js';
import { verifyJwt } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route("/create/:venue").post(verifyJwt, createReview);
router.patch("/edit/:reviewId", verifyJwt, editReview);
router.delete("/delete/:reviewId", verifyJwt, deleteReview);
router.get("/venue/:venue", getReviewsByVenue); 


export default router;