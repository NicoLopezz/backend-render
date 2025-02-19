
import Usuario from '../models/Users.js'
import bcrypt from 'bcryptjs'
import {sendEmailVeirifcation} from '../helpers/mailer.js'
import jsonwebtoken from 'jsonwebtoken'
import {config} from 'dotenv'

config();

async function register(req,res){
  const errors = [];
  const newUsuario = new Usuario({
    Identificator: 0,
    Estado_Financiero: {
      saldoInicial: 10
    },
    Name: req.body.Name , 
    Surname: req.body.Surname, 
    Email: req.body.Email,
    Pass: req.body.Pass,
    Verify: false,
    Movimientos:[],
  })
  
  const passHashusser = await bcrypt.hash(newUsuario.Pass , 10 )
  const emailUser = await Usuario.findOne({Email: newUsuario.Email})
 
    // if (newUsuario.Pass.length < 4 ) {
    //   console.log("al menos 4 letras en al contraseña")
    //   return errors.push({text:'Passwords must be at least 4 characters'})
    // }

    if(!newUsuario.Name || !newUsuario.Surname || !newUsuario.Pass){
      return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
    }

    if (emailUser){
      console.log(newUsuario.Email)
      return res.status(400).send({status:"Error",message:"Email ya registrado"})
    }

    //create JWT
    const token = jsonwebtoken.sign(
      {userMail:newUsuario.Email}, process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_EXPIRE})

    //create cookie

    const cookieOptions = {
      expire: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
      path: "/"
    }

    res.cookie("jwt",token,cookieOptions)

      //mail check send
      const mail = await sendEmailVeirifcation(newUsuario.Email, token)
  
     if(mail.accepted===0){
      return res(500).send({status:"error" , message: "error email to send verification"})
     }

      newUsuario.Pass = passHashusser;
      newUsuario.save();
      console.log(newUsuario)
      return res.status(201).json({ status: "Success", message: "Usuario registrado correctamente", redirect: "/api/login" })
}

// async function login (req ,res){
//   const newUsuario = new Usuario({
//     Email: req.body.Email,
//     Pass: req.body.Pass})
//     //retunr user from db
//     const userDb = await Usuario.findOne({Email: newUsuario.Email})
//     if(userDb){
//       //chequeo que el mail ingresado exista
//       //create JWT (AGREGO PARA QUE VIAJE EL EMAIL EN EL JWT)
//           const token = jsonwebtoken.sign(
//             {userMail:newUsuario.Email}, process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_EXPIRE})
      
//           //create cookie
          
//           const cookieOptions = {
//             expire: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
//             path: "/"
//           }
//           res.cookie("jwt",token,cookieOptions)
           
//       //check hashes
      
//       const isMatch = await bcrypt.compare(req.body.Pass, userDb.Pass)
  
//       // if(!userDb.Verify)
//       //    return res.status(401).json({status: "not logged" , message: "not valid email usser"}) 
  
//       if (userDb && newUsuario.Email==userDb.Email && isMatch){
//         console.log("user loged with: " + newUsuario.Email )
//         return res.status(201).json({ status: "logeado", message: `Usser mail ${newUsuario.Email} susccesfull` , redirect:"/api/verify"})
  
//         //REDIRIGIR LUEGO DE LOGEAR CORRECTAMENTE !!! 
  
//       }else{
//         res.status(401).send({status:"Error",message:"Las contraseñas no coinciden"})
//       }

//     }else{
//       return res.status(401).send({status:"Error",message:"Email not exist in database"})
//     }
// }

async function login(req, res) {
  try {
    const { Email, Pass } = req.body;

    // Buscar usuario en la base de datos
    const userDb = await Usuario.findOne({ Email });

    if (!userDb) {
      console.log("❌ El email no está en la base de datos");
      return res.status(401).json({ status: "Error", message: "El email no existe en la base de datos" });
    }

    // Comparar la contraseña ingresada con el hash almacenado
    const isMatch = await bcrypt.compare(Pass, userDb.Pass);

    if (!isMatch) {
      console.log("❌ La contraseña es incorrecta");
      return res.status(401).json({ status: "Error", message: "La contraseña es incorrecta" });
    }

    // ✅ **Generar el token JWT con el nombre del usuario**
    const token = jsonwebtoken.sign(
      { userMail: userDb.Email, userName: userDb.Nombre },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    console.log("✅ Token JWT generado correctamente");

    // ✅ **Configurar la cookie de forma segura**
    const cookieOptions = {
      httpOnly: true,  // Impide acceso desde JavaScript del frontend (previene XSS)
      secure: process.env.NODE_ENV === "production",  // Solo usa HTTPS en producción
      sameSite: "Strict",  // Previene ataques CSRF
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      path: "/"
    };

    // ✅ **Almacenar el token en la cookie**
    res.cookie("jwt", token, {
      httpOnly: true, // Protege la cookie para que no sea accesible desde JS en el navegador
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS si está en producción
      sameSite: "lax", // Permite el uso en el mismo sitio
      maxAge: 24 * 60 * 60 * 1000, // Expira en 1 día
  });
  
    res.cookie("username", userDb.Name, cookieOptions); // ← Nueva cookie con el nombre del usuario

    console.log("✅ Cookie de sesión almacenada correctamente");

    // ✅ **Responder con los datos del usuario**
    return res.status(201).json({
      status: "logeado",
      message: `Usuario ${userDb.Email} ha iniciado sesión exitosamente`,
      user: {
        email: userDb.Email,
        name: userDb.Name
      }
    });

  } catch (error) {
    console.error("❌ Error en el login:", error);
    return res.status(500).json({ status: "Error", message: "Error interno del servidor" });
  }
}


async function verifyCount(req,res){
    try {
      console.log("Entre en verify!!");
  
      // Verifica si las cookies están presentes
      if (!req.headers.cookie) {
        throw new Error("No cookies found");
      }
  
      // Captura el JWT de la cookie
      const cookieJWT = req.headers.cookie
        .split(";")
        .find(cookie => cookie.trim().startsWith("jwt="));
  
      // Verifica si la cookie "jwt" está presente
      if (!cookieJWT) {
        throw new Error("JWT cookie not found");
      }
  
      // Extrae el JWT de la cookie
      const token = cookieJWT.split("=")[1];
      console.log("El cookie JWT ES:", token);
  
      // Decodifica el JWT
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
      console.log("El token decodificado ES:", decoded);
  
      // Verifica si el JWT tiene el campo "userMail"
      if (!decoded.userMail) {
        throw new Error("Token does not contain userMail");
      }
  
      // Busca el usuario en la base de datos
      const userDb = await Usuario.findOne({ Email: decoded.userMail });
      if (!userDb) {
        throw new Error("User not found");
      }
  
      // Actualiza y guarda el estado de verificación del usuario
      console.log("Valor del usuario verificado:", userDb.Verify);
      userDb.Verify = true;
      await userDb.save();
      console.log("Valor del usuario verificado:", userDb.Verify);
  
      // Redirige después de la verificación exitosa
      res.redirect("/api/verify");
  
    } catch (error) {
      console.error(error.message);
      res.status(500).redirect("/");
    }
}

async function allUsers(req, res){


  try {
    const usuarios = await Usuario.find({});
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt; // Obtener token de las cookies
  if (!token) {
      return res.status(403).json({ status: "Error", message: "No se proporcionó un token" });
  }

  try {
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
      req.userEmail = decoded.userMail; // Guardar el email decodificado del token
      next(); // Avanzar al siguiente middleware o controlador
  } catch (error) {
      return res.status(401).json({ status: "Error", message: "Token inválido" });
  }
};


const dashboard = async (req, res) => {
  try {
    // Busca el usuario en la base de datos con el email del token verificado
    const usuario = await Usuario.findOne({ Email: req.userEmail });

    if (!usuario) {
      return res.status(404).send({ status: "Error", message: "Usuario no encontrado" });
    }

    // Datos que se enviarán al frontend
    const userData = {
      Name: usuario.Name,
      Surname: usuario.Surname,
      Email: usuario.Email,
      saldoInicial: usuario.Estado_Financiero.saldoInicial,
      Movimientos: usuario.Movimientos
    };

    // Respuesta exitosa con los datos del usuario
    res.status(200).json({ status: "Success", data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", message: "Error en el servidor" });
  }
};



export const methods = {
    register,
    login,
    verifyCount,
    allUsers,
    verifyToken,
    dashboard,
  }



