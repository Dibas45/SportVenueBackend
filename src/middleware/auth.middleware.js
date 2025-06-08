import ApiError  from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import  User  from '../models/user.model.js';

export const verifyJwt = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies?.accessToken ||
    (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);
    console.log(token)

  if (!token) {
    throw new ApiError(401, "Access token is required");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
});

export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource" });
        }
        next();
    };
}
