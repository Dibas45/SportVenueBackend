import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config({
    path: "./.env"
});

const app=express();


app.use(cors(
  {
    origin:  "https://sports-venue-booking-alpha.vercel.app",
    // origin :"http://localhost:5173", //This work perfectly on local sever
    credentials: true, // Allow cookies to be sent with requests
  }
));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cookieParser());


  ///Importing routes
import userRoutes from './src/routes/user.routes.js';
import sportsRoutes from './src/routes/sport_venue.routes.js';
import bookingRoutes from './src/routes/booking.routes.js';
import wishlistRoutes from './src/routes/wishlist.routes.js';
import reviewRoutes from './src/routes/reviews.routes.js';
import adminRoutes from "./src/routes/admin.routes.js";

 app.use("/api/v1/users",userRoutes)
app.use("/api/v1/sports",sportsRoutes)
app.use("/api/v1/bookings",bookingRoutes)
app.use("/api/v1/wishlist",wishlistRoutes)
app.use("/api/v1/reviews",reviewRoutes)
app.use("/api/v1/admin", adminRoutes);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    data: err.data || null,
  });
});


export default app;


