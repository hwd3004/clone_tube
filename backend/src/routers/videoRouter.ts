import express from "express";
import videoCon from "../controllers/videoController";

const videoRouter = express.Router();

const { getUpload, postUpload, watch, getEdit, postEdit, deleteVideo } = videoCon;

videoRouter.route("/upload").get(getUpload).post(postUpload);

// 숫자만 선택하는 정규식 - (\d+), 자바스크립트에서 쓰려면 (\\d+)
// videoRouter.get("/:id(\\d+)", watch);
// 숫자 영어 24개 선택하는 정규식
// videoRouter.get("/:id([0-9a-f]{24})", watch);

videoRouter.get("/:id", watch);

videoRouter.route("/:id/edit").get(getEdit).post(postEdit);

videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;
