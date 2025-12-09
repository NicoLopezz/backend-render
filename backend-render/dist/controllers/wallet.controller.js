"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;
var _Users = _interopRequireDefault(require("../models/Users.js"));
var _siwe = require("siwe");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
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
var nonces = new Map();
var generateNonce = function generateNonce() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
var checkWallet = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var token, decoded, usuario;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.cookies.jwt;
          if (token) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            isLinked: false,
            walletAddress: null,
            error: 'No token provided'
          }));
        case 4:
          _context.prev = 4;
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
          _context.next = 17;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](4);
          if (!(_context.t0.name === 'TokenExpiredError')) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            isLinked: false,
            walletAddress: null,
            error: 'Token expired'
          }));
        case 14:
          if (!(_context.t0.name === 'JsonWebTokenError')) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            isLinked: false,
            walletAddress: null,
            error: 'Invalid token'
          }));
        case 16:
          throw _context.t0;
        case 17:
          _context.next = 19;
          return _Users["default"].findOne({
            email: decoded.userMail
          });
        case 19:
          usuario = _context.sent;
          if (usuario) {
            _context.next = 22;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            isLinked: false,
            walletAddress: null,
            error: 'User not found'
          }));
        case 22:
          return _context.abrupt("return", res.json({
            isLinked: !!usuario.wallet_address,
            walletAddress: usuario.wallet_address || null
          }));
        case 25:
          _context.prev = 25;
          _context.t1 = _context["catch"](0);
          console.error('Error checking wallet:', _context.t1);
          return _context.abrupt("return", res.status(500).json({
            isLinked: false,
            walletAddress: null,
            error: 'Internal server error'
          }));
        case 29:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 25], [4, 8]]);
  }));
  return function checkWallet(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var linkWallet = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var token, decoded, _req$body, message, signature, usuario, siweMessage, response, _response$error, _response$error2, fields, existingWallet;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = req.cookies.jwt;
          if (token) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: 'No autenticado'
          }));
        case 4:
          _context2.prev = 4;
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
          _context2.next = 17;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](4);
          if (!(_context2.t0.name === 'TokenExpiredError')) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: 'Token expirado. Por favor, inicia sesión nuevamente.'
          }));
        case 14:
          if (!(_context2.t0.name === 'JsonWebTokenError')) {
            _context2.next = 16;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: 'Token inválido'
          }));
        case 16:
          throw _context2.t0;
        case 17:
          _req$body = req.body, message = _req$body.message, signature = _req$body.signature;
          if (!(!message || !signature)) {
            _context2.next = 20;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: 'Mensaje y firma son requeridos'
          }));
        case 20:
          _context2.next = 22;
          return _Users["default"].findOne({
            email: decoded.userMail
          });
        case 22:
          usuario = _context2.sent;
          if (usuario) {
            _context2.next = 25;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
          }));
        case 25:
          if (!usuario.wallet_address) {
            _context2.next = 27;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: 'Ya tienes una wallet vinculada'
          }));
        case 27:
          console.log("🔍 Verificando firma SIWE...");
          console.log("   📧 Usuario:", usuario.email);
          console.log("   🔑 Wallet en mensaje:", message.address);
          siweMessage = new _siwe.SiweMessage(message);
          _context2.next = 33;
          return siweMessage.verify({
            signature: signature
          });
        case 33:
          response = _context2.sent;
          if (response.success) {
            _context2.next = 37;
            break;
          }
          console.error("❌ Verificación SIWE fallida:", ((_response$error = response.error) === null || _response$error === void 0 ? void 0 : _response$error.type) || 'Firma SIWE inválida');
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: ((_response$error2 = response.error) === null || _response$error2 === void 0 ? void 0 : _response$error2.type) || 'Firma SIWE inválida'
          }));
        case 37:
          console.log("✅ Firma SIWE verificada correctamente");
          fields = response.data;
          if (!(fields.nonce && nonces.has(fields.nonce))) {
            _context2.next = 44;
            break;
          }
          console.log("✅ Nonce válido encontrado");
          nonces["delete"](fields.nonce);
          _context2.next = 46;
          break;
        case 44:
          console.error("❌ Nonce inválido o expirado");
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: 'Nonce inválido o expirado'
          }));
        case 46:
          _context2.next = 48;
          return _Users["default"].findOne({
            wallet_address: fields.address.toLowerCase()
          });
        case 48:
          existingWallet = _context2.sent;
          if (!(existingWallet && existingWallet.email !== usuario.email)) {
            _context2.next = 51;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: 'Esta wallet ya está vinculada a otro usuario'
          }));
        case 51:
          usuario.wallet_address = fields.address.toLowerCase();
          _context2.next = 54;
          return usuario.save();
        case 54:
          console.log("✅ Wallet vinculada exitosamente:");
          console.log("   📧 Usuario:", usuario.email);
          console.log("   🔑 Wallet:", fields.address.toLowerCase());
          console.log("   🌐 Dominio:", fields.domain);
          console.log("   📅 Fecha vinculación:", new Date().toISOString());
          return _context2.abrupt("return", res.json({
            success: true,
            walletAddress: usuario.wallet_address
          }));
        case 62:
          _context2.prev = 62;
          _context2.t1 = _context2["catch"](0);
          console.error('Error linking wallet:', _context2.t1);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: 'Error al vincular wallet'
          }));
        case 66:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 62], [4, 8]]);
  }));
  return function linkWallet(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getNonce = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var token, decoded, nonce;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = req.cookies.jwt;
          if (token) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            success: false,
            message: 'No autenticado'
          }));
        case 4:
          _context3.prev = 4;
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
          _context3.next = 17;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](4);
          if (!(_context3.t0.name === 'TokenExpiredError')) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            success: false,
            message: 'Token expirado. Por favor, inicia sesión nuevamente.'
          }));
        case 14:
          if (!(_context3.t0.name === 'JsonWebTokenError')) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            success: false,
            message: 'Token inválido'
          }));
        case 16:
          throw _context3.t0;
        case 17:
          nonce = generateNonce();
          nonces.set(nonce, {
            email: decoded.userMail,
            createdAt: Date.now()
          });
          setTimeout(function () {
            nonces["delete"](nonce);
          }, 5 * 60 * 1000);
          return _context3.abrupt("return", res.json({
            nonce: nonce
          }));
        case 23:
          _context3.prev = 23;
          _context3.t1 = _context3["catch"](0);
          console.error('Error generating nonce:', _context3.t1);
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            message: 'Error al generar nonce'
          }));
        case 27:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 23], [4, 8]]);
  }));
  return function getNonce(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var shouldShowSIWE = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var walletAddress, normalizedAddress, usuario, shouldShowModal;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          walletAddress = req.body.walletAddress || req.query.address;
          if (walletAddress) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            success: false,
            shouldShowModal: false,
            message: 'Wallet address is required'
          }));
        case 4:
          normalizedAddress = walletAddress.toLowerCase();
          _context4.next = 7;
          return _Users["default"].findOne({
            wallet_address: normalizedAddress
          });
        case 7:
          usuario = _context4.sent;
          shouldShowModal = !usuario || !usuario.wallet_address;
          return _context4.abrupt("return", res.json({
            success: true,
            shouldShowModal: shouldShowModal,
            isLinked: !!(usuario !== null && usuario !== void 0 && usuario.wallet_address),
            walletAddress: (usuario === null || usuario === void 0 ? void 0 : usuario.wallet_address) || null
          }));
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error('Error checking should show SIWE:', _context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            success: false,
            shouldShowModal: false,
            message: 'Internal server error'
          }));
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return function shouldShowSIWE(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var methods = exports.methods = {
  checkWallet: checkWallet,
  linkWallet: linkWallet,
  getNonce: getNonce,
  shouldShowSIWE: shouldShowSIWE
};