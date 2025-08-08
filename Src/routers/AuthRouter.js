const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController.js");

router.get("/auth", authController.login);
router.post("/login", authController.loginPost);
router.post("/register", authController.registerPost);
router.post("/logout", authController.logout);

router.get("/forgot", authController.forgot);
router.post("/forgot", authController.forgotPost);

router.get("/forgot/code", authController.forgotCode);
router.post("/forgot/code", authController.forgotCodePost);

router.get("/forgot/resetpass", authController.resetPass);
router.post("/forgot/reset", authController.forgotResetPost); // <<< faltava

module.exports = router;
