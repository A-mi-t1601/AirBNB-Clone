const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://unsplash.com/photos/2-person-sitting-on-brown-rock-formation-during-daytime-7sma23m8eJY",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/2-person-sitting-on-brown-rock-formation-during-daytime-7sma23m8eJY"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
