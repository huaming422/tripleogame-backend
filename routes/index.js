const express = require("express");
const router = express.Router();

//select the router file
var userRouter = require("./user");
var profileRouter = require("./profile");
var nftRouter = require("./nft");

router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/nft", nftRouter);

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Tripleogames API" });
});

module.exports = router;
