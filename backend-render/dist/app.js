"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _dotenv = require("dotenv");
var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));
var _walletRoutes = _interopRequireDefault(require("./routes/wallet.routes.js"));
var _preUsersRoutes = _interopRequireDefault(require("./routes/pre-users.routes.js"));
var _pinging = _interopRequireDefault(require("./pinging.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(0, _dotenv.config)();
(0, _pinging["default"])();
var app = (0, _express["default"])();
app.set('port', process.env.PORT || 10001);
app.use(_express["default"].json());
app.use(_express["default"].text());
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "https://www.oxygentoken.org", "https://oxygentoken.org", "https://wwww.oxygenworld.org"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use("/", _authRoutes["default"]);
app.use("/", _walletRoutes["default"]);
app.use("/", _preUsersRoutes["default"]);
app.use("/en", _authRoutes["default"]);
app.use(_express["default"]["static"]("public"));
var _default = exports["default"] = app;