import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    houseNo:{
        type : Number,
        required : true,
        trim : true,
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        unique: true,
        required: true
    },
    street: String,
    city: String,
    state: String,
    zip: Number
})


const address = mongoose.model("address", addressSchema)

export default address