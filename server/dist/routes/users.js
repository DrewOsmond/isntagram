"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.use("/restore", auth_1.restore);
router.use("/login", auth_1.login);
router.use("/register", auth_1.register);
exports.default = router;
//# sourceMappingURL=users.js.map