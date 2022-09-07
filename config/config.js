const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  ROUTER_EMAIL: "",
  ROUTER_EMAIL_PASSWORD: "",
  SITE_URL: process.env.SITE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR,
  MONGODB_URL: process.env.MONGODB_URL,
  MAIL_ADDRESS: process.env.MAIL_ADDRESS,
  MAIL_PASS: process.env.MAIL_PASS,
};
