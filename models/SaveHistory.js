const mongoose = require("mongoose");
const { Schema } = mongoose;

const SaveHistorySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const SaveHistory = mongoose.model("SaveHistory", SaveHistorySchema);
module.exports = SaveHistory;
