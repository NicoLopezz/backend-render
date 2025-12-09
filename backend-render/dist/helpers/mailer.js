"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.sendEmailVeirifcation = sendEmailVeirifcation;
exports.sendWelcomeEmailNuevoEstilo = sendWelcomeEmailNuevoEstilo;
exports.sendWelcomeEmailNuevoEstiloEN = sendWelcomeEmailNuevoEstiloEN;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _dotenv = require("dotenv");
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
(0, _dotenv.config)();
var transporter = _nodemailer["default"].createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  },
  connectionTimeout: 10000,
  // 10 segundos para conectar
  greetingTimeout: 5000,
  // 5 segundos para saludo
  socketTimeout: 10000,
  // 10 segundos para socket
  logger: true,
  debug: true
});
function sendEmailVeirifcation(_x, _x2) {
  return _sendEmailVeirifcation.apply(this, arguments);
}
function _sendEmailVeirifcation() {
  _sendEmailVeirifcation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(direccion, token) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return transporter.sendMail({
            from: "Oxygen Group <".concat(process.env.EMAIL, ">"),
            to: direccion,
            subject: "Bienvenido! OXYGEN",
            html: mailVerificator(token),
            text: mailVerificatorText(token)
          });
        case 3:
          return _context.abrupt("return", _context.sent);
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error('Email sending failed:', _context.t0.message);
          return _context.abrupt("return", {
            success: false,
            error: _context.t0.message
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _sendEmailVeirifcation.apply(this, arguments);
}
function sendWelcomeEmailNuevoEstilo(_x3, _x4) {
  return _sendWelcomeEmailNuevoEstilo.apply(this, arguments);
} // VERSIÓN EN INGLÉS
function _sendWelcomeEmailNuevoEstilo() {
  _sendWelcomeEmailNuevoEstilo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(direccion, token) {
    var result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return transporter.sendMail({
            from: "Oxygen Group <".concat(process.env.EMAIL, ">"),
            to: direccion,
            subject: "🎉 ¡Bienvenido(a) a Oxygen! - Verifica tu email",
            html: mailBienvenidaNuevoEstilo(direccion, token),
            text: mailBienvenidaNuevoEstiloText(direccion, token)
          });
        case 3:
          result = _context2.sent;
          if (!(!result || !result.messageId)) {
            _context2.next = 7;
            break;
          }
          console.error('Email sending failed: No messageId returned');
          return _context2.abrupt("return", {
            success: false,
            error: 'No messageId returned'
          });
        case 7:
          console.log('✅ Email sent successfully with messageId:', result.messageId);
          return _context2.abrupt("return", {
            success: true,
            messageId: result.messageId,
            accepted: result.accepted
          });
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error('❌ Email sending failed:', _context2.t0.message);
          return _context2.abrupt("return", {
            success: false,
            error: _context2.t0.message
          });
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return _sendWelcomeEmailNuevoEstilo.apply(this, arguments);
}
function sendWelcomeEmailNuevoEstiloEN(_x5, _x6) {
  return _sendWelcomeEmailNuevoEstiloEN.apply(this, arguments);
} // --- FUNCIONES HTML/PLAIN TEXT ---
function _sendWelcomeEmailNuevoEstiloEN() {
  _sendWelcomeEmailNuevoEstiloEN = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(direccion, token) {
    var result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return transporter.sendMail({
            from: "Oxygen Group <".concat(process.env.EMAIL, ">"),
            to: direccion,
            subject: "🎉 Welcome to Oxygen! - Verify your email",
            html: mailBienvenidaNuevoEstiloEN(direccion, token),
            text: mailBienvenidaNuevoEstiloTextEN(direccion, token)
          });
        case 3:
          result = _context3.sent;
          if (!(!result || !result.messageId)) {
            _context3.next = 7;
            break;
          }
          console.error('Email sending failed: No messageId returned');
          return _context3.abrupt("return", {
            success: false,
            error: 'No messageId returned'
          });
        case 7:
          console.log('✅ Email sent successfully with messageId:', result.messageId);
          return _context3.abrupt("return", {
            success: true,
            messageId: result.messageId,
            accepted: result.accepted
          });
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error('❌ Email sending failed:', _context3.t0.message);
          return _context3.abrupt("return", {
            success: false,
            error: _context3.t0.message
          });
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return _sendWelcomeEmailNuevoEstiloEN.apply(this, arguments);
}
function mailVerificator(token) {
  return "\n  <html>\n  <body style=\"font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;\">\n    <div style=\"max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;\">\n      <div style=\"background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:16px 0;\">\n        <strong>INVERSI\xD3N EN LA NATURALEZA, GANANCIA PARA EL FUTURO</strong>\n      </div>\n      <img src=\"https://i.postimg.cc/y8N92bzS/forest.jpg\" alt=\"Gran Chaco\" style=\"width:100%; display:block;\">\n      <div style=\"padding:30px;\">\n        <h1 style=\"color:#004d40; font-size:28px; margin:0 0 20px; text-align:center; line-height:1.3;\">Tu viaje hacia la <span style=\"color:#1ABC9C;\">sostenibilidad</span> comienza</h1>\n        <p style=\"font-size:16px;\">Bienvenido a nuestra comunidad de agentes de cambio. Juntos estamos protegiendo el Gran Chaco mientras creamos oportunidades econ\xF3micas sostenibles.</p>\n        <ul style=\"padding-left:18px;\">\n          <li><b>01:</b> Explora nuestros proyectos de conservaci\xF3n certificados</li>\n          <li><b>02:</b> Selecciona el \xE1rea que deseas proteger</li>\n          <li><b>03:</b> Recibe tokens $OM y genera impacto real</li>\n        </ul>\n        <hr style=\"border:0;border-top:1px solid #e2e8f0; margin:30px 0;\">\n        <h2 style=\"color:#004d40;font-size:20px;margin:30px 0 15px;\">Welcome to our global movement</h2>\n        <p style=\"font-size:16px;\">You've joined an innovative network that combines environmental conservation with blockchain transparency. Together we're setting new standards for ecological investments.</p>\n        <div style=\"text-align:center; margin:40px 0;\">\n          <a href=\"https://www.oxygentoken.org/roles\" style=\"background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;\">DESCUBRE TU IMPACTO / DISCOVER YOUR ROLE</a>\n        </div>\n        <p style=\"font-size:12px; text-align:center;\">Espa\xF1ol / English</p>\n        <p style=\"font-style:italic; margin-top:20px;\">Con gratitud,<br>El equipo Oxygen</p>\n      </div>\n      <div style=\"background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;\">\n        <div style=\"margin-bottom:10px;\">\n          <a href=\"#\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/3536/3536505.png\" alt=\"LinkedIn\" width=\"24\"></a>\n          <a href=\"#\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/5968/5968958.png\" alt=\"Twitter\" width=\"24\"></a>\n          <a href=\"#\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/2111/2111463.png\" alt=\"Instagram\" width=\"24\"></a>\n        </div>\n        Oxygen Token \xB7 Innovaci\xF3n al servicio del planeta<br>\n        \xA9 2023 Todos los derechos reservados<br>\n        <a href=\"#\" style=\"color:rgba(255,255,255,0.7);text-decoration:underline;font-size:12px;display:block;margin-top:15px;\">Cancelar suscripci\xF3n</a>\n      </div>\n    </div>\n  </body>\n  </html>\n  ";
}
function mailVerificatorText(token) {
  return "Tu viaje hacia la sostenibilidad comienza.\n\nBienvenido a nuestra comunidad de agentes de cambio. Juntos estamos protegiendo el Gran Chaco mientras creamos oportunidades econ\xF3micas sostenibles.\n\n01: Explora nuestros proyectos de conservaci\xF3n certificados\n02: Selecciona el \xE1rea que deseas proteger\n03: Recibe tokens $OM y genera impacto real\n\nDescubre tu impacto: https://www.oxygentoken.org/roles\n\nCon gratitud,\nEl equipo Oxygen\n\nOxygen Token \xB7 Innovaci\xF3n al servicio del planeta\nCancelar suscripci\xF3n\n";
}
function mailBienvenidaNuevoEstilo(email, token) {
  var isProduction = process.env.NODE_ENV === 'production';
  var baseUrl = isProduction ? 'https://www.oxygentoken.org' : 'http://localhost:3000';
  var verificationUrl = "".concat(baseUrl, "/es/verify-success?token=").concat(token);
  return "\n  <html>\n  <body style=\"font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;\">\n    <div style=\"max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;\">\n      <div style=\"background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;\">\n        <h1 style=\"margin:0; font-size:28px; font-weight:600;\">OXYGEN</h1>\n      </div>\n      \n      <div style=\"padding:40px 30px; text-align:center;\">\n        <h2 style=\"color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;\">\n          \xA1Bienvenid@!\n        </h2>\n        \n        <p style=\"font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;\">\n          Gracias por registrarte en nuestra plataforma. Para completar tu registro y acceder a todas las funcionalidades, necesitamos verificar tu direcci\xF3n de email.\n        </p>\n        \n\n        \n        <div style=\"margin:40px 0;\">\n          <a href=\"".concat(verificationUrl, "\" style=\"background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:18px 40px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;box-shadow:0 4px 15px rgba(26,188,156,0.3);\">\n            Verificar mi email\n          </a>\n        </div>\n        \n\n        \n        <hr style=\"border:0;border-top:1px solid #e2e8f0; margin:40px 0;\">\n        \n        <p style=\"font-size:14px; color:#666; margin-bottom:20px;\">\n          \xBFTienes preguntas? Cont\xE1ctanos en \n          <a href=\"mailto:support@oxygentoken.org\" style=\"color:#1ABC9C;\">support@oxygentoken.org</a>\n        </p>\n        \n        <p style=\"font-style:italic; color:#999; margin:0;\">\n          Con gratitud,<br>El equipo Oxygen\n        </p>\n      </div>\n      \n      <div style=\"background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;\">\n        <div style=\"margin-bottom:10px;\">\n          <a href=\"https://www.linkedin.com/company/oxygentoken/\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/3536/3536505.png\" alt=\"LinkedIn\" width=\"24\"></a>\n          <a href=\"https://x.com/OxygenToken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/5968/5968958.png\" alt=\"Twitter\" width=\"24\"></a>\n          <a href=\"https://instagram.com/oxygentoken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/2111/2111463.png\" alt=\"Instagram\" width=\"24\"></a>\n        </div>\n        Oxygen Token \xB7 Innovaci\xF3n al servicio del planeta<br>\n        \xA9 2023 Todos los derechos reservados\n      </div>\n    </div>\n  </body>\n  </html>\n  ");
}
function mailBienvenidaNuevoEstiloText(first_name) {
  return "\n\nBienvenido a la comunidad Oxygen \uD83C\uDF31\n\nGracias por unirte a nuestra lista de espera. Ahora sos parte de una red global decidida a conservar el Gran Chaco y a demostrar que invertir en la naturaleza puede ser rentable y transparente.\n\n\xBFC\xF3mo pod\xE9s participar?\n1. Descubr\xED nuestro proyecto de conservaci\xF3n: LA FLORENCIA.\n2. Eleg\xED cu\xE1ntos m\xB2 quer\xE9s proteger.\n3. Recib\xED tokens $OM y empez\xE1 a generar cr\xE9ditos de carbono.\n\nSi trabaj\xE1s en marketing, finanzas verdes, dise\xF1o o tech: el planeta te necesita. Hablemos.\n\nDescubr\xED tu rol: https://www.oxygentoken.org/proyectos\n\nCon gratitud,\nEl equipo Oxygen\n\nOxygen Token \xB7 Innovaci\xF3n al servicio del planeta\nCancelar suscripci\xF3n\n";
}
function mailBienvenidaNuevoEstiloEN(email, token) {
  var isProduction = process.env.NODE_ENV === 'production';
  var baseUrl = isProduction ? 'https://www.oxygentoken.org' : 'http://localhost:3000';
  var verificationUrl = "".concat(baseUrl, "/en/verify-success?token=").concat(token);
  return "\n  <html>\n  <body style=\"font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;\">\n    <div style=\"max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;\">\n      <div style=\"background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;\">\n        <h1 style=\"margin:0; font-size:28px; font-weight:600;\">OXYGEN</h1>\n      </div>\n      \n      <div style=\"padding:40px 30px; text-align:center;\">\n        <h2 style=\"color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;\">\n          Welcome!\n        </h2>\n        \n        <p style=\"font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;\">\n          Thank you for registering on our platform. To complete your registration and access all features, we need to verify your email address.\n        </p>\n        \n\n        \n        <div style=\"margin:40px 0;\">\n          <a href=\"".concat(verificationUrl, "\" style=\"background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:18px 40px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;box-shadow:0 4px 15px rgba(26,188,156,0.3);\">\n            Verify my email\n          </a>\n        </div>\n        \n\n        \n        <hr style=\"border:0;border-top:1px solid #e2e8f0; margin:40px 0;\">\n        \n        <p style=\"font-size:14px; color:#666; margin-bottom:20px;\">\n          Have questions? Contact us at \n          <a href=\"mailto:support@oxygentoken.org\" style=\"color:#1ABC9C;\">support@oxygentoken.org</a>\n        </p>\n        \n        <p style=\"font-style:italic; color:#999; margin:0;\">\n          With gratitude,<br>The Oxygen Team\n        </p>\n      </div>\n      \n      <div style=\"background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;\">\n        <div style=\"margin-bottom:10px;\">\n          <a href=\"https://www.linkedin.com/company/oxygentoken/\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/3536/3536505.png\" alt=\"LinkedIn\" width=\"24\"></a>\n          <a href=\"https://x.com/OxygenToken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/5968/5968958.png\" alt=\"Twitter\" width=\"24\"></a>\n          <a href=\"https://instagram.com/oxygentoken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/2111/2111463.png\" alt=\"Instagram\" width=\"24\"></a>\n        </div>\n        Oxygen Token \xB7 Innovation for the planet<br>\n        \xA9 2023 All rights reserved\n      </div>\n    </div>\n  </body>\n  </html>\n  ");
}
function mailBienvenidaNuevoEstiloTextEN(first_name) {
  return "\n\nWelcome to the Oxygen community \uD83C\uDF31\n\nThank you for joining our waitlist. Now you are part of a global network determined to conserve the Gran Chaco and show that investing in nature can be profitable and transparent.\n\nHow can you participate?\n1. Discover our conservation project: LA FLORENCIA.\n2. Choose how many m\xB2 you want to protect.\n3. Receive $OM tokens and start generating carbon credits.\n\nIf you work in marketing, green finance, design or tech: the planet needs you. Let's talk.\n\nDiscover your role: https://www.oxygentoken.org/en/proyectos\n\nWith gratitude,\nThe Oxygen Team\n\nOxygen Token \xB7 Innovation for the planet\nUnsubscribe\n";
}
var _default = exports["default"] = transporter;