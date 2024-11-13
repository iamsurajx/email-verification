import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Use uppercase for environment variable names
const Mongo_URI = process.env.MONGO_URI;

const DB_Connect = async () => {
    try {
        // Await the connection and log success
        await mongoose.connect(Mongo_URI);
        console.log("DB Connected...");
    } catch (error) {
        console.error("Cannot connect to DB. Cause:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default DB_Connect;