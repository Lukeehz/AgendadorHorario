const express = require("express")
const router = express.Router()
const agendaController = require ("../controllers/agendaController.js")
const checkAuth = require("../middlewares/auth.js").checkAuth

router.get("/home", checkAuth, agendaController.home)
router.get("/admin", checkAuth, agendaController.admin)
router.post("/admin", checkAuth, agendaController.adminPost)

module.exports = router