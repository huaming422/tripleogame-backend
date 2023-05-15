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
    role: {
      type: String,
      required: true,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: {
      type: String,
    },
    os: {
      type: String,
    },
    browser: {
      type: String,
    },
    location: {
      type: String,
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
