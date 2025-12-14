"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var PreUsersCalc = new _mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  calculatorData: {
    type: _mongoose.Schema.Types.Mixed,
    "default": null
  },
  finalResult: {
    type: _mongoose.Schema.Types.Mixed,
    "default": null
  },
  status: {
    type: String,
    "enum": ["pending", "completed"],
    "default": "pending"
  },
  completedAt: {
    type: Date,
    "default": null
  }
}, {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)("preUsersCalc", PreUsersCalc);