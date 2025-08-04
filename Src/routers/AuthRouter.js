const express = require("express")
const router = express.Router()
const authController= require ("../controllers/AuthController.js")

router.get("/login", authController.login)

module.exports = router