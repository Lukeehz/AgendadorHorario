const express = require("express")
const router = express.Router()
const agendaController = require ("../controllers/agendaController.js")

router.get("/home", agendaController.home)

module.exports = router