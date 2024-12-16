const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        description: { type: String, default: "No description available" },
        country: { type: String, default: "Unknown" },
        location: { type: String, default: "Unknown" },
        amenities: { type: [String], default: [] }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing; // Fix export
