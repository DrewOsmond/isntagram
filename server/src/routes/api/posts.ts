import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authenticateUser } from "../../util/auth";
import { createPost, updatePost, deletePost } from "../../controllers/posts";
import { upload } from "../../controllers/aws";

const router = Router();

router.post("/", authenticateUser, expressAsyncHandler(createPost));
router.patch("/post/:id", authenticateUser, expressAsyncHandler(updatePost));
router.delete("/post/:id", authenticateUser, expressAsyncHandler(deletePost));
router.post("/upload", upload.single("photo"), function (req, res, next) {
  //   console.log(req);
  console.log(req.file);
  res.send({
    data: req.file,
    msg: "Successfully uploaded " + req.file + " files!",
  });
});

export default router;
