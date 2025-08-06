const express = require("express")
const router = express.Router()
const authController= require ("../controllers/AuthController.js")

router.get("/auth", authController.login)
router.post("/login", authController.loginPost)
router.post("/register", authController.registerPost)
router.post("/logout", authController.logout)

module.exports = router