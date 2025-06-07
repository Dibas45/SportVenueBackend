import express from "express";
import { addGame ,editGame,deleteGame} from "../controllers/admin.controller.js";
import { checkRole, verifyJwt } from "../middleware/auth.middleware.js";

const router = express.Router();

// Route to add a new game
router.use(verifyJwt); // Ensure the user is authenticated
router.use(checkRole(["admin"])); // Ensure the user has the 'admin' role

router.route("/add-game").post(addGame);
router.patch('/edit-game/:gameId', editGame);
router.delete('/delete-game/:gameId', deleteGame);
export default router;
