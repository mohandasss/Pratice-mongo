import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    isVerified: boolean;
    role: "USER" | "ADMIN";
    address?: {
        houseNo?: string;
        landmark?: string;
        city?: string;
        state?: string;
        pincode?: string;
    };

    isPasswordValid(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },

        address: {
            houseNo: {
                type: String,
            },

            landmark: {
                type: String,
            },

            city: {
                type: String,
            },

            state: {
                type: String,
            },

            pincode: {
                type: String,
            },
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordValid = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

export default User;