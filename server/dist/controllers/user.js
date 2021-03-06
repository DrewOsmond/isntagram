"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.restore = exports.login = exports.register = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
const auth_1 = require("../util/auth");
const emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const getUser = async (req, res) => {
    const { username } = req.params;
    const user = await app_1.prisma.user
        .findFirst({
        where: {
            username,
        },
        select: {
            id: true,
            username: true,
            email: true,
            picture: true,
            posts: true,
            followedBy: {
                select: {
                    following: {
                        select: {
                            username: true,
                        },
                    },
                },
            },
            following: {
                select: {
                    follower: {
                        select: {
                            username: true,
                        },
                    },
                },
            },
        },
    })
        .catch(console.log);
    if (!user) {
        res.sendStatus(404);
    }
    else {
        res.status(200).json(user);
    }
};
exports.getUser = getUser;
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
            req.body.user = user;
            (0, auth_1.signJWT)(req, res);
            res.status(201).json(user);
        }
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await app_1.prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            username: true,
            email: true,
            picture: true,
            password: true,
            posts: {
                select: {
                    id: true,
                    image: true,
                    content: true,
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            },
            Likes: true,
        },
    });
    if (user && bcrypt_1.default.compareSync(password, user.password)) {
        user.password = "";
        req.body.user = user;
        (0, auth_1.signJWT)(req, res);
        res.status(200).json(user);
    }
    else {
        res.status(401).json({ error: "email or password are incorrect" });
    }
};
exports.login = login;
const restore = async (req, res) => {
    const { user } = req.body;
    const userToSend = await app_1.prisma.user.findUnique({
        where: {
            email: user.email,
        },
        select: {
            id: true,
            username: true,
            email: true,
            picture: true,
            posts: {
                select: {
                    id: true,
                    image: true,
                    content: true,
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            },
            Likes: true,
        },
    });
    res.status(200).json(userToSend);
};
exports.restore = restore;
const logout = async (_req, res) => {
    res.clearCookie("token");
    res.sendStatus(200);
};
exports.logout = logout;
//# sourceMappingURL=user.js.map