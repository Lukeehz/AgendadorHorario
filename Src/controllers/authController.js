const User = require("../models/User");
const bcrypt = require('bcrypt');
const path = require("path");
const filePath = path.join(__dirname, "..", "..", "Public", "html", "index.html");

module.exports = class AuthController{
    static login (req,res){
        res.sendFile(filePath);
    }

