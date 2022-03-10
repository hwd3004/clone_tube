import express from "express";
import userCon from "../controllers/userController";

const userRouter = express.Router();

const { logout, getEdit, postEdit, remove, see } = userCon;

userRouter.post("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;
