const mongoose = require("mongoose");
require("dotenv").config()

if (!process.env.MONGODB_URI) {
  console.error("❌ Missing MONGODB_URI in .env");
  process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`connecting to ${process.env.MONGODB_URI}`);
        setTimeout(()=>console.log("✅ MongoDB Connected"),2000)
    } catch (error) {
        console.error("❌ Mongo Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
