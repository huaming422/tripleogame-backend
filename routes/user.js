let express = require("express");
var router = express.Router();

let authController = require("../controllers/userController");

router.post("/apple-login", authController.appleLogin);
router.post("/google-login", authController.googleLogin);

// Auth
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: ["User"]
 *     summary: "login to Feelancer || Client || Admin"
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
 *                 email:
 *                   type: string
 *                 password:
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
router.post("/login", authController.login);

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags: ["User"]
 *     summary: "ragister to system Freelcer || Client || Admin"
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
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 type:
 *                   type: string
 *                 role:
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
router.post("/register", authController.register);

/**
 * @swagger
 * /user/verify-email/{id}:
 *   get:
 *     tags: ["User"]
 *     summary: "verify email id"
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
router.get("/verify-email/:id", authController.verifyEmail);

/**
 * @swagger
 * /user/resend-email/{id}:
 *   get:
 *     tags: ["User"]
 *     summary: "resend email"
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
router.post("/resend-email", authController.resendEmail);

/**
 * @swagger
 * /user/send-resetPassword:
 *   post:
 *     tags: ["User"]
 *     summary: "send the reset pasword link in email"
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
 *                  email:
 *                    type: string
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
router.post("/send-resetPassword", authController.sendResetPassword);

/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     tags: ["User"]
 *     summary: "reset password"
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
 *                  userid:
 *                    type: string
 *                  password:
 *                    type: string
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
 *
 *
 * */
router.post("/reset-password", authController.resetPasswrod);

router.post("/siwe", authController.signWithEther);

router.get("/nonce", authController.nonce);

router.get("/personal_information", authController.getPersonalAddress);

router.post("/get_visit_history", authController.getAllVisitors);

module.exports = router;
