import mongoose from "mongoose";

const reviewsSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500
    },
    sportVenueId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SportVenue",
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps:true,
})

const Reviews = mongoose.model("Reviews", reviewsSchema);
export default Reviews;