const User = require("../models/User");
const path = require("path");


module.exports = class AgendaController {
    static home(req, res) {
        res.render("agenda/home");
    }
};