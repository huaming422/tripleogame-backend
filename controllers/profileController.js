const { GetUserById } = require("../services/userService");
const {
  PersonalInfo,
  ClientPersonalInfo,
  TitleOverview,
  Categories,
  Expertise,
  ExpertiseLevel,
  Education,
  Employment,
  HourlyRate,
  Languages,
  Address,
  CheckUserAvatar,
  UpdateProfile,
} = require("../services/profileService");

module.exports = {
  getUserInfo: async function (req, res) {
    try {
      const user = await GetUserById(req.userid);
      if (user) {
        return res.status(200).json({
          success: true,
          data: user,
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "User Not Exit",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while verify email",
      });
    }
  },
  saveClientInfo: async function (req, res) {
    let data = req.body;
    try {
      const user = await ClientPersonalInfo(req.userid, data);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "Client Personal Information update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error || "Error while  professional overview",
      });
    }
  },
  savePersonalInfo: async function (req, res) {
    let data = {};
    if (req.file) {
      const user = await GetUserById(req.userid);
      await CheckUserAvatar(user);
      data = {
        ...req.body,
        avatar: req.file.filename,
      };
    } else {
      data = {
        ...req.body,
      };
    }
    try {
      const user = await PersonalInfo(req.userid, data);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "Personal Information update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error || "Error while  professional overview",
      });
    }
  },
  saveTitleOverview: async function (req, res) {
    try {
      const user = await TitleOverview(req.userid, req.body);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "Title overview update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while  Title overview",
      });
    }
  },
  saveCategories: async function (req, res) {
    try {
      const user = await Categories(req.userid, req.body);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while  Title overview",
      });
    }
  },
  saveExpertise: async function (req, res) {
    try {
      const user = await Expertise(req.userid, req.body);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "Expertise update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while  Expertise",
      });
    }
  },
  saveExpertiseLevel: async function (req, res) {
    try {
      const user = await ExpertiseLevel(req.userid, req.body);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "Expertise level update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error,
        error: error || "Error while  Expertise level",
      });
    }
  },
  saveEducation: async function (req, res) {
    try {
      const user = await Education(req.userid, req.body);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "Education update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error,
        error: error || "Error while Education",
      });
    }
  },
  saveEmployment: async function (req, res) {
    try {
      const user = await Employment(req.userid, req.body);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "Employment update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error,
        error: error || "Error while Employment",
      });
    }
  },
  saveHourlyRate: async function (req, res) {
    try {
      const user = await HourlyRate(req.userid, req.body);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "HourlyRate update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error,
        error: error || "Error while HourlyRate",
      });
    }
  },
  saveLanguages: async function (req, res) {
    try {
      const user = await Languages(req.userid, req.body);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "Languages update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while Languages",
      });
    }
  },
  saveAddress: async function (req, res) {
    try {
      const user = await Address(req.userid, req.body);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "Address update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while Address",
      });
    }
  },
  updateProfile: async function (req, res) {
    try {
      let data = {};
      if (req.file) {
        const user = await GetUserById(req.userid);
        await CheckUserAvatar(user);
        data = {
          ...req.body,
          avatar: req.file.filename,
        };
      } else {
        data = {
          ...req.body,
        };
      }
      const user = await UpdateProfile(req.userid, data);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "Profile update successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while Address",
      });
    }
  },
};
