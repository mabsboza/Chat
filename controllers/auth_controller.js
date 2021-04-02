const { response } = require('express');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response)  => {
  try {
    const { email, password } = req.body;
    const isExistingEmail =  await User.findOne({email});
    if(isExistingEmail){
      return res.status(400).json({
        ok: false,
        msg: 'Correo no existe'
      });
    }
    const newUser = new User(req.body);
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);
    await newUser.save();
    const token = await generateJWT(newUser.id);
    res.json({
      ok: true,
      newUser,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Server Error',
    });
  }
  };

  const login = async(req, res)  => {

    try {
      const { email, password} = req.body;
      const dbUser =  await User.findOne({email});
      if(!dbUser){
        return res.status(404).json({
          ok: false,
          msg: 'Correo no existe'
        });
      }

      const validPassword = bcrypt.compareSync(password, dbUser.password);
      if(!validPassword){
        return res.status(404).json({
          ok: false,
          msg: 'Password incorrecta'
        });
      }
      const token = await generateJWT(dbUser.id);

      res.json({
        ok: true,
        dbUser,
        token
      });

    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Server Error',
      });
    }
  }

  const renew = async(req, res)  => {
    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);
    res.json({
      ok: 'true!',
      msg: 'Renew',
      token,
      user
    });
  };


  module.exports = {
    createUser,
    login,
    renew
  }