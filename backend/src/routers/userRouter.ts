import express from "express";
import userCon from "../controllers/userController";

const userRouter = express.Router();

const { logout, getEdit, postEdit, remove, see, postChangePassword } = userCon;

userRouter.post("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/remove", remove);
userRouter.get(":id", see);
userRouter.route("/change_password").post(postChangePassword);

export default userRouter;
