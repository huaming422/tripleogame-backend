// ** Model
const User = require("../models/UserModel");
const fs = require("fs");

const range = function (start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};

module.exports.ClientPersonalInfo = async function (id, data) {
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.PersonalInfo = async function (id, data) {
  data.completeStep = 1;
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.CheckUserAvatar = async function (data) {
  if (await fs.existsSync(`./uploads/profiles/${data.avatar}`)) {
    await fs.unlinkSync(`./uploads/profiles/${data.avatar}`);
  }
};

module.exports.TitleOverview = async function (id, data) {
  data.completeStep = range(1, 2);
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.Categories = async function (id, data) {
  data.completeStep = range(1, 3);
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.Expertise = async function (id, data) {
  data.completeStep = range(1, 4);
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.ExpertiseLevel = async function (id, data) {
  data.completeStep = range(1, 5);
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.Education = async function (id, data) {
  data.completeStep = range(1, 6);
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.Employment = async function (id, data) {
  data.completeStep = range(1, 7);
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.HourlyRate = async function (id, data) {
  data.completeStep = range(1, 8);
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.Languages = async function (id, data) {
  data.completeStep = range(1, 9);
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.Address = async function (id, data) {
  data.completeStep = range(1, 10);
  data.completeProfile = true;
  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};

module.exports.UpdateProfile = async function (id, data) {
  const { address, expertise, education, employment, language } = data;

  if (address) {
    data.address = JSON.parse(address);
  } else if (expertise) {
    data.expertise = JSON.parse(expertise);
  } else if (education) {
    data.education = JSON.parse(education);
  } else if (employment) {
    data.employment = JSON.parse(employment);
  } else if (language) {
    data.language = JSON.parse(language);
  }

  const result = await User.findOneAndUpdate({ _id: id }, data);
  if (result) {
    return result;
  }
  return false;
};
