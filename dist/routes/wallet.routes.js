"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _walletController = require("../controllers/wallet.controller.js");
var router = (0, _express.Router)();
router.get('/wallet/check', _walletController.methods.checkWallet);
router.post('/wallet/link', _walletController.methods.linkWallet);
router.get('/wallet/nonce', _walletController.methods.getNonce);
router.get('/wallet/should-show-siwe', _walletController.methods.shouldShowSIWE);
router.post('/wallet/should-show-siwe', _walletController.methods.shouldShowSIWE);
var _default = exports["default"] = router;