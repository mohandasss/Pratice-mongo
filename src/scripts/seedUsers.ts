import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/userSchema";

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}

const seedUsers = async () => {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        console.log("⏳ Hashing default password...");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", salt);
        console.log("✅ Password hashed");

        console.log("⏳ Generating 10,000 user records...");
        const operations = [];
        
        // Use a unique prefix to prevent conflict if script is run multiple times
        const uniquePrefix = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
        
        for (let i = 0; i < 10000; i++) {
            // Generate a unique 10-digit phone number. 
            // uniquePrefix * 10000 + i matches the format and fits within 10 digits
            const phoneVal = uniquePrefix * 10000 + i;
            const phone = `${phoneVal}`;
            const email = `seed_user_${uniquePrefix}_${i}@example.com`;
            
            operations.push({
                insertOne: {
                    document: {
                        name: `Seed User ${i + 1}`,
                        email: email,
                        password: hashedPassword,
                        phone: phone,
                        isVerified: Math.random() > 0.5,
                        role: "USER",
                        address: {
                            houseNo: `${Math.floor(Math.random() * 999) + 1}`,
                            landmark: `Street ${i + 1}`,
                            city: "Tech City",
                            state: "Silicon State",
                            pincode: `5600${String(i % 100).padStart(2, "0")}`
                        }
                    }
                }
            });
        }

        console.log("⏳ Executing bulkWrite for 10,000 users...");
        const startTime = Date.now();
        const result = await User.bulkWrite(operations, { ordered: false });
        const endTime = Date.now();

        console.log(`✅ Bulk write completed in ${((endTime - startTime) / 1000).toFixed(2)}s`);
        console.log(`   Inserted: ${result.insertedCount}`);
        
    } catch (error) {
        console.error("❌ Error seeding users:", error);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
    }
};

seedUsers();
