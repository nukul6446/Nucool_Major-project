const mongoose = require("mongoose");
const Listing = require("../models/listing.js"); // Ensure path is correct
const data = require("./data.js"); // Ensure path is correct

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust2";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connected to DB");
        return initDB();
    })
    .catch((err) => {
        console.error("Error initializing DB:", err);
    });

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("Previous listings cleared.");
    await Listing.insertMany(data.data);
    console.log("Database initialized with data:", data.data);
};
