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

  static async loginPost(req, res){

    const {email,password} = req.body

    const user = await User.findOne({where:{email:email}})

    if(!user){
      return res.status(400).redirect("/auth?error=Email nao cadastrado")
    }

    const passwordMatch = await bcrypt.compare(password,user.senha)

    if(!passwordMatch){
      return res.status(400).redirect("/auth?error=Senha incorreta")
    }

    req.session.userid = user.id
    req.session.save((err)=>{
      res.redirect("/")
    })

  }

  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    console.log({ name, email, password, confirmPassword });

    if (password !== confirmPassword) {
      return res.status(400).redirect("/auth?error=Senhas nao conferem");
    }

    const userExists = await User.findOne({ where: { email: email } });

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

      req.session.userid = user.id;

      req.session.save((err) => {
        res.status(200).redirect("/");
      });
    } catch (err) {
      console.log("Erro: ", err);
            res.status(500).redirect("/auth?error=Erro no servidor");
    }
  }
};
