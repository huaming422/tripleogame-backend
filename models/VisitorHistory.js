const mongoose = require("mongoose");
const { Schema } = mongoose;

const VisitorHistorySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const VisitorHistory = mongoose.model("VisitorHistory", VisitorHistorySchema);
module.exports = VisitorHistory;
