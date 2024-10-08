import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadVideo } from "../controllers/video.controller.js";

const router = Router();

router.route("/add").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "videoThumbnail", maxCount: 1 },
  ]),
  uploadVideo
);

export default router;
