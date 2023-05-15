// ** Model
const User = require("../models/User");

module.exports.PersonalInfo = async function (id, data) {
  data.completeStep = 1;
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
