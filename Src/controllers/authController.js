const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const transporter = require("../helpers/nodemailer");

const filePath = path.join(__dirname, "..", "..", "Public", "html");
const salt = 10;

module.exports = class AuthController {
  static login(req, res) {
    res.sendFile(`${filePath}/index.html`);
  }

  static async loginPost(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.redirect("/auth?error=Email nao cadastrado");
      }

      const passwordMatch = await bcrypt.compare(password, user.senha);

      if (!passwordMatch) {
        return res.redirect("/auth?error=Senha incorreta");
      }

      req.session.userId = user.id;
      req.session.userType = user.tipo;

      req.session.save((err) => {
        if (err) {
          console.error("Erro ao salvar sessão:", err);
          return res.redirect("/auth?error=Erro ao iniciar sessão");
        }
        res.redirect("/home");
      });
    } catch (err) {
      console.error("Erro no login:", err);
      return res.redirect("/auth?error=Erro interno");
    }
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.redirect("/auth?error=Senhas nao conferem");
    }

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.redirect("/auth?error=Email ja cadastrado");
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

      req.session.save((err) => {
        if (err) {
          console.log(err);
          return res.redirect("/auth?error=Erro ao salvar sessão");
        }
        res.redirect("/home");
      });
    } catch (err) {
      console.log("Erro: ", err);
      res.redirect("/auth?error=Erro no servidor");
    }
  }

  static logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/auth");
    });
  }

  static forgot(req, res) {
    res.sendFile(`${filePath}/forgot.html`);
  }

  static async forgotPost(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.redirect("/forgot?error=Email não encontrado");
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = Date.now() + 10 * 60 * 1000; // 10 minutos

      await user.update({
        resetCode: code,
        resetCodeExpires: expires,
      });

      req.session.resetEmail = email;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Código de recuperação de senha",
        text: `Seu código é: ${code}`,
      });

      console.log("Código enviado por e-mail.");
      res.redirect("/forgot/code?success=Código enviado para o seu e-mail");
    } catch (err) {
      console.error(err);
      res.redirect("/forgot?error=Erro ao enviar o código");
    }
  }

  static forgotCode(req, res) {
    res.sendFile(`${filePath}/reset.html`);
  }

  static async forgotCodePost(req, res) {
    const { code } = req.body;
    const email = req.session.resetEmail;

    if (!email) {
      return res.redirect("/forgot?error=Sessão expirada, tente novamente");
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user || user.resetCode !== code || Date.now() > user.resetCodeExpires) {
        return res.redirect("/forgot/code?error=Código inválido ou expirado");
      }

      req.session.allowReset = true; // libera tela de reset

      res.redirect("/forgot/resetpass");
    } catch (err) {
      console.error(err);
      res.redirect("/forgot/code?error=Erro ao validar o código");
    }
  }

  static resetPass(req, res) {
    res.sendFile(`${filePath}/resetpass.html`);
  }

  static async forgotResetPost(req, res) {
    const { password, confirmPassword } = req.body;
    const email = req.session.resetEmail;

    if (!email || !req.session.allowReset) {
      return res.redirect("/forgot?error=Operação inválida");
    }

    if (password !== confirmPassword) {
      return res.redirect("/forgot/resetpass?error=As senhas não coincidem");
    }

    try {
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.update(
        {
          senha: hashedPassword,
          resetCode: null,
          resetCodeExpires: null,
        },
        { where: { email } }
      );

      // Limpa sessão
      req.session.resetEmail = null;
      req.session.allowReset = null;

      res.redirect("/auth?success=Senha alterada com sucesso");
    } catch (err) {
      console.error(err);
      res.redirect("/forgot/resetpass?error=Erro ao alterar senha");
    }
  }
};
