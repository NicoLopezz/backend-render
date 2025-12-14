"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _url = require("url");
var _path = _interopRequireWildcard(require("path"));
var _authController = require("../controllers/auth.controller.js");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var router = (0, _express.Router)();
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = (0, _path.dirname)(_filename);
router.post("/register", _authController.methods.register);
router.post("/login", _authController.methods.login);
router.post("/verify-affiliate-code", _authController.methods.verifyAffiliateCode);
router.post("/verify-email", _authController.methods.verifyEmailPost);
router.post("/update-welcome-modal", _authController.methods.updateWelcomeModal);
router.post("/update-onboarding-step", _authController.methods.updateOnboardingStep);
router.post("/update-profile-status", _authController.methods.updateProfileStatus);
router.post("/logout", _authController.methods.logout);
router.post("/2fa/generate", _authController.methods.generate2FA);
router.post("/2fa/verify", _authController.methods.verify2FA);
router.post("/2fa/status", _authController.methods.status2FA);
router.get("/post-register", function (req, res) {
  res.sendFile(_path["default"].join(_dirname, "../../public/post-register.html"));
});
router.get("/verify-success", function (req, res) {
  res.sendFile(_path["default"].join(_dirname, "../../public/verify-success.html"));
});
router.get("/verify-error", function (req, res) {
  res.sendFile(_path["default"].join(_dirname, "../../public/verify-error.html"));
});
router.get("/verify-expired", function (req, res) {
  res.sendFile(_path["default"].join(_dirname, "../../public/verify-expired.html"));
});
router.get("/verify/:token", _authController.methods.verifyCount);
router.get("/verify", _authController.methods.verifyWithQuery);
router.get("/allUsers", _authController.methods.allUsers);
router.get("/register", function (req, res) {
  res.sendFile(_path["default"].join(_dirname, "../../public/index.html"));
});
router.get("/login", function (req, res) {
  res.sendFile(_path["default"].join(_dirname, "../../public/login.html"));
});
router.get("/dashboard", _authController.methods.verifyToken, _authController.methods.dashboard);
router.get("/session", _authController.methods.checkSession);
var _default = exports["default"] = router;