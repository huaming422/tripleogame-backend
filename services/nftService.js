// ** Model
const Mint = require("../models/MintHistory");
const Sold = require("../models/SoldHistory");
const Save = require("../models/SaveHistory");

module.exports.SaveCreate = async function () {
  const currentTime = new Date();
  let year = currentTime.getFullYear();
  let month = currentTime.getMonth();
  let day = currentTime.getDate();
  const date = new Date(year, month, day);
  const visitor = await Save.exists({ date });
  const filter = { date: date };
  if (visitor) {
    const result = await Save.findOneAndUpdate(
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
    const result = await Save.create({ date, count: 1 });
    if (result) {
      return result;
    }
  }
};

module.exports.GetAllSave = async function (req) {
  const period = req.body.period;
  var startDate = new Date();
  startDate.setDate(startDate.getDate() - period);
  console.log(startDate.toString());
  var endDate = new Date();
  console.log(endDate.toString());
  const result = await Save.find({
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
module.exports.MintCreate = async function () {
  const currentTime = new Date();
  let year = currentTime.getFullYear();
  let month = currentTime.getMonth();
  let day = currentTime.getDate();
  const date = new Date(year, month, day);
  const visitor = await Mint.exists({ date });
  const filter = { date: date };
  if (visitor) {
    const result = await Mint.findOneAndUpdate(
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
    const result = await Mint.create({ date, count: 1 });
    if (result) {
      return result;
    }
  }
};

module.exports.GetAllMint = async function (req) {
  const period = req.body.period;
  var startDate = new Date();
  startDate.setDate(startDate.getDate() - period);
  console.log(startDate.toString());
  var endDate = new Date();
  console.log(endDate.toString());
  const result = await Mint.find({
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

module.exports.SoldCreate = async function (req) {
  const price = req.body.price;
  const currentTime = new Date();
  let year = currentTime.getFullYear();
  let month = currentTime.getMonth();
  let day = currentTime.getDate();
  const date = new Date(year, month, day);
  const visitor = await Sold.exists({ date });
  const filter = { date: date };

  if (visitor) {
    try {
      const result = await Sold.findOneAndUpdate(
        filter,
        { $inc: { count: 1, volume: price } },
        {
          new: true,
        }
      );

      if (result) {
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    const result = await Sold.create({ date, count: 1 });
    if (result) {
      return result;
    }
  }
};

module.exports.GetAllSold = async function (req) {
  const period = req.body.period;
  var startDate = new Date();
  startDate.setDate(startDate.getDate() - period);
  console.log(startDate.toString());
  var endDate = new Date();
  console.log(endDate.toString());
  const result = await Sold.find({
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
