const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  client_id: process.env.APPLE_CLIENT_ID,
  team_id: process.env.TEAM_ID,
  key_id: process.env.KEY_ID,
  redirect_uri: process.env.REDIRECT_URI,
  scope: process.env.SCOPE,
};
