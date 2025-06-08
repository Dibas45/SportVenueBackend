import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const genrateAccessTokenAndRefreshToken = (async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  

  return { accessToken, refreshToken };
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
  }

  const newUser = await User.create({ email, password });

  if (!newUser) {
    throw new ApiError(500, "Failed to create user");
  }

  // Auto-login after registration
  const { accessToken, refreshToken } = await genrateAccessTokenAndRefreshToken(newUser._id);

  const userToReturn = await User.findById(newUser._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure:true,
    sameSite:"None",
  };

  res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(201, {
        message: "User registered successfully",
        user: userToReturn,
        accessToken,
        refreshToken,
      })
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await genrateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  if (!loggedInUser) {
    throw new ApiError(404, "User not found");
  }

  const options = {
    httpOnly: true,
    secure:true,
    sameSite:"None"
  };

  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, {
        message: "User logged in successfully",
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json(new ApiResponse(401, "Unauthorized"));
  }

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully"));
});


const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find user by ID
    const user = await User.findById(id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



export { registerUser, loginUser,logoutUser,getUserById };
