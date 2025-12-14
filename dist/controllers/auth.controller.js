"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;
var _Users = _interopRequireDefault(require("../models/Users.js"));
var _LumenAffiliateCodes = _interopRequireDefault(require("../models/LumenAffiliateCodes.js"));
var _AffiliateCodes = _interopRequireDefault(require("../models/AffiliateCodes.js"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _mailerResend = require("../helpers/mailer-resend.js");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = require("dotenv");
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; var r = _regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor; function n(r) { var e = "function" == typeof r && r.constructor; return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name)); } var o = { "throw": 1, "return": 2, "break": 3, "continue": 3 }; function a(r) { var e, t; return function (n) { e || (e = { stop: function stop() { return t(n.a, 2); }, "catch": function _catch() { return n.v; }, abrupt: function abrupt(r, e) { return t(n.a, o[r], e); }, delegateYield: function delegateYield(r, o, a) { return e.resultName = o, t(n.d, _regeneratorValues(r), a); }, finish: function finish(r) { return t(n.f, r); } }, t = function t(r, _t, o) { n.p = e.prev, n.n = e.next; try { return r(_t, o); } finally { e.next = n.n; } }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n; try { return r.call(this, e); } finally { n.p = e.prev, n.n = e.next; } }; } return (_regeneratorRuntime = function _regeneratorRuntime() { return { wrap: function wrap(e, t, n, o) { return r.w(a(e), t, n, o && o.reverse()); }, isGeneratorFunction: n, mark: r.m, awrap: function awrap(r, e) { return new _OverloadYield(r, e); }, AsyncIterator: _regeneratorAsyncIterator, async: function async(r, e, t, o, u) { return (n(e) ? _regeneratorAsyncGen : _regeneratorAsync)(a(r), e, t, o, u); }, keys: _regeneratorKeys, values: _regeneratorValues }; })(); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regeneratorAsync(n, e, r, t, o) { var a = _regeneratorAsyncGen(n, e, r, t, o); return a.next().then(function (n) { return n.done ? n.value : a.next(); }); }
function _regeneratorAsyncGen(r, e, t, o, n) { return new _regeneratorAsyncIterator(_regenerator().w(r, e, t, o), n || Promise); }
function _regeneratorAsyncIterator(t, e) { function n(r, o, i, f) { try { var c = t[r](o), u = c.value; return u instanceof _OverloadYield ? e.resolve(u.v).then(function (t) { n("next", t, i, f); }, function (t) { n("throw", t, i, f); }) : e.resolve(u).then(function (t) { c.value = t, i(c); }, function (t) { return n("throw", t, i, f); }); } catch (t) { f(t); } } var r; this.next || (_regeneratorDefine2(_regeneratorAsyncIterator.prototype), _regeneratorDefine2(_regeneratorAsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () { return this; })), _regeneratorDefine2(this, "_invoke", function (t, o, i) { function f() { return new e(function (e, r) { n(t, i, e, r); }); } return r = r ? r.then(f, f) : f(); }, !0); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var invalidatedTokens = new Set();
(0, _dotenv.config)();
var generateSecure2FACode = function generateSecure2FACode() {
  var randomBytes = _crypto["default"].randomBytes(3);
  var randomNumber = randomBytes.readUIntBE(0, 3);
  var code = (100000 + randomNumber % 900000).toString().padStart(6, '0');
  return code;
};
var normalizeJWTExpire = function normalizeJWTExpire(value) {
  if (!value) return '2h';
  var str = String(value).trim();
  if (/^\d+$/.test(str)) {
    var num = parseInt(str, 10);
    if (num <= 24) {
      return "".concat(num, "h");
    } else {
      return "".concat(num, "d");
    }
  }
  if (/^\d+[hdms]$/i.test(str)) {
    return str;
  }
  return '2h';
};
function register(_x, _x2) {
  return _register.apply(this, arguments);
} // async function login (req ,res){
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
function _register() {
  _register = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$originalUrl, _req$url, _req$body, fullName, email, password, country, companyName, affiliateCode, emailUser, passHash, saldoInicial, usedAffiliateCode, bonusOMsReceived, affiliateCodeUsedAt, affiliateCodeDoc, affiliateCodeType, newUsuario, token, cookieOptions, lang, verificationToken, mail, responseData;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, fullName = _req$body.fullName, email = _req$body.email, password = _req$body.password, country = _req$body.country, companyName = _req$body.companyName, affiliateCode = _req$body.affiliateCode;
          if (!(!fullName || !email || !password || !country)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Full name, email, password, and country are required"
          }));
        case 4:
          _context3.next = 6;
          return _Users["default"].findOne({
            email: email
          });
        case 6:
          emailUser = _context3.sent;
          if (!emailUser) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Email already registered"
          }));
        case 9:
          _context3.next = 11;
          return _bcryptjs["default"].hash(password, 10);
        case 11:
          passHash = _context3.sent;
          saldoInicial = 0;
          usedAffiliateCode = null;
          bonusOMsReceived = 0;
          affiliateCodeUsedAt = null;
          affiliateCodeDoc = null;
          affiliateCodeType = null;
          if (!affiliateCode) {
            _context3.next = 45;
            break;
          }
          console.log("🔍 Searching affiliate code in both tables:", affiliateCode);
          _context3.next = 22;
          return _LumenAffiliateCodes["default"].findByCode(affiliateCode);
        case 22:
          affiliateCodeDoc = _context3.sent;
          if (!affiliateCodeDoc) {
            _context3.next = 28;
            break;
          }
          affiliateCodeType = "code_lumen";
          console.log("✅ Found in LumenAffiliateCodes table");
          _context3.next = 32;
          break;
        case 28:
          _context3.next = 30;
          return _AffiliateCodes["default"].findOne({
            code: affiliateCode
          });
        case 30:
          affiliateCodeDoc = _context3.sent;
          if (affiliateCodeDoc) {
            affiliateCodeType = "code_standard";
            console.log("✅ Found in AffiliateCodes table");
          }
        case 32:
          if (affiliateCodeDoc) {
            _context3.next = 34;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Affiliate code not found"
          }));
        case 34:
          if (affiliateCodeDoc.isActive) {
            _context3.next = 36;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Affiliate code is inactive"
          }));
        case 36:
          if (!affiliateCodeDoc.isUsed) {
            _context3.next = 38;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Affiliate code has already been used"
          }));
        case 38:
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
          console.log("\u2705 Affiliate code prepared for marking as used (".concat(affiliateCodeType, "):"), affiliateCode);
        case 45:
          newUsuario = new _Users["default"]({
            fullName: fullName,
            email: email,
            password: passHash,
            country: country,
            companyName: companyName,
            affiliateCode: affiliateCode,
            usedAffiliateCode: usedAffiliateCode,
            bonusOMsReceived: bonusOMsReceived,
            affiliateCodeUsedAt: affiliateCodeUsedAt,
            Estado_Financiero: {
              saldoInicial: saldoInicial
            },
            Verify: false,
            Movimientos: []
          });
          if (process.env.JWT_SECRET_KEY) {
            _context3.next = 49;
            break;
          }
          console.error('JWT_SECRET_KEY is not defined in environment variables');
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: "Server configuration error"
          }));
        case 49:
          token = _jsonwebtoken["default"].sign({
            userMail: newUsuario.email
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: normalizeJWTExpire(process.env.JWT_EXPIRE)
          });
          cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: (Number(process.env.JWT_COOKIE_EXPIRE) || 1) * 24 * 60 * 60 * 1000,
            path: "/"
          };
          res.cookie("jwt", token, cookieOptions);
          lang = "es";
          if ((_req$originalUrl = req.originalUrl) !== null && _req$originalUrl !== void 0 && _req$originalUrl.startsWith("/en/") || (_req$url = req.url) !== null && _req$url !== void 0 && _req$url.startsWith("/en/")) {
            lang = "en";
          }
          _context3.prev = 54;
          verificationToken = _jsonwebtoken["default"].sign({
            userMail: newUsuario.email
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h'
          });
          if (!(lang === "en")) {
            _context3.next = 62;
            break;
          }
          _context3.next = 59;
          return (0, _mailerResend.sendWelcomeEmailNuevoEstiloEN)(newUsuario.email, verificationToken);
        case 59:
          mail = _context3.sent;
          _context3.next = 65;
          break;
        case 62:
          _context3.next = 64;
          return (0, _mailerResend.sendWelcomeEmailNuevoEstilo)(newUsuario.email, verificationToken);
        case 64:
          mail = _context3.sent;
        case 65:
          if (!mail || mail.success === false || mail.accepted === 0) {
            console.log("⚠️ Email sending failed, but user will still be registered");
          } else {
            console.log("✅ Verification email sent successfully");
          }
          _context3.next = 74;
          break;
        case 68:
          _context3.prev = 68;
          _context3.t0 = _context3["catch"](54);
          console.log("⚠️ Email sending failed:", _context3.t0.message);
          console.log("⚠️ User will still be registered");
          console.log("💡 Check your .env file for EMAIL and EMAIL_PASSWORD configuration");
          console.log("💡 For Zoho, make sure SMTP is enabled in your account settings");
        case 74:
          _context3.next = 76;
          return newUsuario.save();
        case 76:
          if (!(affiliateCode && affiliateCodeDoc)) {
            _context3.next = 81;
            break;
          }
          affiliateCodeDoc.usedBy = newUsuario._id;
          _context3.next = 80;
          return affiliateCodeDoc.save();
        case 80:
          console.log("✅ Affiliate code marked as used with user ID:", affiliateCode);
        case 81:
          console.log("✅ User saved to database:", newUsuario.email);
          responseData = {
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
            responseData.message += " Affiliate code type: ".concat(affiliateCodeType);
          }
          return _context3.abrupt("return", res.status(201).json(responseData));
        case 87:
          _context3.prev = 87;
          _context3.t1 = _context3["catch"](0);
          console.error("Registration error:", _context3.t1);
          if (!(_context3.t1.name === 'ValidationError')) {
            _context3.next = 92;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: _context3.t1.message
          }));
        case 92:
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 93:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 87], [54, 68]]);
  }));
  return _register.apply(this, arguments);
}
function login(_x3, _x4) {
  return _login.apply(this, arguments);
}
function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body2, email, password, userDb, isMatch, isFirstLogin, jwtExpire, token, _userDb$Estado_Financ, cookieOptions, _req$originalUrl2, _req$url2, twoFactorCode, expiresAt, lang, mail;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          console.log("🔍 Login attempt for email:", email);
          console.log("🔍 Login attempt with password:", password ? "Provided" : "Missing");
          if (!(!email || !password)) {
            _context4.next = 7;
            break;
          }
          console.log("❌ Missing email or password");
          return _context4.abrupt("return", res.status(400).json({
            status: "Error",
            message: "Email and password are required"
          }));
        case 7:
          _context4.next = 9;
          return _Users["default"].findOne({
            email: email
          });
        case 9:
          userDb = _context4.sent;
          console.log("📧 User found:", userDb ? "Yes" : "No");
          if (userDb) {
            _context4.next = 14;
            break;
          }
          console.log("❌ Email not found in database");
          return _context4.abrupt("return", res.status(401).json({
            status: "Error",
            message: "Email not found in database"
          }));
        case 14:
          if (userDb.password) {
            _context4.next = 17;
            break;
          }
          console.log("❌ User has no password stored");
          return _context4.abrupt("return", res.status(401).json({
            status: "Error",
            message: "Invalid user account"
          }));
        case 17:
          console.log("🔐 Checking password...");
          _context4.next = 20;
          return _bcryptjs["default"].compare(password, userDb.password);
        case 20:
          isMatch = _context4.sent;
          console.log("🔐 Password match:", isMatch);
          if (isMatch) {
            _context4.next = 25;
            break;
          }
          console.log("❌ Password is incorrect");
          return _context4.abrupt("return", res.status(401).json({
            status: "Error",
            message: "Password is incorrect"
          }));
        case 25:
          console.log("✅ Password verified, checking email verification...");
          console.log("📧 Verification status:", userDb.Verify);
          if (userDb.Verify) {
            _context4.next = 30;
            break;
          }
          console.log("❌ Email not verified");
          return _context4.abrupt("return", res.status(401).json({
            status: "Error",
            message: "Please verify your email before logging in. Check your inbox for the verification link."
          }));
        case 30:
          console.log("✅ Email verified, checking first login status...");
          isFirstLogin = userDb.isFirstLogin === undefined || userDb.isFirstLogin === true;
          if (!isFirstLogin) {
            _context4.next = 59;
            break;
          }
          console.log("✅ First login detected, completing login without 2FA...");
          userDb.isFirstLogin = false;
          userDb.lastLoginAt = new Date();
          userDb.loginCount = (userDb.loginCount || 0) + 1;
          _context4.next = 39;
          return userDb.save();
        case 39:
          console.log("✅ Login stats updated, generating JWT...");
          jwtExpire = normalizeJWTExpire(process.env.JWT_EXPIRE);
          console.log("🔑 JWT_EXPIRE original:", process.env.JWT_EXPIRE);
          console.log("🔑 JWT_EXPIRE normalizado:", jwtExpire);
          token = _jsonwebtoken["default"].sign({
            userMail: userDb.email,
            userName: userDb.fullName
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: jwtExpire
          });
          console.log("✅ JWT token generated successfully");
          _context4.prev = 45;
          cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
          };
          res.cookie("jwt", token, cookieOptions);
          res.cookie("username", userDb.fullName, cookieOptions);
          console.log("✅ Session cookie stored successfully");
          return _context4.abrupt("return", res.status(201).json({
            status: "logged",
            message: "User ".concat(userDb.email, " has logged in successfully"),
            user: {
              email: userDb.email,
              name: userDb.fullName,
              fullName: userDb.fullName,
              country: userDb.country,
              companyName: userDb.companyName,
              affiliateCode: userDb.affiliateCode,
              bonusOMsReceived: userDb.bonusOMsReceived,
              affiliateCodeUsedAt: userDb.affiliateCodeUsedAt,
              saldoInicial: ((_userDb$Estado_Financ = userDb.Estado_Financiero) === null || _userDb$Estado_Financ === void 0 ? void 0 : _userDb$Estado_Financ.saldoInicial) || 0,
              isFirstLogin: false,
              welcomeModalShown: userDb.welcomeModalShown || false,
              onboardingStep: userDb.onboardingStep || 'pending',
              profileCompleted: userDb.profileCompleted || false,
              loginCount: userDb.loginCount || 0,
              lastLoginAt: userDb.lastLoginAt,
              Movimientos: userDb.Movimientos || [],
              walletAddress: userDb.wallet_address || null
            }
          }));
        case 53:
          _context4.prev = 53;
          _context4.t0 = _context4["catch"](45);
          console.error("❌ Cookie error:", _context4.t0.message);
          return _context4.abrupt("return", res.status(500).json({
            status: "Error",
            message: "Cookie setting error"
          }));
        case 57:
          _context4.next = 93;
          break;
        case 59:
          console.log("✅ Not first login, generating 2FA code...");
          twoFactorCode = generateSecure2FACode();
          expiresAt = new Date();
          expiresAt.setMinutes(expiresAt.getMinutes() + 10);
          userDb.twoFactorCode = twoFactorCode;
          userDb.twoFactorCodeExpires = expiresAt;
          _context4.next = 67;
          return userDb.save();
        case 67:
          console.log("✅ 2FA code generated and saved");
          lang = "es";
          if ((_req$originalUrl2 = req.originalUrl) !== null && _req$originalUrl2 !== void 0 && _req$originalUrl2.startsWith("/en/") || (_req$url2 = req.url) !== null && _req$url2 !== void 0 && _req$url2.startsWith("/en/")) {
            lang = "en";
          }
          _context4.prev = 70;
          if (!(lang === "en")) {
            _context4.next = 77;
            break;
          }
          _context4.next = 74;
          return (0, _mailerResend.sendTwoFactorEmailEN)(userDb.email, twoFactorCode);
        case 74:
          mail = _context4.sent;
          _context4.next = 80;
          break;
        case 77:
          _context4.next = 79;
          return (0, _mailerResend.sendTwoFactorEmail)(userDb.email, twoFactorCode);
        case 79:
          mail = _context4.sent;
        case 80:
          if (!(!mail || mail.success === false)) {
            _context4.next = 85;
            break;
          }
          console.log("⚠️ 2FA email sending failed, but code was generated");
          return _context4.abrupt("return", res.status(201).json({
            status: "2fa_required",
            message: "2FA code generated but email sending failed. Please try again.",
            requires2FA: true
          }));
        case 85:
          console.log("✅ 2FA email sent successfully");
        case 86:
          _context4.next = 92;
          break;
        case 88:
          _context4.prev = 88;
          _context4.t1 = _context4["catch"](70);
          console.log("⚠️ 2FA email sending failed:", _context4.t1.message);
          return _context4.abrupt("return", res.status(201).json({
            status: "2fa_required",
            message: "2FA code generated but email sending failed. Please try again.",
            requires2FA: true
          }));
        case 92:
          return _context4.abrupt("return", res.status(201).json({
            status: "2fa_required",
            message: "2FA code sent to your email. Please verify to complete login.",
            requires2FA: true,
            email: userDb.email
          }));
        case 93:
          _context4.next = 100;
          break;
        case 95:
          _context4.prev = 95;
          _context4.t2 = _context4["catch"](0);
          console.error("❌ Login error:", _context4.t2.message);
          console.error("❌ Error stack:", _context4.t2.stack);
          return _context4.abrupt("return", res.status(500).json({
            status: "Error",
            message: "Internal server error"
          }));
        case 100:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 95], [45, 53], [70, 88]]);
  }));
  return _login.apply(this, arguments);
}
function verifyCount(_x5, _x6) {
  return _verifyCount.apply(this, arguments);
}
function _verifyCount() {
  _verifyCount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var token, decoded, userDb, affiliateCodeDoc;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          console.log("🔍 Email verification process started");
          token = req.params.token;
          if (token) {
            _context5.next = 6;
            break;
          }
          console.log("❌ No token provided");
          return _context5.abrupt("return", res.status(400).redirect("/verify-error"));
        case 6:
          console.log("📧 Verifying token:", token);

          // Decodifica el JWT
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
          console.log("✅ Token decoded:", decoded);

          // Verifica si el JWT tiene el campo "userMail"
          if (decoded.userMail) {
            _context5.next = 12;
            break;
          }
          console.log("❌ Token does not contain userMail");
          return _context5.abrupt("return", res.status(400).redirect("/verify-error"));
        case 12:
          _context5.next = 14;
          return _Users["default"].findOne({
            email: decoded.userMail
          });
        case 14:
          userDb = _context5.sent;
          if (userDb) {
            _context5.next = 18;
            break;
          }
          console.log("❌ User not found:", decoded.userMail);
          return _context5.abrupt("return", res.status(404).redirect("/verify-error"));
        case 18:
          if (!(userDb.affiliateCode && userDb.usedAffiliateCode)) {
            _context5.next = 35;
            break;
          }
          _context5.next = 21;
          return _LumenAffiliateCodes["default"].findById(userDb.usedAffiliateCode);
        case 21:
          affiliateCodeDoc = _context5.sent;
          if (!(affiliateCodeDoc && !affiliateCodeDoc.isUsed)) {
            _context5.next = 35;
            break;
          }
          affiliateCodeDoc.isUsed = true;
          affiliateCodeDoc.usedAt = new Date();
          affiliateCodeDoc.usedBy = userDb._id;
          affiliateCodeDoc.usedEmail = userDb.email;
          affiliateCodeDoc.usageDetails = {
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            country: userDb.country
          };
          _context5.next = 30;
          return affiliateCodeDoc.save();
        case 30:
          console.log("✅ Affiliate code marked as used:", userDb.affiliateCode);

          // Actualiza el saldo del usuario
          userDb.Estado_Financiero.saldoInicial = userDb.bonusOMsReceived;
          userDb.affiliateCodeUsedAt = new Date();
          userDb.onboardingStep = 'affiliate_processed';
          console.log("✅ User balance updated with affiliate bonus:", userDb.bonusOMsReceived);

          // Google Sheet update moved to verifyWithQuery only
        case 35:
          // Actualiza y guarda el estado de verificación del usuario
          console.log("📝 Current verification status:", userDb.Verify);
          userDb.Verify = true;
          _context5.next = 39;
          return userDb.save();
        case 39:
          console.log("✅ User verified successfully:", userDb.email);

          // Redirige a la página de éxito
          res.redirect("/verify-success");
          _context5.next = 55;
          break;
        case 43:
          _context5.prev = 43;
          _context5.t0 = _context5["catch"](0);
          console.error("❌ Verification error:", _context5.t0.message);
          if (!(_context5.t0.name === 'TokenExpiredError')) {
            _context5.next = 51;
            break;
          }
          console.log("❌ Token expired");
          return _context5.abrupt("return", res.status(401).redirect("/verify-expired"));
        case 51:
          if (!(_context5.t0.name === 'JsonWebTokenError')) {
            _context5.next = 54;
            break;
          }
          console.log("❌ Invalid token");
          return _context5.abrupt("return", res.status(400).redirect("/verify-error"));
        case 54:
          res.status(500).redirect("/verify-error");
        case 55:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 43]]);
  }));
  return _verifyCount.apply(this, arguments);
}
function verifyWithQuery(_x7, _x8) {
  return _verifyWithQuery.apply(this, arguments);
}
function _verifyWithQuery() {
  _verifyWithQuery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var token, decoded, userDb, affiliateCodeDoc, wasAffiliateCodeAlreadyUsed, responseData;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          console.log("🔍 Email verification with query parameter started");
          console.log("🌐 Request details:", {
            method: req.method,
            url: req.url,
            userAgent: req.get('User-Agent'),
            referer: req.get('Referer'),
            ip: req.ip
          });
          token = req.query.token;
          if (token) {
            _context6.next = 7;
            break;
          }
          console.log("❌ No token provided in query");
          return _context6.abrupt("return", res.status(400).json({
            success: false,
            message: "No token provided"
          }));
        case 7:
          console.log("📧 Verifying token from query:", token);

          // Decodifica el JWT
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
          console.log("✅ Token decoded:", decoded);

          // Verifica si el JWT tiene el campo "userMail"
          if (decoded.userMail) {
            _context6.next = 13;
            break;
          }
          console.log("❌ Token does not contain userMail");
          return _context6.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid token"
          }));
        case 13:
          _context6.next = 15;
          return _Users["default"].findOne({
            email: decoded.userMail
          });
        case 15:
          userDb = _context6.sent;
          if (userDb) {
            _context6.next = 19;
            break;
          }
          console.log("❌ User not found:", decoded.userMail);
          return _context6.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 19:
          if (!(userDb.affiliateCode && userDb.usedAffiliateCode)) {
            _context6.next = 37;
            break;
          }
          _context6.next = 22;
          return _LumenAffiliateCodes["default"].findById(userDb.usedAffiliateCode);
        case 22:
          affiliateCodeDoc = _context6.sent;
          if (!(affiliateCodeDoc && !affiliateCodeDoc.isUsed)) {
            _context6.next = 37;
            break;
          }
          affiliateCodeDoc.isUsed = true;
          affiliateCodeDoc.usedAt = new Date();
          affiliateCodeDoc.usedBy = userDb._id;
          affiliateCodeDoc.usedEmail = userDb.email;
          affiliateCodeDoc.usageDetails = {
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            country: userDb.country
          };
          _context6.next = 31;
          return affiliateCodeDoc.save();
        case 31:
          console.log("✅ Affiliate code marked as used:", userDb.affiliateCode);

          // Verificar si es la primera vez que se usa el código de afiliado
          wasAffiliateCodeAlreadyUsed = userDb.affiliateCodeUsedAt !== null; // Actualizar Google Sheet solo si es la primera vez que se usa el código
          if (!wasAffiliateCodeAlreadyUsed) {
            console.log('🔄 First time using affiliate code - updating Google Sheet');
            console.log('📊 Verification details:', {
              wasAffiliateCodeAlreadyUsed: wasAffiliateCodeAlreadyUsed,
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
        case 37:
          // Actualiza y guarda el estado de verificación del usuario
          console.log("📝 Current verification status:", userDb.Verify);
          userDb.Verify = true;
          _context6.next = 41;
          return userDb.save();
        case 41:
          console.log("✅ User verified successfully:", userDb.email);

          // Retorna éxito para que el frontend maneje la redirección
          responseData = {
            success: true,
            email: userDb.email,
            fullName: userDb.fullName
          }; // Incluir código de afiliado si se usó uno
          if (userDb.affiliateCode) {
            responseData.affiliateCode = userDb.affiliateCode;
          }
          return _context6.abrupt("return", res.status(200).json(responseData));
        case 47:
          _context6.prev = 47;
          _context6.t0 = _context6["catch"](0);
          console.error("❌ Verification error:", _context6.t0.message);
          if (!(_context6.t0.name === 'TokenExpiredError')) {
            _context6.next = 55;
            break;
          }
          console.log("❌ Token expired");
          return _context6.abrupt("return", res.status(401).json({
            success: false,
            message: "Token expired"
          }));
        case 55:
          if (!(_context6.t0.name === 'JsonWebTokenError')) {
            _context6.next = 58;
            break;
          }
          console.log("❌ Invalid token");
          return _context6.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid token"
          }));
        case 58:
          return _context6.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 59:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 47]]);
  }));
  return _verifyWithQuery.apply(this, arguments);
}
function verifyEmailPost(_x9, _x10) {
  return _verifyEmailPost.apply(this, arguments);
}
function _verifyEmailPost() {
  _verifyEmailPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var token, decoded, userDb, affiliateCodeDoc, responseData;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          console.log("🔍 Email verification process started (POST)");
          console.log("🌐 POST Request details:", {
            method: req.method,
            url: req.url,
            userAgent: req.get('User-Agent'),
            referer: req.get('Referer'),
            ip: req.ip
          });
          token = req.body.token;
          if (token) {
            _context7.next = 7;
            break;
          }
          console.log("❌ No token provided in body");
          return _context7.abrupt("return", res.status(400).json({
            success: false,
            message: "No token provided"
          }));
        case 7:
          console.log("📧 Verifying token from POST body:", token);

          // Decodifica el JWT
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
          console.log("✅ Token decoded:", decoded);

          // Verifica si el JWT tiene el campo "userMail"
          if (decoded.userMail) {
            _context7.next = 13;
            break;
          }
          console.log("❌ Token does not contain userMail");
          return _context7.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid token"
          }));
        case 13:
          _context7.next = 15;
          return _Users["default"].findOne({
            email: decoded.userMail
          });
        case 15:
          userDb = _context7.sent;
          if (userDb) {
            _context7.next = 19;
            break;
          }
          console.log("❌ User not found:", decoded.userMail);
          return _context7.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 19:
          if (!(userDb.affiliateCode && userDb.usedAffiliateCode)) {
            _context7.next = 35;
            break;
          }
          _context7.next = 22;
          return _LumenAffiliateCodes["default"].findById(userDb.usedAffiliateCode);
        case 22:
          affiliateCodeDoc = _context7.sent;
          if (!(affiliateCodeDoc && !affiliateCodeDoc.isUsed)) {
            _context7.next = 35;
            break;
          }
          affiliateCodeDoc.isUsed = true;
          affiliateCodeDoc.usedAt = new Date();
          affiliateCodeDoc.usedBy = userDb._id;
          affiliateCodeDoc.usedEmail = userDb.email;
          affiliateCodeDoc.usageDetails = {
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            country: userDb.country
          };
          _context7.next = 31;
          return affiliateCodeDoc.save();
        case 31:
          console.log("✅ Affiliate code marked as used:", userDb.affiliateCode);

          // Actualiza el saldo del usuario
          userDb.Estado_Financiero.saldoInicial = userDb.bonusOMsReceived;
          userDb.affiliateCodeUsedAt = new Date();
          console.log("✅ User balance updated with affiliate bonus:", userDb.bonusOMsReceived);

          // Google Sheet update moved to verifyWithQuery only
        case 35:
          // Actualiza y guarda el estado de verificación del usuario
          console.log("📝 Current verification status:", userDb.Verify);
          userDb.Verify = true;
          _context7.next = 39;
          return userDb.save();
        case 39:
          console.log("✅ User verified successfully:", userDb.email);

          // Retorna éxito para que el frontend maneje la redirección
          responseData = {
            success: true,
            email: userDb.email,
            fullName: userDb.fullName
          }; // Incluir código de afiliado si se usó uno
          if (userDb.affiliateCode) {
            responseData.affiliateCode = userDb.affiliateCode;
          }
          return _context7.abrupt("return", res.status(200).json(responseData));
        case 45:
          _context7.prev = 45;
          _context7.t0 = _context7["catch"](0);
          console.error("❌ Verification error:", _context7.t0.message);
          if (!(_context7.t0.name === 'TokenExpiredError')) {
            _context7.next = 53;
            break;
          }
          console.log("❌ Token expired");
          return _context7.abrupt("return", res.status(401).json({
            success: false,
            message: "Token expired"
          }));
        case 53:
          if (!(_context7.t0.name === 'JsonWebTokenError')) {
            _context7.next = 56;
            break;
          }
          console.log("❌ Invalid token");
          return _context7.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid token"
          }));
        case 56:
          return _context7.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 57:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 45]]);
  }));
  return _verifyEmailPost.apply(this, arguments);
}
function allUsers(_x11, _x12) {
  return _allUsers.apply(this, arguments);
}
function _allUsers() {
  _allUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var usuarios;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _Users["default"].find({});
        case 3:
          usuarios = _context8.sent;
          res.json(usuarios);
          _context8.next = 10;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            error: _context8.t0.message
          });
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return _allUsers.apply(this, arguments);
}
var verifyToken = function verifyToken(req, res, next) {
  var token = req.cookies.jwt; // Obtener token de las cookies
  if (!token) {
    return res.status(403).json({
      status: "Error",
      message: "No se proporcionó un token"
    });
  }
  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
    req.userEmail = decoded.userMail; // Guardar el email decodificado del token
    next(); // Avanzar al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({
      status: "Error",
      message: "Token inválido"
    });
  }
};
var checkSession = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var token, _usuario$Estado_Finan, decoded, usuario, hasActive2FA;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.cookies.jwt;
          if (token) {
            _context.next = 5;
            break;
          }
          console.log("❌ No JWT token found in cookies");
          return _context.abrupt("return", res.json({
            loggedIn: false
          }));
        case 5:
          if (!invalidatedTokens.has(token)) {
            _context.next = 8;
            break;
          }
          console.log("❌ Token is in blacklist (logged out)");
          return _context.abrupt("return", res.json({
            loggedIn: false
          }));
        case 8:
          _context.prev = 8;
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
          console.log("✅ JWT token verified:", decoded.userMail);
          _context.next = 13;
          return _Users["default"].findOne({
            email: decoded.userMail
          });
        case 13:
          usuario = _context.sent;
          if (usuario) {
            _context.next = 17;
            break;
          }
          console.log("❌ User not found in database");
          return _context.abrupt("return", res.json({
            loggedIn: false
          }));
        case 17:
          if (usuario.Verify) {
            _context.next = 20;
            break;
          }
          console.log("❌ User email not verified");
          return _context.abrupt("return", res.json({
            loggedIn: false
          }));
        case 20:
          console.log("✅ Session valid for user:", usuario.email);
          console.log("🔑 Wallet address from DB:", usuario.wallet_address);
          hasActive2FA = usuario.twoFactorCode && usuario.twoFactorCodeExpires && new Date() < new Date(usuario.twoFactorCodeExpires);
          return _context.abrupt("return", res.json({
            loggedIn: true,
            username: decoded.userMail.split('@')[0],
            email: decoded.userMail,
            fullName: usuario.fullName,
            country: usuario.country,
            companyName: usuario.companyName,
            affiliateCode: usuario.affiliateCode,
            bonusOMsReceived: usuario.bonusOMsReceived,
            affiliateCodeUsedAt: usuario.affiliateCodeUsedAt,
            saldoInicial: ((_usuario$Estado_Finan = usuario.Estado_Financiero) === null || _usuario$Estado_Finan === void 0 ? void 0 : _usuario$Estado_Finan.saldoInicial) || 0,
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
            isFirstLogin: usuario.isFirstLogin || false
          }));
        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](8);
          console.log("❌ JWT verification failed:", _context.t0.message);
          return _context.abrupt("return", res.json({
            loggedIn: false
          }));
        case 30:
          _context.next = 36;
          break;
        case 32:
          _context.prev = 32;
          _context.t1 = _context["catch"](0);
          console.error("❌ Session check error:", _context.t1.message);
          return _context.abrupt("return", res.json({
            loggedIn: false
          }));
        case 36:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 32], [8, 26]]);
  }));
  return function checkSession(_x13, _x14) {
    return _ref.apply(this, arguments);
  };
}();
var dashboard = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var usuario, userData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Users["default"].findOne({
            email: req.userEmail
          });
        case 3:
          usuario = _context2.sent;
          if (usuario) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(404).send({
            status: "Error",
            message: "User not found"
          }));
        case 6:
          userData = {
            fullName: usuario.fullName,
            email: usuario.email,
            country: usuario.country,
            companyName: usuario.companyName,
            saldoInicial: usuario.Estado_Financiero.saldoInicial,
            Movimientos: usuario.Movimientos
          };
          res.status(200).json({
            status: "Success",
            data: userData
          });
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).send({
            status: "Error",
            message: "Server error"
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function dashboard(_x15, _x16) {
    return _ref2.apply(this, arguments);
  };
}();
function verifyAffiliateCode(_x17, _x18) {
  return _verifyAffiliateCode.apply(this, arguments);
}
function _verifyAffiliateCode() {
  _verifyAffiliateCode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var code, affiliateCode, affiliateCodeType;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          code = req.body.code;
          if (code) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", res.status(200).json({
            success: false,
            message: "Affiliate code is required"
          }));
        case 4:
          if (/^\d{3}[a-zA-Z]{3}$/.test(code)) {
            _context9.next = 6;
            break;
          }
          return _context9.abrupt("return", res.status(200).json({
            success: false,
            message: "Invalid affiliate code format"
          }));
        case 6:
          console.log("🔍 Verifying affiliate code in both tables:", code);
          _context9.next = 9;
          return _LumenAffiliateCodes["default"].findByCode(code);
        case 9:
          affiliateCode = _context9.sent;
          affiliateCodeType = null;
          if (!affiliateCode) {
            _context9.next = 16;
            break;
          }
          affiliateCodeType = "code_lumen";
          console.log("✅ Found in LumenAffiliateCodes table");
          _context9.next = 20;
          break;
        case 16:
          _context9.next = 18;
          return _AffiliateCodes["default"].findOne({
            code: code
          });
        case 18:
          affiliateCode = _context9.sent;
          if (affiliateCode) {
            affiliateCodeType = "code_standard";
            console.log("✅ Found in AffiliateCodes table");
          }
        case 20:
          if (affiliateCode) {
            _context9.next = 22;
            break;
          }
          return _context9.abrupt("return", res.status(200).json({
            success: false,
            message: "Affiliate code not found"
          }));
        case 22:
          if (affiliateCode.isActive) {
            _context9.next = 24;
            break;
          }
          return _context9.abrupt("return", res.status(200).json({
            success: false,
            message: "Affiliate code is inactive"
          }));
        case 24:
          if (!affiliateCode.isUsed) {
            _context9.next = 26;
            break;
          }
          return _context9.abrupt("return", res.status(200).json({
            success: false,
            message: "Affiliate code has already been used"
          }));
        case 26:
          return _context9.abrupt("return", res.status(200).json({
            success: true,
            message: "Affiliate code is valid and available",
            data: {
              code: affiliateCode.code,
              bonusOMs: affiliateCode.bonusOMs,
              affiliateCodeType: affiliateCodeType
            }
          }));
        case 29:
          _context9.prev = 29;
          _context9.t0 = _context9["catch"](0);
          console.error("❌ Affiliate code verification error:", _context9.t0.message);
          return _context9.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 33:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 29]]);
  }));
  return _verifyAffiliateCode.apply(this, arguments);
}
function updateWelcomeModal(_x19, _x20) {
  return _updateWelcomeModal.apply(this, arguments);
}
function _updateWelcomeModal() {
  _updateWelcomeModal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body3, email, welcomeModalShown, usuario;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$body3 = req.body, email = _req$body3.email, welcomeModalShown = _req$body3.welcomeModalShown;
          if (email) {
            _context10.next = 4;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            success: false,
            message: "Email is required"
          }));
        case 4:
          if (!(welcomeModalShown !== true)) {
            _context10.next = 6;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            success: false,
            message: "welcomeModalShown must be true"
          }));
        case 6:
          _context10.next = 8;
          return _Users["default"].findOne({
            email: email
          });
        case 8:
          usuario = _context10.sent;
          if (usuario) {
            _context10.next = 11;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            success: false,
            message: "User not found"
          }));
        case 11:
          usuario.welcomeModalShown = true;
          _context10.next = 14;
          return usuario.save();
        case 14:
          console.log("✅ Welcome modal marked as shown for user:", usuario.email);
          return _context10.abrupt("return", res.status(200).json({
            success: true,
            message: "Welcome modal marked as shown",
            user: {
              email: usuario.email,
              fullName: usuario.fullName,
              welcomeModalShown: usuario.welcomeModalShown,
              onboardingStep: usuario.onboardingStep
            }
          }));
        case 18:
          _context10.prev = 18;
          _context10.t0 = _context10["catch"](0);
          console.error("❌ Update welcome modal error:", _context10.t0.message);
          return _context10.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 22:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 18]]);
  }));
  return _updateWelcomeModal.apply(this, arguments);
}
function updateOnboardingStep(_x21, _x22) {
  return _updateOnboardingStep.apply(this, arguments);
}
function _updateOnboardingStep() {
  _updateOnboardingStep = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var _req$body4, email, onboardingStep, step, validSteps, usuario;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$body4 = req.body, email = _req$body4.email, onboardingStep = _req$body4.onboardingStep, step = _req$body4.step;
          if (email) {
            _context11.next = 4;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            success: false,
            message: "Email is required"
          }));
        case 4:
          if (onboardingStep) {
            _context11.next = 6;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            success: false,
            message: "Onboarding step is required"
          }));
        case 6:
          validSteps = ['skipped', 'paso_1', 'paso_2', 'paso_3', 'paso_4'];
          if (validSteps.includes(onboardingStep)) {
            _context11.next = 9;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid onboarding step. Valid steps: skipped, paso_1, paso_2, paso_3, paso_4"
          }));
        case 9:
          _context11.next = 11;
          return _Users["default"].findOne({
            email: email
          });
        case 11:
          usuario = _context11.sent;
          if (usuario) {
            _context11.next = 14;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 14:
          usuario.onboardingStep = onboardingStep;
          if (step !== undefined && step !== null) {
            usuario.onboardingCurrentStep = step;
          }
          _context11.next = 18;
          return usuario.save();
        case 18:
          console.log("✅ Onboarding step updated for user:", usuario.email, "to:", onboardingStep, "current step:", step);
          return _context11.abrupt("return", res.status(200).json({
            success: true,
            message: "Onboarding step updated successfully",
            user: {
              email: usuario.email,
              fullName: usuario.fullName,
              onboardingStep: usuario.onboardingStep,
              onboardingCurrentStep: usuario.onboardingCurrentStep
            }
          }));
        case 22:
          _context11.prev = 22;
          _context11.t0 = _context11["catch"](0);
          console.error("❌ Update onboarding step error:", _context11.t0.message);
          return _context11.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 26:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 22]]);
  }));
  return _updateOnboardingStep.apply(this, arguments);
}
function updateProfileStatus(_x23, _x24) {
  return _updateProfileStatus.apply(this, arguments);
}
function _updateProfileStatus() {
  _updateProfileStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var token, decoded, usuario;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          token = req.cookies.jwt;
          if (token) {
            _context12.next = 4;
            break;
          }
          return _context12.abrupt("return", res.status(401).json({
            success: false,
            message: "No authentication token"
          }));
        case 4:
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
          _context12.next = 7;
          return _Users["default"].findOne({
            email: decoded.userMail
          });
        case 7:
          usuario = _context12.sent;
          if (usuario) {
            _context12.next = 10;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 10:
          usuario.profileCompleted = true;
          usuario.onboardingStep = 'profile_completed';
          _context12.next = 14;
          return usuario.save();
        case 14:
          console.log("✅ Profile marked as completed for user:", usuario.email);
          return _context12.abrupt("return", res.status(200).json({
            success: true,
            message: "Profile marked as completed",
            user: {
              email: usuario.email,
              fullName: usuario.fullName,
              profileCompleted: usuario.profileCompleted,
              onboardingStep: usuario.onboardingStep
            }
          }));
        case 18:
          _context12.prev = 18;
          _context12.t0 = _context12["catch"](0);
          console.error("❌ Update profile status error:", _context12.t0.message);
          return _context12.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 22:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 18]]);
  }));
  return _updateProfileStatus.apply(this, arguments);
}
function logout(_x25, _x26) {
  return _logout.apply(this, arguments);
}
function _logout() {
  _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var token, decoded, usuario;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          token = req.cookies.jwt;
          if (token) {
            _context13.next = 4;
            break;
          }
          return _context13.abrupt("return", res.status(401).json({
            success: false,
            message: "No authentication token"
          }));
        case 4:
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
          _context13.next = 7;
          return _Users["default"].findOne({
            email: decoded.userMail
          });
        case 7:
          usuario = _context13.sent;
          if (usuario) {
            _context13.next = 10;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 10:
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
          return _context13.abrupt("return", res.status(200).json({
            success: true,
            message: "Logged out successfully"
          }));
        case 16:
          _context13.prev = 16;
          _context13.t0 = _context13["catch"](0);
          console.error("❌ Logout error:", _context13.t0.message);
          return _context13.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 20:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 16]]);
  }));
  return _logout.apply(this, arguments);
}
function getAllAffiliateCodes(_x27, _x28) {
  return _getAllAffiliateCodes.apply(this, arguments);
}
function _getAllAffiliateCodes() {
  _getAllAffiliateCodes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var affiliateCodes, responseData;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          console.log("🔍 Fetching all affiliate codes...");
          _context14.next = 4;
          return _LumenAffiliateCodes["default"].find({}).select('-__v').sort({
            createdAt: -1
          });
        case 4:
          affiliateCodes = _context14.sent;
          console.log("\u2705 Found ".concat(affiliateCodes.length, " affiliate codes"));
          responseData = {
            success: true,
            message: "Affiliate codes retrieved successfully",
            data: {
              total: affiliateCodes.length,
              codes: affiliateCodes
            }
          };
          return _context14.abrupt("return", res.status(200).json(responseData));
        case 10:
          _context14.prev = 10;
          _context14.t0 = _context14["catch"](0);
          console.error("❌ Error fetching affiliate codes:", _context14.t0.message);
          return _context14.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 14:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 10]]);
  }));
  return _getAllAffiliateCodes.apply(this, arguments);
}
function generate2FA(_x29, _x30) {
  return _generate2FA.apply(this, arguments);
}
function _generate2FA() {
  _generate2FA = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var _req$originalUrl3, _req$url3, email, userDb, twoFactorCode, expiresAt, lang, mail;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          email = req.body.email;
          if (email) {
            _context15.next = 4;
            break;
          }
          return _context15.abrupt("return", res.status(400).json({
            success: false,
            message: "Email is required"
          }));
        case 4:
          _context15.next = 6;
          return _Users["default"].findOne({
            email: email
          });
        case 6:
          userDb = _context15.sent;
          if (userDb) {
            _context15.next = 9;
            break;
          }
          return _context15.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 9:
          if (userDb.Verify) {
            _context15.next = 11;
            break;
          }
          return _context15.abrupt("return", res.status(401).json({
            success: false,
            message: "Email not verified"
          }));
        case 11:
          twoFactorCode = generateSecure2FACode();
          expiresAt = new Date();
          expiresAt.setMinutes(expiresAt.getMinutes() + 10);
          userDb.twoFactorCode = twoFactorCode;
          userDb.twoFactorCodeExpires = expiresAt;
          _context15.next = 18;
          return userDb.save();
        case 18:
          console.log("✅ 2FA code generated for user:", email);
          lang = "es";
          if ((_req$originalUrl3 = req.originalUrl) !== null && _req$originalUrl3 !== void 0 && _req$originalUrl3.startsWith("/en/") || (_req$url3 = req.url) !== null && _req$url3 !== void 0 && _req$url3.startsWith("/en/")) {
            lang = "en";
          }
          _context15.prev = 21;
          if (!(lang === "en")) {
            _context15.next = 28;
            break;
          }
          _context15.next = 25;
          return (0, _mailerResend.sendTwoFactorEmailEN)(userDb.email, twoFactorCode);
        case 25:
          mail = _context15.sent;
          _context15.next = 31;
          break;
        case 28:
          _context15.next = 30;
          return (0, _mailerResend.sendTwoFactorEmail)(userDb.email, twoFactorCode);
        case 30:
          mail = _context15.sent;
        case 31:
          if (!(!mail || mail.success === false)) {
            _context15.next = 34;
            break;
          }
          console.log("⚠️ 2FA email sending failed");
          return _context15.abrupt("return", res.status(500).json({
            success: false,
            message: "2FA code generated but email sending failed"
          }));
        case 34:
          console.log("✅ 2FA email sent successfully");
          return _context15.abrupt("return", res.status(200).json({
            success: true,
            message: "2FA code sent to your email",
            expiresAt: expiresAt
          }));
        case 38:
          _context15.prev = 38;
          _context15.t0 = _context15["catch"](21);
          console.log("⚠️ 2FA email sending failed:", _context15.t0.message);
          return _context15.abrupt("return", res.status(500).json({
            success: false,
            message: "2FA code generated but email sending failed"
          }));
        case 42:
          _context15.next = 48;
          break;
        case 44:
          _context15.prev = 44;
          _context15.t1 = _context15["catch"](0);
          console.error("❌ Generate 2FA error:", _context15.t1.message);
          return _context15.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 48:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 44], [21, 38]]);
  }));
  return _generate2FA.apply(this, arguments);
}
function verify2FA(_x31, _x32) {
  return _verify2FA.apply(this, arguments);
}
function _verify2FA() {
  _verify2FA = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var _userDb$Estado_Financ2, _req$body5, email, code, userDb, jwtExpire, token, cookieOptions;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _req$body5 = req.body, email = _req$body5.email, code = _req$body5.code;
          if (!(!email || !code)) {
            _context16.next = 4;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            success: false,
            message: "Email and code are required"
          }));
        case 4:
          _context16.next = 6;
          return _Users["default"].findOne({
            email: email
          });
        case 6:
          userDb = _context16.sent;
          if (userDb) {
            _context16.next = 9;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 9:
          if (userDb.twoFactorCode) {
            _context16.next = 11;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            success: false,
            message: "No 2FA code found. Please generate a new code."
          }));
        case 11:
          if (!(new Date() > new Date(userDb.twoFactorCodeExpires))) {
            _context16.next = 13;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            success: false,
            message: "2FA code has expired. Please generate a new code."
          }));
        case 13:
          if (!(userDb.twoFactorCode !== code)) {
            _context16.next = 15;
            break;
          }
          return _context16.abrupt("return", res.status(401).json({
            success: false,
            message: "Invalid 2FA code"
          }));
        case 15:
          userDb.twoFactorCode = null;
          userDb.twoFactorCodeExpires = null;
          userDb.lastLoginAt = new Date();
          userDb.loginCount = (userDb.loginCount || 0) + 1;
          _context16.next = 21;
          return userDb.save();
        case 21:
          console.log("✅ 2FA code verified successfully for user:", email);
          jwtExpire = normalizeJWTExpire(process.env.JWT_EXPIRE);
          token = _jsonwebtoken["default"].sign({
            userMail: userDb.email,
            userName: userDb.fullName
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: jwtExpire
          });
          cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
          };
          res.cookie("jwt", token, cookieOptions);
          res.cookie("username", userDb.fullName, cookieOptions);
          return _context16.abrupt("return", res.status(200).json({
            success: true,
            status: "logged",
            message: "2FA verified successfully. Login completed.",
            user: {
              email: userDb.email,
              name: userDb.fullName,
              fullName: userDb.fullName,
              country: userDb.country,
              companyName: userDb.companyName,
              affiliateCode: userDb.affiliateCode,
              bonusOMsReceived: userDb.bonusOMsReceived,
              affiliateCodeUsedAt: userDb.affiliateCodeUsedAt,
              saldoInicial: ((_userDb$Estado_Financ2 = userDb.Estado_Financiero) === null || _userDb$Estado_Financ2 === void 0 ? void 0 : _userDb$Estado_Financ2.saldoInicial) || 0,
              isFirstLogin: userDb.isFirstLogin || false,
              welcomeModalShown: userDb.welcomeModalShown || false,
              onboardingStep: userDb.onboardingStep || 'pending',
              profileCompleted: userDb.profileCompleted || false,
              loginCount: userDb.loginCount || 0,
              lastLoginAt: userDb.lastLoginAt,
              Movimientos: userDb.Movimientos || [],
              walletAddress: userDb.wallet_address || null
            }
          }));
        case 30:
          _context16.prev = 30;
          _context16.t0 = _context16["catch"](0);
          console.error("❌ Verify 2FA error:", _context16.t0.message);
          return _context16.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 34:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 30]]);
  }));
  return _verify2FA.apply(this, arguments);
}
function status2FA(_x33, _x34) {
  return _status2FA.apply(this, arguments);
}
function _status2FA() {
  _status2FA = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var email, userDb, hasActive2FA;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          email = req.body.email;
          if (email) {
            _context17.next = 4;
            break;
          }
          return _context17.abrupt("return", res.status(400).json({
            success: false,
            message: "Email is required"
          }));
        case 4:
          _context17.next = 6;
          return _Users["default"].findOne({
            email: email
          });
        case 6:
          userDb = _context17.sent;
          if (userDb) {
            _context17.next = 9;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 9:
          hasActive2FA = userDb.twoFactorCode && userDb.twoFactorCodeExpires && new Date() < new Date(userDb.twoFactorCodeExpires);
          return _context17.abrupt("return", res.status(200).json({
            success: true,
            twoFactorEnabled: !userDb.isFirstLogin,
            twoFactorActive: hasActive2FA,
            isFirstLogin: userDb.isFirstLogin || false,
            expiresAt: userDb.twoFactorCodeExpires || null
          }));
        case 13:
          _context17.prev = 13;
          _context17.t0 = _context17["catch"](0);
          console.error("❌ Status 2FA error:", _context17.t0.message);
          return _context17.abrupt("return", res.status(500).json({
            success: false,
            message: "Internal server error"
          }));
        case 17:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 13]]);
  }));
  return _status2FA.apply(this, arguments);
}
var methods = exports.methods = {
  register: register,
  login: login,
  verifyCount: verifyCount,
  verifyWithQuery: verifyWithQuery,
  verifyEmailPost: verifyEmailPost,
  allUsers: allUsers,
  getAllAffiliateCodes: getAllAffiliateCodes,
  verifyToken: verifyToken,
  dashboard: dashboard,
  checkSession: checkSession,
  verifyAffiliateCode: verifyAffiliateCode,
  updateWelcomeModal: updateWelcomeModal,
  updateOnboardingStep: updateOnboardingStep,
  updateProfileStatus: updateProfileStatus,
  logout: logout,
  generate2FA: generate2FA,
  verify2FA: verify2FA,
  status2FA: status2FA
};