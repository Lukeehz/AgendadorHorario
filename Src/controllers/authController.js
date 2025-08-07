const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const filePath = path.join(
  __dirname,
  "..",
  "..",
  "Public",
  "html",
  "index.html"
);
const salt = 10;
module.exports = class AuthController {
  static login(req, res) {
    res.sendFile(filePath);
  }
  static async loginPost(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).redirect("/auth?error=Email nao cadastrado");
      }

      const passwordMatch = await bcrypt.compare(password, user.senha);

      if (!passwordMatch) {
        return res.status(400).redirect("/auth?error=Senha incorreta");
      }

      req.session.userId = user.id;
      req.session.userType = user.tipo;
      console.log("Sessão userType setada:", req.session.userType);


      req.session.save((err) => {
        if (err) {
          console.error("Erro ao salvar sessão:", err);
          return res.status(500).redirect("/auth?error=Erro ao iniciar sessão");
        }

        res.redirect("/home");
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).redirect("/auth?error=Erro interno no servidor");
    }
  }
  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).redirect("/auth?error=Senhas nao conferem");
    }

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).redirect("/auth?error=Email ja cadastrado");
    }

    try {
      const hash = await bcrypt.hash(password, salt);
      const user = await User.create({
        nome: name,
        email,
        senha: hash,
        tipo: "cliente",
      });

      req.session.userId = user.id;
      req.session.userType = user.tipo;
      console.log("Sessão userType setada:", req.session.userType);

      req.session.save((err) => {
        if (err) {
          console.log(err);
          return res.status(500).redirect("/auth?error=Erro ao salvar sessão");
        }
        res.redirect("/home");
      });
    } catch (err) {
      console.log("Erro: ", err);
      res.status(500).redirect("/auth?error=Erro no servidor");
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/auth");
  }
};
