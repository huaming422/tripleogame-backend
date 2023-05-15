const mongoose = require("mongoose");
const { Schema } = mongoose;

const SoldSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  volume: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
});

const SoldHistory = mongoose.model("SoldHistory", SoldSchema);
module.exports = SoldHistory;
