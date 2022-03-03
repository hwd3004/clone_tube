import express from "express";
import { getJoin, postJoin, getLogin, postLogin, getSession } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.route("/join").get(getJoin).post(postJoin);

rootRouter.route("/login").get(getLogin).post(postLogin);

rootRouter.get("/search", search);

rootRouter.get("/get_session", getSession);

export default rootRouter;
