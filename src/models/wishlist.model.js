import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sportVenueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SportVenue",
        required: true
    }
}, {
    timestamps: true,
})
const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;