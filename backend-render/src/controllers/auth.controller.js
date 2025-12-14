import Usuario from '../models/Users.js'
import LumenAffiliateCode from '../models/LumenAffiliateCodes.js'
import AffiliateCode from '../models/AffiliateCodes.js'
import bcrypt from 'bcryptjs'
import {sendWelcomeEmailNuevoEstilo,sendWelcomeEmailNuevoEstiloEN,sendTwoFactorEmail,sendTwoFactorEmailEN} from '../helpers/mailer-resend.js'
import jsonwebtoken from 'jsonwebtoken'
import {config} from 'dotenv'
import crypto from 'crypto'

const invalidatedTokens = new Set();

config();

const generateSecure2FACode = () => {
  const randomBytes = crypto.randomBytes(3);
  const randomNumber = randomBytes.readUIntBE(0, 3);
  const code = (100000 + (randomNumber % 900000)).toString().padStart(6, '0');
  return code;
};

const normalizeJWTExpire = (value) => {
    if (!value) return '2h';
    
    const str = String(value).trim();
    
    if (/^\d+$/.test(str)) {
        const num = parseInt(str, 10);
        if (num <= 24) {
            return `${num}h`;
        } else {
            return `${num}d`;
        }
    }
    
    if (/^\d+[hdms]$/i.test(str)) {
        return str;
    }
    
    return '2h';
};

async function register(req, res) {
  try {
    const { fullName, email, password, country, companyName, affiliateCode } = req.body;

    if (!fullName || !email || !password || !country) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, password, and country are required"
      });
    }

    const emailUser = await Usuario.findOne({ email });

    if (emailUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    const passHash = await bcrypt.hash(password, 10);

    let saldoInicial = 0;
    let usedAffiliateCode = null;
    let bonusOMsReceived = 0;
    let affiliateCodeUsedAt = null;
    let affiliateCodeDoc = null;
    let affiliateCodeType = null;

    if (affiliateCode) {
      console.log("🔍 Searching affiliate code in both tables:", affiliateCode);
      
      affiliateCodeDoc = await LumenAffiliateCode.findByCode(affiliateCode);
      
      if (affiliateCodeDoc) {
        affiliateCodeType = "code_lumen";
        console.log("✅ Found in LumenAffiliateCodes table");
      } else {
        affiliateCodeDoc = await AffiliateCode.findOne({ code: affiliateCode });
        if (affiliateCodeDoc) {
          affiliateCodeType = "code_standard";
          console.log("✅ Found in AffiliateCodes table");
        }
      }

      if (!affiliateCodeDoc) {
        return res.status(400).json({
          success: false,
          message: "Affiliate code not found"
        });
      }

      if (!affiliateCodeDoc.isActive) {
        return res.status(400).json({
          success: false,
          message: "Affiliate code is inactive"
        });
      }

      if (affiliateCodeDoc.isUsed) {
        return res.status(400).json({
          success: false,
          message: "Affiliate code has already been used"
        });
      }

      usedAffiliateCode = affiliateCodeDoc._id;
      bonusOMsReceived = affiliateCodeDoc.bonusOMs;
      
      affiliateCodeDoc.isUsed = true;
      affiliateCodeDoc.usedAt = new Date();
      affiliateCodeDoc.usedEmail = email;
      affiliateCodeDoc.usageDetails = {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        country: country
      };
      
      console.log(`✅ Affiliate code prepared for marking as used (${affiliateCodeType}):`, affiliateCode);
    }

  const newUsuario = new Usuario({
      fullName,
      email,
      password: passHash,
      country,
      companyName,
      affiliateCode,
      usedAffiliateCode,
      bonusOMsReceived,
      affiliateCodeUsedAt,
    Estado_Financiero: {
        saldoInicial: saldoInicial,
    },
    Verify: false,
    Movimientos: [],
  });

  if (!process.env.JWT_SECRET_KEY) {
    console.error('JWT_SECRET_KEY is not defined in environment variables');
      return res.status(500).json({
        success: false,
        message: "Server configuration error"
      });
  }
  
  const token = jsonwebtoken.sign(
      { userMail: newUsuario.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: normalizeJWTExpire(process.env.JWT_EXPIRE) }
  );

  const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: (Number(process.env.JWT_COOKIE_EXPIRE) || 1) * 24 * 60 * 60 * 1000,
      path: "/",
  };

  res.cookie("jwt", token, cookieOptions);

  let lang = "es";
  if (req.originalUrl?.startsWith("/en/") || req.url?.startsWith("/en/")) {
    lang = "en";
  }

    try {
      const verificationToken = jsonwebtoken.sign(
        { userMail: newUsuario.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
      );

  let mail;
  if (lang === "en") {
        mail = await sendWelcomeEmailNuevoEstiloEN(newUsuario.email, verificationToken);
  } else {
        mail = await sendWelcomeEmailNuevoEstilo(newUsuario.email, verificationToken);
  }

  if (!mail || mail.success === false || mail.accepted === 0) {
        console.log("⚠️ Email sending failed, but user will still be registered");
      } else {
        console.log("✅ Verification email sent successfully");
      }
    } catch (emailError) {
      console.log("⚠️ Email sending failed:", emailError.message);
      console.log("⚠️ User will still be registered");
      console.log("💡 Check your .env file for EMAIL and EMAIL_PASSWORD configuration");
      console.log("💡 For Zoho, make sure SMTP is enabled in your account settings");
    }

  await newUsuario.save();
  
  if (affiliateCode && affiliateCodeDoc) {
    affiliateCodeDoc.usedBy = newUsuario._id;
    await affiliateCodeDoc.save();
    console.log("✅ Affiliate code marked as used with user ID:", affiliateCode);
  }
    console.log("✅ User saved to database:", newUsuario.email);

    const responseData = {
      success: true,
      message: "User registered successfully. Please check your email to verify your account and activate your affiliate code.",
      user: {
        id: newUsuario._id,
        email: newUsuario.email,
        fullName: newUsuario.fullName,
        country: newUsuario.country,
        affiliateCode: newUsuario.affiliateCode,
        bonusOMsReceived: newUsuario.bonusOMsReceived
      }
    };

    if (affiliateCodeType) {
      responseData.affiliateCodeType = affiliateCodeType;
      responseData.messageType = affiliateCodeDoc?.messageType || 'default';
      responseData.message += ` Affiliate code type: ${affiliateCodeType}`;
    }

    return res.status(200).json(responseData);

  } catch (error) {
    console.error("Registration error:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
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
    const { email, password } = req.body;
    
    console.log("🔍 Login attempt for email:", email);
    console.log("🔍 Login attempt with password:", password ? "Provided" : "Missing");

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ 
        status: "Error", 
        message: "Email and password are required" 
      });
    }

    const userDb = await Usuario.findOne({ email });
    console.log("📧 User found:", userDb ? "Yes" : "No");

    if (!userDb) {
      console.log("❌ Email not found in database");
      return res.status(401).json({ status: "Error", message: "Email not found in database" });
    }

    if (!userDb.password) {
      console.log("❌ User has no password stored");
      return res.status(401).json({ status: "Error", message: "Invalid user account" });
    }

    console.log("🔐 Checking password...");
    const isMatch = await bcrypt.compare(password, userDb.password);
    console.log("🔐 Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Password is incorrect");
      return res.status(401).json({ status: "Error", message: "Password is incorrect" });
    }

    console.log("✅ Password verified, checking email verification...");
    console.log("📧 Verification status:", userDb.Verify);
    
    if (!userDb.Verify) {
      console.log("❌ Email not verified");
      return res.status(401).json({ 
        status: "Error", 
        message: "Please verify your email before logging in. Check your inbox for the verification link." 
      });
    }

    console.log("✅ Email verified, completing login...");

    const isFirstLogin = userDb.isFirstLogin === undefined || userDb.isFirstLogin === true;

    // Actualizar stats de login
    if (isFirstLogin) {
      userDb.isFirstLogin = false;
    }
    userDb.lastLoginAt = new Date();
    userDb.loginCount = (userDb.loginCount || 0) + 1;
    await userDb.save();

    console.log("✅ Login stats updated, generating JWT...");

    // Obtener messageType del código de afiliación si existe
    let affiliateMessageType = 'default';
    if (userDb.usedAffiliateCode) {
      let affiliateCodeDoc = await LumenAffiliateCode.findById(userDb.usedAffiliateCode);
      if (!affiliateCodeDoc) {
        affiliateCodeDoc = await AffiliateCode.findById(userDb.usedAffiliateCode);
      }
      if (affiliateCodeDoc) {
        affiliateMessageType = affiliateCodeDoc.messageType || 'default';
      }
    }

    const jwtExpire = normalizeJWTExpire(process.env.JWT_EXPIRE);
    console.log("🔑 JWT_EXPIRE original:", process.env.JWT_EXPIRE);
    console.log("🔑 JWT_EXPIRE normalizado:", jwtExpire);

    const token = jsonwebtoken.sign(
      { userMail: userDb.email, userName: userDb.fullName },
      process.env.JWT_SECRET_KEY,
      { expiresIn: jwtExpire }
    );

    console.log("✅ JWT token generated successfully");

    try {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/"
      };

      res.cookie("jwt", token, cookieOptions);
      res.cookie("username", userDb.fullName, cookieOptions);

      console.log("✅ Session cookie stored successfully");

      return res.status(201).json({
        status: "logged",
        message: `User ${userDb.email} has logged in successfully`,
        messageType: affiliateMessageType,
        user: {
          email: userDb.email,
          name: userDb.fullName,
          fullName: userDb.fullName,
          country: userDb.country,
          companyName: userDb.companyName,
          affiliateCode: userDb.affiliateCode,
          bonusOMsReceived: userDb.bonusOMsReceived,
          affiliateCodeUsedAt: userDb.affiliateCodeUsedAt,
          saldoInicial: userDb.Estado_Financiero?.saldoInicial || 0,
          omBalance: userDb.omBalance || 0,
          carbonCredits: userDb.carbonCredits || 0,
          isFirstLogin: isFirstLogin,
          welcomeModalShown: userDb.welcomeModalShown || false,
          onboardingStep: userDb.onboardingStep || 'pending',
          profileCompleted: userDb.profileCompleted || false,
          loginCount: userDb.loginCount || 0,
          lastLoginAt: userDb.lastLoginAt,
          Movimientos: userDb.Movimientos || [],
          walletAddress: userDb.wallet_address || null
        }
      });
    } catch (cookieError) {
      console.error("❌ Cookie error:", cookieError.message);
      return res.status(500).json({ status: "Error", message: "Cookie setting error" });
    }

    // TODO: 2FA desactivado temporalmente - descomentar cuando sea necesario
    /*
    else {
      console.log("✅ Not first login, generating 2FA code...");

      const twoFactorCode = generateSecure2FACode();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      userDb.twoFactorCode = twoFactorCode;
      userDb.twoFactorCodeExpires = expiresAt;
      await userDb.save();

      console.log("✅ 2FA code generated and saved");

      let lang = "es";
      if (req.originalUrl?.startsWith("/en/") || req.url?.startsWith("/en/")) {
        lang = "en";
      }

      try {
        let mail;
        if (lang === "en") {
          mail = await sendTwoFactorEmailEN(userDb.email, twoFactorCode);
        } else {
          mail = await sendTwoFactorEmail(userDb.email, twoFactorCode);
        }

        if (!mail || mail.success === false) {
          console.log("⚠️ 2FA email sending failed, but code was generated");
          return res.status(201).json({
            status: "2fa_required",
            message: "2FA code generated but email sending failed. Please try again.",
            requires2FA: true
          });
        } else {
          console.log("✅ 2FA email sent successfully");
        }
      } catch (emailError) {
        console.log("⚠️ 2FA email sending failed:", emailError.message);
        return res.status(201).json({
          status: "2fa_required",
          message: "2FA code generated but email sending failed. Please try again.",
          requires2FA: true
        });
      }

      return res.status(201).json({
        status: "2fa_required",
        message: "2FA code sent to your email. Please verify to complete login.",
        requires2FA: true,
        email: userDb.email
      });
    }
    */

  } catch (error) {
    console.error("❌ Login error:", error.message);
    console.error("❌ Error stack:", error.stack);
    return res.status(500).json({ status: "Error", message: "Internal server error" });
  }
}


async function verifyCount(req,res){
    try {
      console.log("🔍 Email verification process started");
  
      const { token } = req.params;
      
      if (!token) {
        console.log("❌ No token provided");
        return res.status(400).redirect("/verify-error");
      }
  
      console.log("📧 Verifying token:", token);
  
      // Decodifica el JWT
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
      console.log("✅ Token decoded:", decoded);
  
      // Verifica si el JWT tiene el campo "userMail"
      if (!decoded.userMail) {
        console.log("❌ Token does not contain userMail");
        return res.status(400).redirect("/verify-error");
      }
  
      // Busca el usuario en la base de datos
      const userDb = await Usuario.findOne({ email: decoded.userMail });
      if (!userDb) {
        console.log("❌ User not found:", decoded.userMail);
        return res.status(404).redirect("/verify-error");
      }
  
            // Procesa el código de afiliado si existe
      if (userDb.affiliateCode && userDb.usedAffiliateCode) {
        const affiliateCodeDoc = await LumenAffiliateCode.findById(userDb.usedAffiliateCode);
        
        if (affiliateCodeDoc && !affiliateCodeDoc.isUsed) {
          affiliateCodeDoc.isUsed = true;
          affiliateCodeDoc.usedAt = new Date();
          affiliateCodeDoc.usedBy = userDb._id;
          affiliateCodeDoc.usedEmail = userDb.email;
          affiliateCodeDoc.usageDetails = {
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            country: userDb.country
          };
          
          await affiliateCodeDoc.save();
          console.log("✅ Affiliate code marked as used:", userDb.affiliateCode);
          
          // Actualiza el saldo del usuario
          userDb.Estado_Financiero.saldoInicial = userDb.bonusOMsReceived;
          userDb.affiliateCodeUsedAt = new Date();
          userDb.onboardingStep = 'affiliate_processed';
          console.log("✅ User balance updated with affiliate bonus:", userDb.bonusOMsReceived);
        
        // Google Sheet update moved to verifyWithQuery only
        }
      }
  
      // Actualiza y guarda el estado de verificación del usuario
      console.log("📝 Current verification status:", userDb.Verify);
      userDb.Verify = true;
      await userDb.save();
      console.log("✅ User verified successfully:", userDb.email);
  
      // Redirige a la página de éxito
      res.redirect("/verify-success");
  
    } catch (error) {
      console.error("❌ Verification error:", error.message);
      
      if (error.name === 'TokenExpiredError') {
        console.log("❌ Token expired");
        return res.status(401).redirect("/verify-expired");
      } else if (error.name === 'JsonWebTokenError') {
        console.log("❌ Invalid token");
        return res.status(400).redirect("/verify-error");
      }
      
      res.status(500).redirect("/verify-error");
    }
}

async function verifyWithQuery(req, res) {
  try {
    console.log("🔍 Email verification with query parameter started");
    console.log("🌐 Request details:", {
      method: req.method,
      url: req.url,
      userAgent: req.get('User-Agent'),
      referer: req.get('Referer'),
      ip: req.ip
    });
    
    const { token } = req.query;
    
    if (!token) {
      console.log("❌ No token provided in query");
      return res.status(400).json({ 
        success: false, 
        message: "No token provided" 
      });
    }
    
    console.log("📧 Verifying token from query:", token);
    
    // Decodifica el JWT
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    console.log("✅ Token decoded:", decoded);
    
    // Verifica si el JWT tiene el campo "userMail"
    if (!decoded.userMail) {
      console.log("❌ Token does not contain userMail");
      return res.status(400).json({ 
        success: false, 
        message: "Invalid token" 
      });
    }
    
    // Busca el usuario en la base de datos
    const userDb = await Usuario.findOne({ email: decoded.userMail });
    if (!userDb) {
      console.log("❌ User not found:", decoded.userMail);
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Procesa el código de afiliado si existe
    let affiliateMessageType = 'default';
    if (userDb.affiliateCode && userDb.usedAffiliateCode) {
      let affiliateCodeDoc = await LumenAffiliateCode.findById(userDb.usedAffiliateCode);

      // Si no está en Lumen, buscar en AffiliateCodes
      if (!affiliateCodeDoc) {
        affiliateCodeDoc = await AffiliateCode.findById(userDb.usedAffiliateCode);
      }

      if (affiliateCodeDoc) {
        affiliateMessageType = affiliateCodeDoc.messageType || 'default';
      }

      if (affiliateCodeDoc && !affiliateCodeDoc.isUsed) {
        affiliateCodeDoc.isUsed = true;
        affiliateCodeDoc.usedAt = new Date();
        affiliateCodeDoc.usedBy = userDb._id;
        affiliateCodeDoc.usedEmail = userDb.email;
        affiliateCodeDoc.usageDetails = {
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          country: userDb.country
        };

        await affiliateCodeDoc.save();
        console.log("✅ Affiliate code marked as used:", userDb.affiliateCode);

        // Verificar si es la primera vez que se usa el código de afiliado
        const wasAffiliateCodeAlreadyUsed = userDb.affiliateCodeUsedAt !== null;

        // Actualizar Google Sheet solo si es la primera vez que se usa el código
        if (!wasAffiliateCodeAlreadyUsed) {
          console.log('🔄 First time using affiliate code - updating Google Sheet');
          console.log('📊 Verification details:', {
            wasAffiliateCodeAlreadyUsed,
            currentVerifyStatus: userDb.Verify,
            affiliateCodeUsedAt: userDb.affiliateCodeUsedAt
          });

          try {
            console.log('📊 Google Sheets integration temporarily disabled');
            console.log('📊 Affiliate code data:', {
              affiliateCode: userDb.affiliateCode,
              email: userDb.email,
              bonusOMs: userDb.bonusOMsReceived
            });
          } catch (error) {
            console.error('❌ Error logging affiliate data:', error);
          }
        } else {
          console.log('⚠️ Affiliate code already used - skipping Google Sheet update');
        }

        // Actualiza el saldo del usuario
        userDb.Estado_Financiero.saldoInicial = userDb.bonusOMsReceived;
        userDb.affiliateCodeUsedAt = new Date();
        console.log("✅ User balance updated with affiliate bonus:", userDb.bonusOMsReceived);
      }
    }

    // Actualiza y guarda el estado de verificación del usuario
    console.log("📝 Current verification status:", userDb.Verify);
    userDb.Verify = true;
    await userDb.save();
    console.log("✅ User verified successfully:", userDb.email);

    // Generar JWT token para auto-login después de verificación
    const jwtToken = jsonwebtoken.sign(
      { userMail: userDb.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Setear cookie JWT para auto-login
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      path: "/"
    });
    console.log("✅ JWT cookie set for auto-login");

    // Retorna éxito con user object completo
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      messageType: affiliateMessageType,
      user: {
        fullName: userDb.fullName,
        email: userDb.email,
        isFirstLogin: userDb.isFirstLogin !== false,
        welcomeModalShown: userDb.welcomeModalShown || false,
        onboardingStep: userDb.onboardingStep || "pending",
        affiliateCodeUsedAt: userDb.affiliateCodeUsedAt || null,
        affiliateCode: userDb.affiliateCode || null,
        bonusOMsReceived: userDb.bonusOMsReceived || 0,
        saldoInicial: userDb.Estado_Financiero?.saldoInicial || 0
      }
    });

  } catch (error) {
    console.error("❌ Verification error:", error.message);

    if (error.name === 'TokenExpiredError') {
      console.log("❌ Token expired");
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    } else if (error.name === 'JsonWebTokenError') {
      console.log("❌ Invalid token");
      return res.status(400).json({
        success: false,
        message: "Invalid token"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

async function verifyEmailPost(req, res) {
  try {
    console.log("🔍 Email verification process started (POST)");
    console.log("🌐 POST Request details:", {
      method: req.method,
      url: req.url,
      userAgent: req.get('User-Agent'),
      referer: req.get('Referer'),
      ip: req.ip
    });
    
    const { token } = req.body;
    
    if (!token) {
      console.log("❌ No token provided in body");
      return res.status(400).json({ 
        success: false, 
        message: "No token provided" 
      });
    }
    
    console.log("📧 Verifying token from POST body:", token);
    
    // Decodifica el JWT
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    console.log("✅ Token decoded:", decoded);
    
    // Verifica si el JWT tiene el campo "userMail"
    if (!decoded.userMail) {
      console.log("❌ Token does not contain userMail");
      return res.status(400).json({ 
        success: false, 
        message: "Invalid token" 
      });
    }
    
    // Busca el usuario en la base de datos
    const userDb = await Usuario.findOne({ email: decoded.userMail });
    if (!userDb) {
      console.log("❌ User not found:", decoded.userMail);
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    
    // Procesa el código de afiliado si existe
    let affiliateMessageType = 'default';
    if (userDb.affiliateCode && userDb.usedAffiliateCode) {
      let affiliateCodeDoc = await LumenAffiliateCode.findById(userDb.usedAffiliateCode);

      // Si no está en Lumen, buscar en AffiliateCodes
      if (!affiliateCodeDoc) {
        affiliateCodeDoc = await AffiliateCode.findById(userDb.usedAffiliateCode);
      }

      if (affiliateCodeDoc) {
        affiliateMessageType = affiliateCodeDoc.messageType || 'default';
      }

      if (affiliateCodeDoc && !affiliateCodeDoc.isUsed) {
        affiliateCodeDoc.isUsed = true;
        affiliateCodeDoc.usedAt = new Date();
        affiliateCodeDoc.usedBy = userDb._id;
        affiliateCodeDoc.usedEmail = userDb.email;
        affiliateCodeDoc.usageDetails = {
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          country: userDb.country
        };

        await affiliateCodeDoc.save();
        console.log("✅ Affiliate code marked as used:", userDb.affiliateCode);

        // Actualiza el saldo del usuario
        userDb.Estado_Financiero.saldoInicial = userDb.bonusOMsReceived;
        userDb.affiliateCodeUsedAt = new Date();
        console.log("✅ User balance updated with affiliate bonus:", userDb.bonusOMsReceived);

        // Google Sheet update moved to verifyWithQuery only
      }
    }

    // Actualiza y guarda el estado de verificación del usuario
    console.log("📝 Current verification status:", userDb.Verify);
    userDb.Verify = true;
    await userDb.save();
    console.log("✅ User verified successfully:", userDb.email);

    // Retorna éxito para que el frontend maneje la redirección
    const responseData = {
      success: true,
      email: userDb.email,
      fullName: userDb.fullName,
      messageType: affiliateMessageType
    };

    // Incluir código de afiliado si se usó uno
    if (userDb.affiliateCode) {
      responseData.affiliateCode = userDb.affiliateCode;
    }

    return res.status(200).json(responseData);
    
  } catch (error) {
    console.error("❌ Verification error:", error.message);
    
    if (error.name === 'TokenExpiredError') {
      console.log("❌ Token expired");
      return res.status(401).json({ 
        success: false, 
        message: "Token expired" 
      });
    } else if (error.name === 'JsonWebTokenError') {
      console.log("❌ Invalid token");
      return res.status(400).json({ 
        success: false, 
        message: "Invalid token" 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
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


const checkSession = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    
    if (!token) {
      console.log("❌ No JWT token found in cookies");
      return res.json({ loggedIn: false });
    }

    if (invalidatedTokens.has(token)) {
      console.log("❌ Token is in blacklist (logged out)");
      return res.json({ loggedIn: false });
    }
    
    try {
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
      console.log("✅ JWT token verified:", decoded.userMail);
      
      const usuario = await Usuario.findOne({ email: decoded.userMail });
      
      if (!usuario) {
        console.log("❌ User not found in database");
        return res.json({ loggedIn: false });
      }
      
      if (!usuario.Verify) {
        console.log("❌ User email not verified");
        return res.json({ loggedIn: false });
      }
      
      console.log("✅ Session valid for user:", usuario.email);
      console.log("🔑 Wallet address from DB:", usuario.wallet_address);

      const hasActive2FA = usuario.twoFactorCode &&
                          usuario.twoFactorCodeExpires &&
                          new Date() < new Date(usuario.twoFactorCodeExpires);

      // Obtener messageType del código de afiliación si existe
      let affiliateMessageType = 'default';
      if (usuario.usedAffiliateCode) {
        let affiliateCodeDoc = await LumenAffiliateCode.findById(usuario.usedAffiliateCode);
        if (!affiliateCodeDoc) {
          affiliateCodeDoc = await AffiliateCode.findById(usuario.usedAffiliateCode);
        }
        if (affiliateCodeDoc) {
          affiliateMessageType = affiliateCodeDoc.messageType || 'default';
        }
      }

      return res.json({
        loggedIn: true,
        username: decoded.userMail.split('@')[0],
        email: decoded.userMail,
        fullName: usuario.fullName,
        country: usuario.country,
        companyName: usuario.companyName,
        affiliateCode: usuario.affiliateCode,
        bonusOMsReceived: usuario.bonusOMsReceived,
        affiliateCodeUsedAt: usuario.affiliateCodeUsedAt,
        messageType: affiliateMessageType,
        saldoInicial: usuario.Estado_Financiero?.saldoInicial || 0,
        isNewUser: !usuario.welcomeModalShown,
        welcomeModalShown: usuario.welcomeModalShown || false,
        onboardingStep: usuario.onboardingStep || 'pending',
        profileCompleted: usuario.profileCompleted || false,
        loginCount: usuario.loginCount || 0,
        lastLoginAt: usuario.lastLoginAt,
        Movimientos: usuario.Movimientos || [],
        walletAddress: usuario.wallet_address || null,
        twoFactorEnabled: !usuario.isFirstLogin,
        twoFactorActive: hasActive2FA,
        isFirstLogin: usuario.isFirstLogin || false,
        carbonCredits: usuario.carbonCredits || 0,
        omBalance: usuario.omBalance || 0
      });
      
    } catch (jwtError) {
      console.log("❌ JWT verification failed:", jwtError.message);
      return res.json({ loggedIn: false });
    }
    
  } catch (error) {
    console.error("❌ Session check error:", error.message);
    return res.json({ loggedIn: false });
  }
};

const dashboard = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.userEmail });

    if (!usuario) {
      return res.status(404).send({ status: "Error", message: "User not found" });
    }

    const userData = {
      fullName: usuario.fullName,
      email: usuario.email,
      country: usuario.country,
      companyName: usuario.companyName,
      saldoInicial: usuario.Estado_Financiero.saldoInicial,
      Movimientos: usuario.Movimientos
    };

    res.status(200).json({ status: "Success", data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", message: "Server error" });
  }
};

async function verifyAffiliateCode(req, res) {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(200).json({
        success: false,
        message: "Affiliate code is required"
      });
    }

    if (!/^\d{3}[a-zA-Z]{3}$/.test(code)) {
      return res.status(200).json({
        success: false,
        message: "Invalid affiliate code format"
      });
    }

    console.log("🔍 Verifying affiliate code in both tables:", code);
    
    let affiliateCode = await LumenAffiliateCode.findByCode(code);
    let affiliateCodeType = null;
    
    if (affiliateCode) {
      affiliateCodeType = "code_lumen";
      console.log("✅ Found in LumenAffiliateCodes table");
    } else {
      affiliateCode = await AffiliateCode.findOne({ code });
      if (affiliateCode) {
        affiliateCodeType = "code_standard";
        console.log("✅ Found in AffiliateCodes table");
      }
    }

    if (!affiliateCode) {
      return res.status(200).json({
        success: false,
        message: "Affiliate code not found"
      });
    }

    if (!affiliateCode.isActive) {
      return res.status(200).json({
        success: false,
        message: "Affiliate code is inactive"
      });
    }

    if (affiliateCode.isUsed) {
      return res.status(200).json({
        success: false,
        message: "Affiliate code has already been used"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Affiliate code is valid and available",
      data: {
        code: affiliateCode.code,
        bonusOMs: affiliateCode.bonusOMs,
        affiliateCodeType: affiliateCodeType,
        messageType: affiliateCode.messageType || 'default'
      }
    });

  } catch (error) {
    console.error("❌ Affiliate code verification error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

async function updateWelcomeModal(req, res) {
  try {
    const { email, welcomeModalShown } = req.body;
    
    if (!email) {
      return res.status(200).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    if (welcomeModalShown !== true) {
      return res.status(200).json({ 
        success: false, 
        message: "welcomeModalShown must be true" 
      });
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(200).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    usuario.welcomeModalShown = true;
    await usuario.save();

    console.log("✅ Welcome modal marked as shown for user:", usuario.email);

    return res.status(200).json({
      success: true,
      message: "Welcome modal marked as shown",
      user: {
        email: usuario.email,
        fullName: usuario.fullName,
        welcomeModalShown: usuario.welcomeModalShown,
        onboardingStep: usuario.onboardingStep
      }
    });

  } catch (error) {
    console.error("❌ Update welcome modal error:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

async function updateOnboardingStep(req, res) {
  try {
    const { email, onboardingStep, step } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    if (!onboardingStep) {
      return res.status(400).json({ 
        success: false, 
        message: "Onboarding step is required" 
      });
    }

    const validSteps = ['skipped', 'paso_1', 'paso_2', 'paso_3', 'paso_4'];
    if (!validSteps.includes(onboardingStep)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid onboarding step. Valid steps: skipped, paso_1, paso_2, paso_3, paso_4" 
      });
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    usuario.onboardingStep = onboardingStep;
    
    if (step !== undefined && step !== null) {
      usuario.onboardingCurrentStep = step;
    }
    
    await usuario.save();

    console.log("✅ Onboarding step updated for user:", usuario.email, "to:", onboardingStep, "current step:", step);

    return res.status(200).json({
      success: true,
      message: "Onboarding step updated successfully",
      user: {
        email: usuario.email,
        fullName: usuario.fullName,
        onboardingStep: usuario.onboardingStep,
        onboardingCurrentStep: usuario.onboardingCurrentStep
      }
    });

  } catch (error) {
    console.error("❌ Update onboarding step error:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

async function updateProfileStatus(req, res) {
  try {
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "No authentication token" 
      });
    }

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    const usuario = await Usuario.findOne({ email: decoded.userMail });

    if (!usuario) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    usuario.profileCompleted = true;
    usuario.onboardingStep = 'profile_completed';
    await usuario.save();

    console.log("✅ Profile marked as completed for user:", usuario.email);

    return res.status(200).json({
      success: true,
      message: "Profile marked as completed",
      user: {
        email: usuario.email,
        fullName: usuario.fullName,
        profileCompleted: usuario.profileCompleted,
        onboardingStep: usuario.onboardingStep
      }
    });

  } catch (error) {
    console.error("❌ Update profile status error:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

async function logout(req, res) {
  try {
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "No authentication token" 
      });
    }

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    const usuario = await Usuario.findOne({ email: decoded.userMail });

    if (!usuario) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    invalidatedTokens.add(token);

    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: '/',
      expires: new Date(0),
      maxAge: 0
    });

    console.log("✅ User logged out successfully:", usuario.email);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    console.error("❌ Logout error:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

async function getAllAffiliateCodes(req, res) {
  try {
    console.log("🔍 Fetching all affiliate codes...");
    
    const affiliateCodes = await LumenAffiliateCode.find({})
      .select('-__v')
      .sort({ createdAt: -1 });
    
    console.log(`✅ Found ${affiliateCodes.length} affiliate codes`);
    
    const responseData = {
      success: true,
      message: "Affiliate codes retrieved successfully",
      data: {
        total: affiliateCodes.length,
        codes: affiliateCodes
      }
    };
    
    return res.status(200).json(responseData);
    
  } catch (error) {
    console.error("❌ Error fetching affiliate codes:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

async function generate2FA(req, res) {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }
    
    const userDb = await Usuario.findOne({ email });
    
    if (!userDb) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    if (!userDb.Verify) {
      return res.status(401).json({
        success: false,
        message: "Email not verified"
      });
    }
    
    const twoFactorCode = generateSecure2FACode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    userDb.twoFactorCode = twoFactorCode;
    userDb.twoFactorCodeExpires = expiresAt;
    await userDb.save();
    
    console.log("✅ 2FA code generated for user:", email);
    
    let lang = "es";
    if (req.originalUrl?.startsWith("/en/") || req.url?.startsWith("/en/")) {
      lang = "en";
    }
    
    try {
      let mail;
      if (lang === "en") {
        mail = await sendTwoFactorEmailEN(userDb.email, twoFactorCode);
      } else {
        mail = await sendTwoFactorEmail(userDb.email, twoFactorCode);
      }
      
      if (!mail || mail.success === false) {
        console.log("⚠️ 2FA email sending failed");
        return res.status(500).json({
          success: false,
          message: "2FA code generated but email sending failed"
        });
      }
      
      console.log("✅ 2FA email sent successfully");
      
      return res.status(200).json({
        success: true,
        message: "2FA code sent to your email",
        expiresAt: expiresAt
      });
    } catch (emailError) {
      console.log("⚠️ 2FA email sending failed:", emailError.message);
      return res.status(500).json({
        success: false,
        message: "2FA code generated but email sending failed"
      });
    }
  } catch (error) {
    console.error("❌ Generate 2FA error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

async function verify2FA(req, res) {
  try {
    const { email, code } = req.body;
    
    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and code are required"
      });
    }
    
    const userDb = await Usuario.findOne({ email });
    
    if (!userDb) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    if (!userDb.twoFactorCode) {
      return res.status(400).json({
        success: false,
        message: "No 2FA code found. Please generate a new code."
      });
    }
    
    if (new Date() > new Date(userDb.twoFactorCodeExpires)) {
      return res.status(400).json({
        success: false,
        message: "2FA code has expired. Please generate a new code."
      });
    }
    
    if (userDb.twoFactorCode !== code) {
      return res.status(401).json({
        success: false,
        message: "Invalid 2FA code"
      });
    }
    
    userDb.twoFactorCode = null;
    userDb.twoFactorCodeExpires = null;
    userDb.lastLoginAt = new Date();
    userDb.loginCount = (userDb.loginCount || 0) + 1;
    await userDb.save();

    console.log("✅ 2FA code verified successfully for user:", email);

    // Obtener messageType del código de afiliación si existe
    let affiliateMessageType = 'default';
    if (userDb.usedAffiliateCode) {
      let affiliateCodeDoc = await LumenAffiliateCode.findById(userDb.usedAffiliateCode);
      if (!affiliateCodeDoc) {
        affiliateCodeDoc = await AffiliateCode.findById(userDb.usedAffiliateCode);
      }
      if (affiliateCodeDoc) {
        affiliateMessageType = affiliateCodeDoc.messageType || 'default';
      }
    }

    const jwtExpire = normalizeJWTExpire(process.env.JWT_EXPIRE);
    const token = jsonwebtoken.sign(
      { userMail: userDb.email, userName: userDb.fullName },
      process.env.JWT_SECRET_KEY,
      { expiresIn: jwtExpire }
    );
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/"
    };
    
    res.cookie("jwt", token, cookieOptions);
    res.cookie("username", userDb.fullName, cookieOptions);
    
    return res.status(200).json({
      success: true,
      status: "logged",
      message: "2FA verified successfully. Login completed.",
      messageType: affiliateMessageType,
      user: {
        email: userDb.email,
        name: userDb.fullName,
        fullName: userDb.fullName,
        country: userDb.country,
        companyName: userDb.companyName,
        affiliateCode: userDb.affiliateCode,
        bonusOMsReceived: userDb.bonusOMsReceived,
        affiliateCodeUsedAt: userDb.affiliateCodeUsedAt,
        saldoInicial: userDb.Estado_Financiero?.saldoInicial || 0,
        omBalance: userDb.omBalance || 0,
        carbonCredits: userDb.carbonCredits || 0,
        isFirstLogin: userDb.isFirstLogin || false,
        welcomeModalShown: userDb.welcomeModalShown || false,
        onboardingStep: userDb.onboardingStep || 'pending',
        profileCompleted: userDb.profileCompleted || false,
        loginCount: userDb.loginCount || 0,
        lastLoginAt: userDb.lastLoginAt,
        Movimientos: userDb.Movimientos || [],
        walletAddress: userDb.wallet_address || null
      }
    });
  } catch (error) {
    console.error("❌ Verify 2FA error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

async function status2FA(req, res) {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }
    
    const userDb = await Usuario.findOne({ email });
    
    if (!userDb) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    const hasActive2FA = userDb.twoFactorCode && 
                        userDb.twoFactorCodeExpires && 
                        new Date() < new Date(userDb.twoFactorCodeExpires);
    
    return res.status(200).json({
      success: true,
      twoFactorEnabled: !userDb.isFirstLogin,
      twoFactorActive: hasActive2FA,
      isFirstLogin: userDb.isFirstLogin || false,
      expiresAt: userDb.twoFactorCodeExpires || null
    });
  } catch (error) {
    console.error("❌ Status 2FA error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const methods = {
    register,
    login,
    verifyCount,
    verifyWithQuery,
    verifyEmailPost,
    allUsers,
    getAllAffiliateCodes,
    verifyToken,
    dashboard,
    checkSession,
    verifyAffiliateCode,
    updateWelcomeModal,
    updateOnboardingStep,
    updateProfileStatus,
    logout,
    generate2FA,
    verify2FA,
    status2FA,
    resetAffiliateCode,
  }

async function resetAffiliateCode(req, res) {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Affiliate code is required"
      });
    }

    console.log("🔄 Resetting affiliate code:", code);

    // Buscar el código
    const affiliateCode = await LumenAffiliateCode.findOne({ code: code.toLowerCase() });

    if (!affiliateCode) {
      return res.status(404).json({
        success: false,
        message: "Affiliate code not found"
      });
    }

    if (!affiliateCode.isUsed) {
      return res.status(400).json({
        success: false,
        message: "Affiliate code is already available",
        code: affiliateCode.code,
        bonusOMs: affiliateCode.bonusOMs
      });
    }

    // Guardar info del usuario que lo había usado (para logs)
    const previousUser = affiliateCode.usedEmail;
    const previousBonusOMs = affiliateCode.bonusOMs;

    // Resetear el código
    affiliateCode.isUsed = false;
    affiliateCode.usedBy = null;
    affiliateCode.usedAt = null;
    affiliateCode.usedEmail = null;
    affiliateCode.usageDetails = {
      ipAddress: null,
      userAgent: null,
      country: null
    };

    await affiliateCode.save();

    console.log("✅ Affiliate code reset successfully:", code);
    console.log("   Previous user:", previousUser);
    console.log("   BonusOMs preserved:", previousBonusOMs);

    return res.status(200).json({
      success: true,
      message: "Affiliate code reset successfully",
      code: affiliateCode.code,
      bonusOMs: affiliateCode.bonusOMs,
      previousUser: previousUser
    });

  } catch (error) {
    console.error("❌ Reset affiliate code error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}



