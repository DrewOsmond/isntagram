"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/user");
const auth_1 = require("../../util/auth");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = (0, express_1.Router)();
router.post("/restore", auth_1.authenticateUser, (0, express_async_handler_1.default)(user_1.restore));
router.post("/login", (0, express_async_handler_1.default)(user_1.login));
router.post("/register", (0, express_async_handler_1.default)(user_1.register));
router.delete("/logout", (0, express_async_handler_1.default)(user_1.logout));
exports.default = router;
//# sourceMappingURL=users.js.map