import mongoose from "mongoose";

const sportVenueSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        required:true,
        enum:["INDOOR", "OUTDOOR", "PLAYSTATION", ]
    },
    description:{
        type:String,
        required:true,
        minlength:10,
        maxlength:500     
    },
    price:{
        type:Number,
        required:true,
        min:0  
    },
    imageUrl:{
        type:String,
        required:true,
    }
}
,{
    timestamps:true,
})

const SportVenue=mongoose.model("SportVenue", sportVenueSchema);
export default SportVenue;