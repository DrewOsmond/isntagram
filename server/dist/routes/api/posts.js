"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../../util/auth");
const posts_1 = require("../../controllers/posts");
const router = (0, express_1.Router)();
router.post("/create", auth_1.authenticateUser, (0, express_async_handler_1.default)(posts_1.createPost));
router.patch("/post/:id", auth_1.authenticateUser, (0, express_async_handler_1.default)(posts_1.updatePost));
router.delete("/post/:id", auth_1.authenticateUser, (0, express_async_handler_1.default)(posts_1.deletePost));
//# sourceMappingURL=posts.js.map