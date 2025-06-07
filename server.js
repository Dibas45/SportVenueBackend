import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
});

await mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.listen(process.env.PORT||8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});