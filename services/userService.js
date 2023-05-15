const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// ** config
const Config = require("../config/config");

// ** shared
const { comparePasswords } = require("../shared/utils");

// ** Model
const User = require("../models/User");
const Visitor = require("../models/VisitorHistory");

module.exports.UserLogin = async function (user, password) {
  if (user.type === "email") {
    const areEqual = await comparePasswords(user.password, password);
    if (!areEqual) {
      return {
        success: false,
        message: "Password is not correct!",
      };
    }
  }
  const token = JWT.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
    Config.JWT_SECRET,
    {
      expiresIn: 36000, //expires in 24 hours
    }
  );
  const payload = {
    access_token: token,
    expires_in: 36000,
    refresh_token: "",
    token_type: "Bearer",
    success: true,
  };
  return payload;
};

module.exports.SocialLogin = async function (user) {
  const token = JWT.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
    Config.JWT_SECRET,
    {
      expiresIn: 36000, //expires in 24 hours
    }
  );
  const payload = {
    access_token: token,
    expires_in: 36000,
    refresh_token: "",
    token_type: "Bearer",
    success: true,
  };
  return payload;
};

module.exports.UserCreate = async function (req) {
  let user = new User(req);
  if (req.type === "email") {
    user.password = await bcrypt.hash(
      req.password,
      parseInt(Config.SALT_WORK_FACTOR)
    );
    const result = await user.save();
    if (result) {
      return result;
    }
  } else {
    user.isVerified = true;
    const result = await user.save();
    return result;
  }
};

module.exports.VisitorCreate = async function () {
  const currentTime = new Date();
  let year = currentTime.getFullYear();
  let month = currentTime.getMonth();
  let day = currentTime.getDate();
  const date = new Date(year, month, day);
  const visitor = await Visitor.exists({ date });
  const filter = { date: date };
  if (visitor) {
    const result = await Visitor.findOneAndUpdate(
      filter,
      { $inc: { count: 1 } },
      {
        new: true,
      }
    );

    if (result) {
      return result;
    }
  } else {
    const result = await Visitor.create({ date, count: 1 });
    if (result) {
      return result;
    }
  }
};

module.exports.ValidateEmail = async function (email) {
  const result = await User.findOne({
    email: email.toLowerCase(),
  }).exec();

  if (result) {
    return result;
  }
  return null;
};

module.exports.ValidateUsername = async function (username) {
  const userName = await User.findOne(
    {
      username: username.toLowerCase(),
    },
    {
      __v: 0,
      password: 0,
      deleted: 0,
      updated_by: 0,
    }
  ).exec();
  if (userName) {
    return userName;
  }
  return null;
};

module.exports.GetUserById = async function (id) {
  const result = await User.findById(
    {
      _id: id,
      "stats.deleted": false,
    },
    {
      __v: 0,
      stats: 0,
      password: 0,
      login_attempts: 0,
      lock_until: 0,
      "account.stats": 0,
      "account.__v": 0,
      "account.default_contact": 0,
    }
  ).exec();
  if (result) {
    return result;
  }
  return null;
};

module.exports.VerifyEmail = async function (id) {
  const result = await User.findOneAndUpdate({ _id: id }, { isVerified: true });
  if (result) {
    return result;
  }
  return false;
};

module.exports.GetUserByEmail = async function (email) {
  const result = await User.findOne({ email: email });
  if (result) {
    return result;
  }
  return false;
};

module.exports.ResetPassword = async function (id, pwd) {
  const password = await bcrypt.hash(pwd, parseInt(Config.SALT_WORK_FACTOR));
  const result = await User.findOneAndUpdate(
    { _id: id },
    { password: password }
  );
  if (result) {
    return result;
  }
  return false;
};

module.exports.GetAllVisitor = async function (req) {
  const period = req.body.period;
  var startDate = new Date();
  startDate.setDate(startDate.getDate() - period);
  console.log(startDate.toString());
  var endDate = new Date();
  console.log(endDate.toString());
  const result = await Visitor.find({
    date: {
      $gt: startDate,
      $lt: endDate,
    },
  }).exec();

  if (result) {
    return result;
  }
  return null;
};
