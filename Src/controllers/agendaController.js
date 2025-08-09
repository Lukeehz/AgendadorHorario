const User = require("../models/User");
const path = require("path");
const bcrypt = require("bcrypt")
const salt = 10

module.exports = class AgendaController {
    static home(req, res) {
        res.render("agenda/home");
    }
    static admin(req, res) {
        res.render("agenda/admin")
    }

    static async adminPost(req, res) {
        const { nome, email, password, confirmPassword } = req.body

        console.log(req.body)

        if (password !== confirmPassword) {
            req.flash('message', "as senhas não conferem!")
            res.redirect("/admin")
            return
        }

        const checkIfUserExists = await User.findOne({ where: { email: email } })

        if (checkIfUserExists) {
            req.flash("message", "Usuário já existente")
            res.redirect("/admin")

            return
        }

        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({
            nome: nome,
            email: email,
            senha: hash,
            tipo: "proprietario"
        });

        req.flash("message", "Usuário criado com sucesso");
        res.redirect("/admin");
    }
};