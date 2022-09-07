let express = require("express");
var router = express.Router();

// ** middleware
const Authenticate = require("../middleware/authenticate");

let nftMarketController = require("../controllers/nftMarketController");

/**
 * @swagger
 * /get-userinfo:
 *   post:
 *     tags: ["Profile"]
 *     summary: "get user info"
 *     produces: ["application/json"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Sever Error
 * */

router.post("/list", Authenticate, nftMarketController.listNFT);

module.exports = router;
