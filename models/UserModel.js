const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 50,
    },
    username: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
      minlength: 5,
      maxlength: 1024,
    },
    type: {
      type: String,
      default: "email",
    },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: {
      type: String,
    },
    linkedinurl: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    employment: {
      type: Object,
    },
    language: {
      type: Object,
    },
    address: {
      type: Object,
    },
    googleId: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
