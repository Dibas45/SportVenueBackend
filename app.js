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
    credentials: true, // Allow cookies to be sent with requests
  }
));
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



export default app;


