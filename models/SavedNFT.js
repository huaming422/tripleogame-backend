const mongoose = require("mongoose");

const savedNFTSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "NFT should be associated with an user"],
    },
    contractAddress: {
      type: String,
      required: [true, "NFT should contain text"],
    },
    category: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    seller: {
      type: String,
    },
    owner: {
      type: String,
    },
    itemId: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    royalty: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
      default: 0,
    },
    tokensAvailable: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SavedNFT = mongoose.model("SavedNFT", savedNFTSchema);
module.exports = SavedNFT;
