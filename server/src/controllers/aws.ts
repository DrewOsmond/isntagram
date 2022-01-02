import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const ID = process.env.ACCESS_KEY;
const SECRET = process.env.SECRET_ACCESS_KEY;
const BUCKET_NAME: string = String(process.env.BUCKET_NAME);

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  //@ts-ignore
  bucket: BUCKET_NAME,
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: function (_req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (_req, _file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
