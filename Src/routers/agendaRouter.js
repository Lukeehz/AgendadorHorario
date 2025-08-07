const express = require("express")
const router = express.Router()
const agendaController = require ("../controllers/agendaController.js")
const checkAuth = require("../middlewares/auth.js").checkAuth

router.get("/home", checkAuth, agendaController.home)

module.exports = router