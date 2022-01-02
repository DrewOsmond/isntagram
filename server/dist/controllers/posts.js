"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.uploadImage = exports.createPost = void 0;
const app_1 = require("../app");
const createPost = async (req, res) => {
    const { content, image, user } = req.body;
    const newPost = await app_1.prisma.post.create({
        data: {
            image,
            content,
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    });
    res.status(201).json(newPost);
};
exports.createPost = createPost;
const uploadImage = async () => { };
exports.uploadImage = uploadImage;
const updatePost = async () => { };
exports.updatePost = updatePost;
const deletePost = async () => { };
exports.deletePost = deletePost;
//# sourceMappingURL=posts.js.map