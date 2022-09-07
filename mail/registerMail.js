const nodemailer = require("nodemailer");
const Config = require("../config/config");

const RegisterEmail = (data) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: Config.MAIL_ADDRESS,
      pass: Config.MAIL_PASS,
    },
  });

  const mailoption = {
    from: "santi@tripleogames.com",
    to: data.email,
    subject: "Account Verification",
    text: "It works",
    html: `<h3><a href="${Config.SITE_URL}/VerifyEmail?id=${data.id}" style="text-decoration:none;background:#45b618;padding:8px 10px;border-radius:10px;color:#fff;font-weight:bold">Verify email</a></h3></h1><p>Go to this link and verify your account"</p>`,
  };

  transport.sendMail(mailoption, function (error) {
    if (error) {
      console.log("error", error);
    } else {
      console.log("email send");
    }
  });
};

const ResetPasswordEmail = (data) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: Config.MAIL_ADDRESS,
      pass: Config.MAIL_PASS,
    },
  });

  const mailoption = {
    from: "santi@tripleogames.com",
    to: data.email,
    subject: "Reset Password",
    text: "It works",
    html: `<h3><a href="${Config.SITE_URL}/ResetPasswordEmail?id=${data.id}" style="text-decoration:none;background:#45b618;padding:8px 10px;border-radius:10px;color:#fff;font-weight:bold">Reset your password</a></h3></h1><p>Go to this link and reset your password</p>`,
  };

  transport.sendMail(mailoption, function (error) {
    if (error) {
      console.log("error", error);
    } else {
      console.log("email send");
    }
  });
};

module.exports = {
  RegisterEmail,
  ResetPasswordEmail,
};
