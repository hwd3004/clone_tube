import { Request, Response, NextFunction } from "express";
import User from "../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { filterPublicOnly, filterUnauthorized, avatarFileUpload } from "../util";
import Video from "../models/Videos";

const getJoin = (req: Request, res: Response) => {
  res.send({ pageTitle: "Join" });
};

const postJoin = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password, password2, location } = req.body;

    if (password != password2) {
      return res.send({ status: 400, errorMsg: "Password confirmation does not match." });
    }

    // const exists = await User.exists({ $or: [{ username, email }] });

    // if (exists) {
    //   return res.send({ status: 400, errorMsg: "This username/email is already taken." });
    // }

    await User.create({
      name,
      username,
      email,
      password: await bcrypt.hash(password, 5),
      location,
    });

    return res.send({ status: 200 });
  } catch (error: any) {
    if (error.code == 11000) {
      const duplicateKey = Object.keys(error.keyValue)[0];

      return res.send({ status: 400, errorMsg: `This ${duplicateKey} is already exist.` });
    }
    console.log(error);
    return res.send({ status: 400, errorMsg: "error" });
  }
};

const getLogin = async (req: Request, res: Response) => {
  res.send("Login");
};

const postLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.send({ status: 400, errorMsg: "An account with this username does not exists." });
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.send({ status: 400, errorMsg: "Wrong password" });
  }

  // console.log(user._id);

  const token = jwt.sign({ id: user._id }, String(process.env.SECRET_KEY));

  // req.session.user = user;
  // req.session.loggedIn = true;

  return res.send({ status: 200, loggedIn: true, user: token });
};

const logout = async (req: Request, res: Response) => {
  try {
    let user: any = req.headers.user;
    // user = JSON.parse(user);

    let loggedin: any = req.headers.loggedin;
    loggedin = JSON.parse(loggedin);

    // console.log(user);
    // console.log(loggedin);

    // console.log(req.session);

    res.send({ status: 200 });
  } catch (error) {
    console.error(error);
    res.send({
      status: 400,
      errorMsg: "error",
    });
  }
};

const see = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id).populate("videos");

  if (!user) {
    return res.send({
      status: 400,
      errorMsg: "User not found.",
    });
  }

  // const videos = await Video.find({ owner: user._id });
  // console.log(user);

  return res.send({
    status: 200,
    pageTitle: user.name,
    user,
  });
};

const getEdit = async (req: Request, res: Response, _next: NextFunction, payload: any) => {
  try {
    const { id } = payload;

    const userObj = await User.findById(id);

    return res.send({ status: 200, user: userObj });
  } catch (error) {
    console.log(error);
    return res.send({ status: 400, errorMsg: "error" });
  }
};

const postEdit = async (req: Request, res: Response, _next: NextFunction, payload: any) => {
  try {
    const { id } = payload;

    const { name, email, username, location } = req.body;

    const file: any = req.files;

    const { status, avatarUrl, errorMsg } = await avatarFileUpload(file, id);

    if (errorMsg) {
      return res.send({
        status: 400,
        errorMsg,
      });
    }

    await User.findByIdAndUpdate(
      id,
      {
        avatarUrl,
        name,
        email,
        username,
        location,
      },
      { new: true }
    );
    // findByIdAndUpdate를 리턴받으면 기본적으로 업데이트 하기 전의 데이터를 받음
    // 데이터 업데이트 이후의 값을 리턴받으려면 옵션으로 {new: true}를 추가해야함

    return res.send({ status: 200 });
  } catch (error: any) {
    if (error.codeName == "DuplicateKey") {
      const duplicateKey = Object.keys(error.keyValue)[0];

      return res.send({ status: 400, errorMsg: `This ${duplicateKey} is already exist.` });
    }

    return res.send({ status: 400, errorMsg: "error" });
  }
};

const remove = (req: Request, res: Response) => res.send("Remove User");

const postChangePassword = async (req: Request, res: Response, _next: NextFunction, payload: any) => {
  try {
    const { currentPassword, newPassword, newPassword2 } = req.body;
    const { id } = payload;

    const user = await User.findById(id);

    const ok = await bcrypt.compare(currentPassword, user.password);

    if (!ok) {
      return res.send({ status: 400, errorMsg: "The current password is incorrect." });
    }

    if (newPassword != newPassword2) {
      return res.send({ status: 400, errorMsg: "The password does not match the confirmation." });
    }

    user.password = await bcrypt.hash(newPassword, 5);

    await user.save();

    return res.send({ status: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ status: 400, errorMsg: "error" });
  }
};

export default {
  getJoin: filterPublicOnly(getJoin),
  postJoin: filterPublicOnly(postJoin),
  getLogin: filterPublicOnly(getLogin),
  postLogin: filterPublicOnly(postLogin),
  logout: filterPublicOnly(logout),
  see,
  getEdit: filterUnauthorized(getEdit),
  postEdit: filterUnauthorized(postEdit),
  remove,
  postChangePassword: filterUnauthorized(postChangePassword),
};
