const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image : String,
    country: String,
    location: String,
    amenities: [String], // Store amenities as an array of strings
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing; // Fix export
