import express from "express";
import { watch, edit, upload, deleteVideo, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);

videoRouter.post("/upload", postUpload);

// 숫자만 선택하는 정규식 - (\d+), 자바스크립트에서 쓰려면 (\\d+)
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
