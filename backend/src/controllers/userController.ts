import { Request, Response } from "express";
import User from "../models/Users";
import bcrypt from "bcrypt";

export const getJoin = (req: Request, res: Response) => {
  res.send({ pageTitle: "Join" });
};

export const postJoin = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password, password2, location } = req.body;

    if (password != password2) {
      return res.send({ status: 400, errorMsg: "Password confirmation does not match." });
    }

    const exists = await User.exists({ $or: [{ username, email }] });

    if (exists) {
      return res.send({ status: 400, errorMsg: "This username/email is already taken." });
    }

    await User.create({
      name,
      username,
      email,
      password: await bcrypt.hash(password, 5),
      location,
    });

    return res.send({ status: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ status: 400, errorMsg: "error" });
  }
};

export const edit = (req: Request, res: Response) => res.send("Edit User");
export const remove = (req: Request, res: Response) => res.send("Remove User");

export const getLogin = async (req: Request, res: Response) => {
  res.send("Login");
};

export const postLogin = async (req: Request, res: Response) => {
  // console.log(req.body);
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.send({ status: 400, errorMsg: "An account with this username does not exists." });
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.send({ status: 400, errorMsg: "Wrong password" });
  }

  req.session.user = user;
  req.session.loggedIn = true;

  return res.send({ status: 200, loggedIn: req.session.loggedIn, user: req.session.user });
};

export const getSession = async (req: Request, res: Response) => {
  console.log(req.sessionID);
  res.send({ asd: "asd" });
};

export const logout = (req: Request, res: Response) => res.send("Log out");
export const see = (req: Request, res: Response) => res.send("See User");
