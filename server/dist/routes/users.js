"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = (0, express_1.Router)();
router.use("/restore", (0, express_async_handler_1.default)(async (req, res) => {
    (0, user_1.restore)(req, res);
}));
router.use("/login", (0, express_async_handler_1.default)(async (req, res) => {
    (0, user_1.login)(req, res);
}));
router.use("/register", (0, express_async_handler_1.default)(async (req, res) => {
    (0, user_1.register)(req, res);
}));
exports.default = router;
//# sourceMappingURL=users.js.map