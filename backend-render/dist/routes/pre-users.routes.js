"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _preUsersController = require("../controllers/preUsers.controller.js");
var router = (0, _express.Router)();
router.post("/pre-users-calc", _preUsersController.methods.createPreUser);
router.put("/pre-users-calc/:id?", _preUsersController.methods.updatePreUserResult);
var _default = exports["default"] = router;