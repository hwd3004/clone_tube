import express from "express";
import { remove, logout, see, getEdit, postEdit } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;
