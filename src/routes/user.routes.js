import { Router } from "express";
import { registerUser,loginUser ,logoutUser,getUserById} from "../controllers/user.controllers.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();




router.route("/register").post(registerUser);
router.route("/login").post(loginUser); 

//authenticated routes
router.route("/logout").post(verifyJwt,logoutUser);
router.route("/getuser/:id").get(verifyJwt,getUserById)

 

export default router;