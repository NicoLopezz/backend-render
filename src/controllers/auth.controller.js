import { ok } from 'assert';
import Usuario from '../models/Users.js'
import bcrypt from 'bcryptjs'
import transporter from '../helpers/mailer.js'
// import jwt, { TokenExpiredError } from 'jsonwebtoken'

async function register(req,res){
    const errors = [];
    const newUsuario = new Usuario({
      Name: req.body.Name , 
      Surname: req.body.Surname, 
      Email: req.body.Email,
      Company: req.body.Company,
      Country: req.body.Country, 
      Pass: req.body.Pass
    })
      
    const passHashusser = await bcrypt.hash(newUsuario.Pass , 10 )
 
    if (newUsuario.Pass.length < 4 ) {
      errors.push({text:'Passwords must be at least 4 characters'})
      console.log("al menos 4 letras en al contraseña")
    }

    if(!newUsuario.Name || !newUsuario.Surname || !newUsuario.Pass){
      return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
    }

    const emailUser = await Usuario.findOne({Email: newUsuario.Email})
    if (emailUser){
      res.status(400).send({status:"Error",message:"Email ya registrado"})
      console.log(newUsuario.Email)
    }
    
    else{
      newUsuario.Pass = passHashusser;
      newUsuario.save();
      console.log(newUsuario)
      return res.status(201).json({ status: "Success", message: "Usuario registrado correctamente", redirect: "api/login" })
    }


}

async function login (req ,res){
  const newUsuario = new Usuario({
    Email: req.body.Email,
    Pass: req.body.Pass})
    //traigo el usuraio desde mi DB
    const userDb = await Usuario.findOne({Email: newUsuario.Email})
    //pruebo si coinciden los hashes
    const isMatch = await bcrypt.compare(req.body.Pass, userDb.Pass)
    
    console.log("pass match? " + isMatch)
    if (userDb && newUsuario.Email==userDb.Email && isMatch){
      console.log("user loged with: " + newUsuario.Email )
      return res.status(201).json({ status: "logeado", message: `Usser mail ${newUsuario.Email} susccesfull`})
    }else{
      res.status(401).send({status:"Error",message:"Las contraseñas no coinciden"})
    }
}

async function sendEmail (req, res){
  const { email } = req.params
  const result = await transporter.sendMail({
    from: `Oxygen Group ${process.env.EMAIL}`, 
    to: email,
    subject: 'TESTING',
    html: '<h1>TESTING HTML OF BODY</h1>'
  })
    console.log({result})
    res.status(200).json({ok: true , message: "Code email sended with success"})
  }

export const methods = {
    register,
    login,
    sendEmail,
  }



