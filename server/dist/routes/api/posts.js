"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../../util/auth");
const posts_1 = require("../../controllers/posts");
const aws_1 = require("../../util/aws");
const router = (0, express_1.Router)();
router.post("/", auth_1.authenticateUser, (0, express_async_handler_1.default)(posts_1.createPost));
router.patch("/:id", auth_1.authenticateUser, (0, express_async_handler_1.default)(posts_1.updatePost));
router.delete("/:id", auth_1.authenticateUser, (0, express_async_handler_1.default)(posts_1.deletePost));
router.post("/upload", auth_1.authenticateUser, aws_1.upload.single("photo"), function (req, res) {
    res.status(201).json(req.file);
});
exports.default = router;
//# sourceMappingURL=posts.js.map