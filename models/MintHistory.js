const mongoose = require("mongoose");
const { Schema } = mongoose;

const MintHistorySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const MintHistory = mongoose.model("MintHistory", MintHistorySchema);
module.exports = MintHistory;
