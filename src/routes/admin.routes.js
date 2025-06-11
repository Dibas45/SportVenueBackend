import express from "express";
import {
  addGame,
  editGame,
  deleteGame,
  getAllBookings,
  verifyBooking,
  getAdminData,
  deleteBooking,
} from "../controllers/admin.controller.js";
import { checkRole, verifyJwt } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(verifyJwt);
router.use(checkRole(["admin"]));

router.get("/data", getAdminData);
router.post("/add-game", addGame);
router.patch("/edit-game/:gameId", editGame);
router.delete("/delete-game/:gameId", deleteGame);

router.get("/bookings", getAllBookings);
router.patch("/bookings/:bookingId/verify", verifyBooking);
router.delete("/bookings/:bookingId", deleteBooking);

export default router;
