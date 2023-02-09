const db = require("../models");
const user = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const isEmailExist = await user.findOne({
        where: { email: email },
      });
      if (isEmailExist) {
        return res.status(409).json({ msg: "email tidak dapat di gunakan" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await user.create({
        email,
        password: hashPassword,
      });
      res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkLogin = await user.findOne({ where: { email } });
      if (!checkLogin) {
        return res.status(404).json({ msg: "email tidak ditemukan" });
      }
      const isValid = await bcrypt.compare(password, checkLogin.password);
      if (!isValid) {
        return res
          .status(401)
          .json({ msg: "email dan passwod tidak ditemukan" });
      }
      const payload = {
        id: checkLogin.id,
        email: checkLogin.email,
        isAdmin: checkLogin.isAdmin,
      };
      console.log(payload);
      const token = jwt.sign(payload, "testing Rendom", { expiresIn: "12h" });
      return res.status(200).json({ msg: "login Berhasil", token: token });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  keeplogin: async (req, res) => {
    try {
      // console.log(req.user);
      const isUserExist = await db.User.findOne({
        where: {
          id: req.user.id,
        },
        attributes: {
          exclude: [
            "password",
            "refreshToken",
            "isVerified",
            "verificationSignature",
          ],
        },
        raw: true,
      });
      // console.log(isUserExist);

      res.status(200).send(isUserExist);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
module.exports = AuthController;
