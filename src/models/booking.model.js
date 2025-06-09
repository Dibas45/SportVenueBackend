import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    time:{
       type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    verified:{
        type: Boolean,
        default: false
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    rejected:{
        type: Boolean,
        default: false
    },
    venue_name:{
        type: String,
        required: true
    },

},{
    timestamps:true
})

const Booking=mongoose.model("Booking", bookingSchema);
export default Booking;