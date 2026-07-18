
import mongoose, { mongo } from "mongoose"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,



    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true

    }
    ,
    phone: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true,
        default: "USER",
        enum: ["USER", "ADMIN"]
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        unique: true,
        required: true

    }




}
    ,
    {
        timestamps: true,
    }
)

const User = mongoose.model('user', userSchema)

export default User


// email: {
//   type: String,
//   required: true,
//   unique: true,
//   lowercase: true,
//   trim: true
// }