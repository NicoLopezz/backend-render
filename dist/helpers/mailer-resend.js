"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.sendTwoFactorEmail = sendTwoFactorEmail;
exports.sendTwoFactorEmailEN = sendTwoFactorEmailEN;
exports.sendWelcomeEmailNuevoEstilo = sendWelcomeEmailNuevoEstilo;
exports.sendWelcomeEmailNuevoEstiloEN = sendWelcomeEmailNuevoEstiloEN;
var _resend = require("resend");
var _dotenv = require("dotenv");
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
var resend = new _resend.Resend(process.env.RESEND_API_KEY);
function sendWelcomeEmailNuevoEstilo(_x, _x2) {
  return _sendWelcomeEmailNuevoEstilo.apply(this, arguments);
}
function _sendWelcomeEmailNuevoEstilo() {
  _sendWelcomeEmailNuevoEstilo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(direccion, token) {
    var isProduction, baseUrl, verificationUrl, _yield$resend$emails$, data, error;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          isProduction = process.env.NODE_ENV === 'production';
          baseUrl = isProduction ? 'https://www.oxygentoken.org' : 'http://localhost:3000';
          verificationUrl = "".concat(baseUrl, "/es/verify-success?token=").concat(token);
          _context.next = 6;
          return resend.emails.send({
            from: 'Oxygen Group <noreply@oxygentoken.org>',
            to: [direccion],
            subject: '🎉 ¡Bienvenido(a) a Oxygen! - Verifica tu email',
            html: mailBienvenidaNuevoEstilo(direccion, token, verificationUrl)
          });
        case 6:
          _yield$resend$emails$ = _context.sent;
          data = _yield$resend$emails$.data;
          error = _yield$resend$emails$.error;
          if (!error) {
            _context.next = 12;
            break;
          }
          console.error('❌ Resend error:', error);
          return _context.abrupt("return", {
            success: false,
            error: error.message
          });
        case 12:
          console.log('✅ Email sent successfully with Resend:', data.id);
          return _context.abrupt("return", {
            success: true,
            messageId: data.id
          });
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error('❌ Email sending failed:', _context.t0.message);
          return _context.abrupt("return", {
            success: false,
            error: _context.t0.message
          });
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 16]]);
  }));
  return _sendWelcomeEmailNuevoEstilo.apply(this, arguments);
}
function sendWelcomeEmailNuevoEstiloEN(_x3, _x4) {
  return _sendWelcomeEmailNuevoEstiloEN.apply(this, arguments);
}
function _sendWelcomeEmailNuevoEstiloEN() {
  _sendWelcomeEmailNuevoEstiloEN = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(direccion, token) {
    var isProduction, baseUrl, verificationUrl, _yield$resend$emails$2, data, error;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          isProduction = process.env.NODE_ENV === 'production';
          baseUrl = isProduction ? 'https://www.oxygentoken.org' : 'http://localhost:3000';
          verificationUrl = "".concat(baseUrl, "/en/verify-success?token=").concat(token);
          _context2.next = 6;
          return resend.emails.send({
            from: 'Oxygen Group <noreply@oxygentoken.org>',
            to: [direccion],
            subject: '🎉 Welcome to Oxygen! - Verify your email',
            html: mailBienvenidaNuevoEstiloEN(direccion, token, verificationUrl)
          });
        case 6:
          _yield$resend$emails$2 = _context2.sent;
          data = _yield$resend$emails$2.data;
          error = _yield$resend$emails$2.error;
          if (!error) {
            _context2.next = 12;
            break;
          }
          console.error('❌ Resend error:', error);
          return _context2.abrupt("return", {
            success: false,
            error: error.message
          });
        case 12:
          console.log('✅ Email sent successfully with Resend:', data.id);
          return _context2.abrupt("return", {
            success: true,
            messageId: data.id
          });
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error('❌ Email sending failed:', _context2.t0.message);
          return _context2.abrupt("return", {
            success: false,
            error: _context2.t0.message
          });
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return _sendWelcomeEmailNuevoEstiloEN.apply(this, arguments);
}
function mailBienvenidaNuevoEstilo(email, token, verificationUrl) {
  return "\n  <html>\n  <body style=\"font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;\">\n    <div style=\"max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;\">\n      <div style=\"background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;\">\n        <h1 style=\"margin:0; font-size:28px; font-weight:600;\">OXYGEN</h1>\n      </div>\n      \n      <div style=\"padding:40px 30px; text-align:center;\">\n        <h2 style=\"color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;\">\n          \xA1Bienvenid@!\n        </h2>\n        \n        <p style=\"font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;\">\n          Gracias por registrarte en nuestra plataforma. Para completar tu registro y acceder a todas las funcionalidades, necesitamos verificar tu direcci\xF3n de email.\n        </p>\n        \n        <div style=\"margin:40px 0;\">\n          <a href=\"".concat(verificationUrl, "\" style=\"background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:18px 40px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;box-shadow:0 4px 15px rgba(26,188,156,0.3);\">\n            Verificar mi email\n          </a>\n        </div>\n        \n        <hr style=\"border:0;border-top:1px solid #e2e8f0; margin:40px 0;\">\n        \n        <p style=\"font-size:14px; color:#666; margin-bottom:20px;\">\n          \xBFTienes preguntas? Cont\xE1ctanos en \n          <a href=\"mailto:support@oxygentoken.org\" style=\"color:#1ABC9C;\">support@oxygentoken.org</a>\n        </p>\n        \n        <p style=\"font-style:italic; color:#999; margin:0;\">\n          Con gratitud,<br>El equipo Oxygen\n        </p>\n      </div>\n      \n      <div style=\"background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;\">\n        <div style=\"margin-bottom:10px;\">\n          <a href=\"https://www.linkedin.com/company/oxygentoken/\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/3536/3536505.png\" alt=\"LinkedIn\" width=\"24\"></a>\n          <a href=\"https://x.com/OxygenToken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/5968/5968958.png\" alt=\"Twitter\" width=\"24\"></a>\n          <a href=\"https://instagram.com/oxygentoken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/2111/2111463.png\" alt=\"Instagram\" width=\"24\"></a>\n        </div>\n        Oxygen Token \xB7 Innovaci\xF3n al servicio del planeta<br>\n        \xA9 2023 Todos los derechos reservados\n      </div>\n    </div>\n  </body>\n  </html>\n  ");
}
function mailBienvenidaNuevoEstiloEN(email, token, verificationUrl) {
  return "\n  <html>\n  <body style=\"font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;\">\n    <div style=\"max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;\">\n      <div style=\"background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;\">\n        <h1 style=\"margin:0; font-size:28px; font-weight:600;\">OXYGEN</h1>\n      </div>\n      \n      <div style=\"padding:40px 30px; text-align:center;\">\n        <h2 style=\"color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;\">\n          Welcome!\n        </h2>\n        \n        <p style=\"font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;\">\n          Thank you for registering on our platform. To complete your registration and access all features, we need to verify your email address.\n        </p>\n        \n        <div style=\"margin:40px 0;\">\n          <a href=\"".concat(verificationUrl, "\" style=\"background:linear-gradient(135deg,#1ABC9C 0%,#0e9c8a 100%);color:#fff;padding:18px 40px;text-decoration:none;border-radius:8px;font-weight:600;display:inline-block;font-size:16px;box-shadow:0 4px 15px rgba(26,188,156,0.3);\">\n            Verify my email\n          </a>\n        </div>\n        \n        <hr style=\"border:0;border-top:1px solid #e2e8f0; margin:40px 0;\">\n        \n        <p style=\"font-size:14px; color:#666; margin-bottom:20px;\">\n          Have questions? Contact us at \n          <a href=\"mailto:support@oxygentoken.org\" style=\"color:#1ABC9C;\">support@oxygentoken.org</a>\n        </p>\n        \n        <p style=\"font-style:italic; color:#999; margin:0;\">\n          With gratitude,<br>The Oxygen Team\n        </p>\n      </div>\n      \n      <div style=\"background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;\">\n        <div style=\"margin-bottom:10px;\">\n          <a href=\"https://www.linkedin.com/company/oxygentoken/\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/3536/3536505.png\" alt=\"LinkedIn\" width=\"24\"></a>\n          <a href=\"https://x.com/OxygenToken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/5968/5968958.png\" alt=\"Twitter\" width=\"24\"></a>\n          <a href=\"https://instagram.com/oxygentoken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/2111/2111463.png\" alt=\"Instagram\" width=\"24\"></a>\n        </div>\n        Oxygen Token \xB7 Innovation for the planet<br>\n        \xA9 2023 All rights reserved\n      </div>\n    </div>\n  </body>\n  </html>\n  ");
}
function sendTwoFactorEmail(_x5, _x6) {
  return _sendTwoFactorEmail.apply(this, arguments);
}
function _sendTwoFactorEmail() {
  _sendTwoFactorEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(direccion, code) {
    var _yield$resend$emails$3, data, error;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return resend.emails.send({
            from: 'Oxygen Group <noreply@oxygentoken.org>',
            to: [direccion],
            subject: '🔐 Código de verificación de dos factores - Oxygen',
            html: mailTwoFactorAuth(direccion, code)
          });
        case 3:
          _yield$resend$emails$3 = _context3.sent;
          data = _yield$resend$emails$3.data;
          error = _yield$resend$emails$3.error;
          if (!error) {
            _context3.next = 9;
            break;
          }
          console.error('❌ Resend error:', error);
          return _context3.abrupt("return", {
            success: false,
            error: error.message
          });
        case 9:
          console.log('✅ 2FA email sent successfully with Resend:', data.id);
          return _context3.abrupt("return", {
            success: true,
            messageId: data.id
          });
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.error('❌ 2FA email sending failed:', _context3.t0.message);
          return _context3.abrupt("return", {
            success: false,
            error: _context3.t0.message
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return _sendTwoFactorEmail.apply(this, arguments);
}
function sendTwoFactorEmailEN(_x7, _x8) {
  return _sendTwoFactorEmailEN.apply(this, arguments);
}
function _sendTwoFactorEmailEN() {
  _sendTwoFactorEmailEN = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(direccion, code) {
    var _yield$resend$emails$4, data, error;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return resend.emails.send({
            from: 'Oxygen Group <noreply@oxygentoken.org>',
            to: [direccion],
            subject: '🔐 Two-factor authentication code - Oxygen',
            html: mailTwoFactorAuthEN(direccion, code)
          });
        case 3:
          _yield$resend$emails$4 = _context4.sent;
          data = _yield$resend$emails$4.data;
          error = _yield$resend$emails$4.error;
          if (!error) {
            _context4.next = 9;
            break;
          }
          console.error('❌ Resend error:', error);
          return _context4.abrupt("return", {
            success: false,
            error: error.message
          });
        case 9:
          console.log('✅ 2FA email sent successfully with Resend:', data.id);
          return _context4.abrupt("return", {
            success: true,
            messageId: data.id
          });
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.error('❌ 2FA email sending failed:', _context4.t0.message);
          return _context4.abrupt("return", {
            success: false,
            error: _context4.t0.message
          });
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return _sendTwoFactorEmailEN.apply(this, arguments);
}
function mailTwoFactorAuth(email, code) {
  return "\n  <html>\n  <body style=\"font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;\">\n    <div style=\"max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;\">\n      <div style=\"background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;\">\n        <h1 style=\"margin:0; font-size:28px; font-weight:600;\">OXYGEN</h1>\n      </div>\n      \n      <div style=\"padding:40px 30px; text-align:center;\">\n        <h2 style=\"color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;\">\n          C\xF3digo de verificaci\xF3n\n        </h2>\n        \n        <p style=\"font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;\">\n          Se ha iniciado sesi\xF3n en tu cuenta. Para completar el inicio de sesi\xF3n, ingresa el siguiente c\xF3digo de 6 d\xEDgitos:\n        </p>\n        \n        <div style=\"margin:40px 0;\">\n          <div style=\"background:#f0f9ff; border:2px solid #1ABC9C; border-radius:12px; padding:30px; display:inline-block;\">\n            <div style=\"font-size:48px; font-weight:700; color:#004d40; letter-spacing:8px; font-family:monospace;\">\n              ".concat(code, "\n            </div>\n          </div>\n        </div>\n        \n        <p style=\"font-size:14px; color:#999; margin-top:30px;\">\n          Este c\xF3digo expirar\xE1 en 10 minutos. Si no solicitaste este c\xF3digo, ignora este mensaje.\n        </p>\n        \n        <hr style=\"border:0;border-top:1px solid #e2e8f0; margin:40px 0;\">\n        \n        <p style=\"font-size:14px; color:#666; margin-bottom:20px;\">\n          \xBFTienes preguntas? Cont\xE1ctanos en \n          <a href=\"mailto:support@oxygentoken.org\" style=\"color:#1ABC9C;\">support@oxygentoken.org</a>\n        </p>\n        \n        <p style=\"font-style:italic; color:#999; margin:0;\">\n          Con gratitud,<br>El equipo Oxygen\n        </p>\n      </div>\n      \n      <div style=\"background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;\">\n        <div style=\"margin-bottom:10px;\">\n          <a href=\"https://www.linkedin.com/company/oxygentoken/\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/3536/3536505.png\" alt=\"LinkedIn\" width=\"24\"></a>\n          <a href=\"https://x.com/OxygenToken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/5968/5968958.png\" alt=\"Twitter\" width=\"24\"></a>\n          <a href=\"https://instagram.com/oxygentoken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/2111/2111463.png\" alt=\"Instagram\" width=\"24\"></a>\n        </div>\n        Oxygen Token \xB7 Innovaci\xF3n al servicio del planeta<br>\n        \xA9 2023 Todos los derechos reservados\n      </div>\n    </div>\n  </body>\n  </html>\n  ");
}
function mailTwoFactorAuthEN(email, code) {
  return "\n  <html>\n  <body style=\"font-family: Arial, sans-serif; background-color: #f8fbfa; color: #2d3748; margin:0;padding:0;\">\n    <div style=\"max-width:600px; margin:40px auto; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,77,64,0.08); overflow:hidden;\">\n      <div style=\"background:linear-gradient(135deg,#004d40 0%,#1ABC9C 100%); color:#fff; text-align:center; padding:30px 0;\">\n        <h1 style=\"margin:0; font-size:28px; font-weight:600;\">OXYGEN</h1>\n      </div>\n      \n      <div style=\"padding:40px 30px; text-align:center;\">\n        <h2 style=\"color:#004d40; font-size:28px; margin:0 0 20px; line-height:1.3;\">\n          Verification Code\n        </h2>\n        \n        <p style=\"font-size:16px; color:#666; margin-bottom:30px; line-height:1.6;\">\n          A login attempt has been made on your account. To complete the login, enter the following 6-digit code:\n        </p>\n        \n        <div style=\"margin:40px 0;\">\n          <div style=\"background:#f0f9ff; border:2px solid #1ABC9C; border-radius:12px; padding:30px; display:inline-block;\">\n            <div style=\"font-size:48px; font-weight:700; color:#004d40; letter-spacing:8px; font-family:monospace;\">\n              ".concat(code, "\n            </div>\n          </div>\n        </div>\n        \n        <p style=\"font-size:14px; color:#999; margin-top:30px;\">\n          This code will expire in 10 minutes. If you didn't request this code, please ignore this message.\n        </p>\n        \n        <hr style=\"border:0;border-top:1px solid #e2e8f0; margin:40px 0;\">\n        \n        <p style=\"font-size:14px; color:#666; margin-bottom:20px;\">\n          Have questions? Contact us at \n          <a href=\"mailto:support@oxygentoken.org\" style=\"color:#1ABC9C;\">support@oxygentoken.org</a>\n        </p>\n        \n        <p style=\"font-style:italic; color:#999; margin:0;\">\n          With gratitude,<br>The Oxygen Team\n        </p>\n      </div>\n      \n      <div style=\"background:#004d40; color:#fff; text-align:center; font-size:14px; padding:20px 0;\">\n        <div style=\"margin-bottom:10px;\">\n          <a href=\"https://www.linkedin.com/company/oxygentoken/\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/3536/3536505.png\" alt=\"LinkedIn\" width=\"24\"></a>\n          <a href=\"https://x.com/OxygenToken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/5968/5968958.png\" alt=\"Twitter\" width=\"24\"></a>\n          <a href=\"https://instagram.com/oxygentoken\" style=\"margin:0 8px;\"><img src=\"https://cdn-icons-png.flaticon.com/512/2111/2111463.png\" alt=\"Instagram\" width=\"24\"></a>\n        </div>\n        Oxygen Token \xB7 Innovation for the planet<br>\n        \xA9 2023 All rights reserved\n      </div>\n    </div>\n  </body>\n  </html>\n  ");
}
var _default = exports["default"] = resend;