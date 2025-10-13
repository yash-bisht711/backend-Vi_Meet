const mongoose = require("mongoose");
require("dotenv").config()

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
