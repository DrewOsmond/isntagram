"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const ID = process.env.ACCESS_KEY;
const SECRET = process.env.SECRET_ACCESS_KEY;
const BUCKET_NAME = String(process.env.BUCKET_NAME);
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    bucket: BUCKET_NAME,
});
exports.upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});
//# sourceMappingURL=aws.js.map