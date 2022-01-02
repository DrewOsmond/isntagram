"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const inProduction = process.env.NODE_ENV === "prudction";
const signJWT = (req, res) => {
    const { user } = req.body;
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username,
        email: user.email,
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
exports.signJWT = signJWT;
const authenticateUser = async (req, res, next) => {
    var _a;
    if (!req.headers.cookie) {
        res.sendStatus(401);
    }
    else {
        const jwtArr = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=");
        const [_type, token] = jwtArr;
        jsonwebtoken_1.default.verify(token, secret, undefined, async (err, payload) => {
            if (err) {
                return res.status(403).json({
                    error: "not authorized",
                });
            }
            else {
                const { id, username, email } = payload;
                req.user = { id, username, email };
                req.body.user = { id, username, email };
                return next();
            }
        });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=auth.js.map