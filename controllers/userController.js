const {
  UserLogin,
  SocialLogin,
  UserCreate,
  ValidateEmail,
  GetUserById,
  GetUserByEmail,
  VerifyEmail,
  ResetPassword,
  VisitorCreate,
  GetAllVisitor,
} = require("../services/userService");
const { generateNonce, ErrorTypes, SiweMessage } = require("siwe");
const AppleAuth = require("apple-auth");
// const { OAuth2Client } = require("google-auth-library");
const fs = require("fs");
const axios = require("axios");
const config = require("../config/appleConfig");
const jwt = require("jsonwebtoken");
const { RegisterEmail, ResetPasswordEmail } = require("../mail/registerMail");

let auth = new AppleAuth(
  config,
  fs.readFileSync("../config/AuthKey.p8").toString(),
  "text"
);

module.exports = {
  appleLogin: async function (req, res) {
    try {
      const response = await auth.accessToken(req.body.authorization.code);
      const idToken = jwt.decode(response.id_token);

      const user = {};
      user.id = idToken.sub;

      if (idToken.email) user.email = idToken.email;
      if (req.body.user) {
        const { name } = JSON.parse(req.body.user);
        user.name = name;
      }

      const validateUser = await ValidateEmail(user.email);
      if (!validateUser) {
        return res.status(203).send({
          success: false,
          notExit: "Email does not exist!",
        });
      }
      const token = await SocialLogin(validateUser);

      if (token) {
        if (token.success) {
          return res.status(200).json({
            success: true,
            token: token,
            data: await GetUserById(validateUser._id),
            message: "You have successfully logged in!",
          });
        } else {
          return res.status(203).json({
            success: token.success,
            error: token.message,
          });
        }
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while Apple Login",
      });
    }
  },

  googleLogin: async function (req, res) {
    try {
      const { token } = req.body;

      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
        )
        .then(async ({ data }) => {
          const { email, sub } = data;

          const validateUser = await ValidateEmail(email);
          if (!validateUser) {
            const user = await UserCreate({ email: email, password: sub });
            if (user) {
              const sessionToken = await SocialLogin(user);

              if (sessionToken) {
                if (sessionToken.success) {
                  return res.status(200).json({
                    success: true,
                    token: sessionToken,
                    data: await GetUserById(user._id),
                    message: "You have successfully logged in!",
                  });
                } else {
                  return res.status(203).json({
                    success: sessionToken.success,
                    error: sessionToken.message,
                  });
                }
              }
            }
          }
          const sessionToken = await SocialLogin(validateUser);

          if (sessionToken) {
            if (sessionToken.success) {
              return res.status(200).json({
                success: true,
                token: sessionToken,
                data: await GetUserById(validateUser._id),
                message: "You have successfully logged in!",
              });
            } else {
              return res.status(203).json({
                success: sessionToken.success,
                error: sessionToken.message,
              });
            }
          }
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            error: err || "Error while Apple Login",
          });
        });
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while Apple Login",
      });
    }
  },

  login: async function (req, res) {
    const { email, password } = req.body;

    try {
      const user = await ValidateEmail(email);
      if (!user) {
        return res.status(203).send({
          success: false,
          notExit: "Email does not exist!",
        });
      }
      if (!user.isVerified) {
        return res.status(203).json({
          status: false,
          notVerify: "Account is still in review, please verify your email.",
        });
      }
      const token = await UserLogin(user, password);

      if (token) {
        if (token.success) {
          return res.status(200).json({
            success: true,
            token: token,
            data: await GetUserById(user._id),
            message: "You have successfully logged in!",
          });
        } else {
          return res.status(203).json({
            success: token.success,
            error: token.message,
          });
        }
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while login",
      });
    }
  },
  register: async function (req, res) {
    const { email } = req.body;
    try {
      if (email) {
        const isEmail = await ValidateEmail(email);
        if (isEmail)
          return res.status(203).json({
            success: false,
            error: { email: "Email is already registered" },
          });
      }
      const user = await UserCreate(req.body);
      if (user) {
        return res.status(200).json({
          success: true,
          data: await GetUserById(user._id),
          message: "You have successfully register!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while register",
      });
    }
  },
  verifyEmail: async function (req, res) {
    const { id } = req.params;
    try {
      const user = await VerifyEmail(id);
      if (user) {
        return res.status(200).json({
          success: true,
          message: "Email confirm successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while verify email",
      });
    }
  },
  resendEmail: async function (req, res) {
    const { email } = req.body;
    try {
      if (email) {
        const user = await ValidateEmail(email);
        if (!user) {
          return res.status(203).send({
            success: false,
            notExit: "Email does not exist!",
          });
        } else {
          await RegisterEmail(user);
          return res.status(200).json({
            success: true,
            message: "Email resend successfully!",
          });
        }
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error || "Error while resend email",
      });
    }
  },
  sendResetPassword: async function (req, res) {
    const { email } = req.body;
    try {
      const user = await GetUserByEmail(email);
      if (user) {
        await ResetPasswordEmail(user);
        return res.status(200).json({
          success: true,
          message: "Reset password link was sent successfully",
        });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        // eslint-disable-next-line no-undef
        error: error || "Error while send the reset password link",
      });
    }
  },
  resetPasswrod: async function (req, res) {
    const { userid, password } = req.body;
    try {
      const user = await ResetPassword(userid, password);
      if (user) {
        return res.status(200).json({
          success: true,
          message: "Password was reset successfully",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error while reset the password",
      });
    }
  },
  signWithEther: async function (req, res) {
    try {
      if (!req.body.message) {
        res
          .status(422)
          .json({ message: "Expected prepareMessage object as body." });
        return;
      }

      let message = new SiweMessage(req.body.message);
      const fields = await message.validate(req.body.signature);
      const visitors = await VisitorCreate();
      console.log("visitors", visitors);
      req.session.siwe = fields;
      req.session.cookie.expires = new Date(fields.expirationTime);
      req.session.save(() => res.status(200).end());
    } catch (e) {
      req.session.siwe = null;
      req.session.nonce = null;
      console.error(e);
      switch (e) {
        case ErrorTypes.EXPIRED_MESSAGE: {
          req.session.save(() => res.status(440).json({ message: e.message }));
          break;
        }
        case ErrorTypes.INVALID_SIGNATURE: {
          req.session.save(() => res.status(422).json({ message: e.message }));
          break;
        }
        default: {
          req.session.save(() => res.status(500).json({ message: e.message }));
          break;
        }
      }
    }
  },
  nonce: async function (req, res) {
    req.session.nonce = generateNonce();
    return res.status(200).json({
      success: true,
      message: req.session.nonce,
    });
  },

  getPersonalAddress: async function (req, res) {
    if (!req.session.siwe) {
      res.status(401).json({ message: "You have to first sign_in" });
      return;
    }
    console.log("User is authenticated!");
    res.setHeader("Content-Type", "text/plain");
    res.send(
      `You are authenticated and your address is: ${req.session.siwe.address}`
    );
  },

  getAllVisitors: async (req, res) => {
    try {
      const visitHistory = await GetAllVisitor(req);

      res.status(200).json({
        status: "success",
        visitHistory,
      });
    } catch (err) {
      return res.status(400).json({
        error: {
          msg: err.message,
        },
      });
    }
  },
};
