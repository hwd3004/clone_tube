import express from "express";
import userCon from "../controllers/userController";
import videoCon from "../controllers/videoController";

const { getJoin, postJoin, getLogin, postLogin } = userCon;

const { home, search } = videoCon;

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.route("/join").get(getJoin).post(postJoin);

rootRouter.route("/login").get(getLogin).post(postLogin);

rootRouter.get("/search", search);

export default rootRouter;
