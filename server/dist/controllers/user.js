"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.restore = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
const auth_1 = require("../util/auth");
const emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const login = (req, res) => { };
exports.login = login;
const restore = (req, res) => {
    console.log(req);
};
exports.restore = restore;
const register = async (req, res) => {
    console.log(req.body);
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
            req.body.user = user;
            (0, auth_1.signJWT)(req, res);
            res.status(201).json(user);
        }
    }
};
exports.register = register;
console.log("");
//# sourceMappingURL=user.js.map