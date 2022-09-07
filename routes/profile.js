let express = require("express");
const multer = require("multer");
const path = require("path");
var router = express.Router();

// ** middleware
const Authenticate = require("../middleware/authenticate");

let profileController = require("../controllers/profileController");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG)$/)) {
      req.fileValidationError = "Only JPG OR PNG OR JPEG allowed!";
      return cb("Only .jpeg, .png and .jpg are allowed! ", false);
    }
    cb(null, true);
  },
}).single("avatar");

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

router.post("/get-userinfo", Authenticate, profileController.getUserInfo);

/**
 * @swagger
 * /create-profile/save-personal-info:
 *   post:
 *     tags: ["Profile"]
 *     summary: "save the personal info"
 *     produces: ["application/json"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 linkedinurl:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                   format: base64
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
router.post(
  "/create-profile/save-personal-info",
  Authenticate,
  upload,
  profileController.savePersonalInfo
);

/**
 * @swagger
 * /update-profile:
 *   post:
 *     tags: ["Profile"]
 *     summary: "update the profile"
 *     produces: ["application/json"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 linkedinurl:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                 title:
 *                   type: string
 *                 professionaloverview:
 *                   type: string
 *                 category:
 *                   type: string
 *                 subcategory:
 *                   type: string
 *                 expertise:
 *                   type: string
 *                 expertiselevel:
 *                   type: string
 *                 education:
 *                   type: string
 *                 employment:
 *                   type: string
 *                 hourlyrate:
 *                   type: string
 *                 englishproficiency:
 *                   type: string
 *                 language:
 *                   type: string
 *                 address:
 *                   type: string
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
router.post(
  "/update-profile",
  upload,
  Authenticate,
  profileController.updateProfile
);

module.exports = router;
