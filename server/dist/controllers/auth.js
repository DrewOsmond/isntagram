"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.restore = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
const emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const secret = process.env.JWT_SECRET;
const inProduction = process.env.NODE_ENV === "prudction";
const signJWT = (req, res) => {
    const { user } = req.body;
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
    }, secret, {
        expiresIn: 1000 * 60 * 60 * 24 * 7 * 52,
    });
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: inProduction && "lax",
        secure: inProduction,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52,
    });
};
const login = (req, res) => { };
exports.login = login;
const restore = (req, res) => { };
exports.restore = restore;
const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!email.toLowerCase().match(emailPattern)) {
        res.status(400).json({ error: "must provide a valid email" });
    }
    else {
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        const user = await app_1.prisma.user
            .create({
            data: {
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: hashedPassword,
            },
            select: {
                id: true,
                username: true,
                email: true,
                picture: true,
                posts: true,
            },
        })
            .catch((error) => console.log(error));
        if (user) {
            res.status(201).json(user);
        }
    }
};
exports.register = register;
//# sourceMappingURL=auth.js.map