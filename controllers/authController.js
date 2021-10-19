const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {JWTGenerate} = require('../helpers/JWT')

const userCreate = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar el email
    let userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        ok: false,
        msg: "Este correo ya esta en uso",
      });
    }

    const user = new User(req.body);
    // encriptar la password y crear el usuario
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generar JWT
    const token = await JWTGenerate(user.id, user.name)

    res.status(201).json({
      ok: true,
      msg: "true",
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo ha salido mal",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar el email
    let userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    // validar password
    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Email o Password incorrecto",
      });
    }

    // Generar el JWT
    const token = await JWTGenerate(userExist.id, userExist.name)
    res.json({
      ok: true,
      uid: userExist.id,
      name: userExist.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Algo ha salido mal",
    });
  }
};

const tokenRevalidate = async (req, res) => {

  const token = await JWTGenerate(req.uid, req.name)
  res.json({
    ok: true,
    token,
    name: req.name,
    uid: req.uid
  })
};

module.exports = {
  userCreate,
  userLogin,
  tokenRevalidate,
};
