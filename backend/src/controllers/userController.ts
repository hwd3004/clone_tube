import { Request, Response } from "express";
import User from "../models/Users";
import bcrypt from "bcrypt";

export const getJoin = (req: Request, res: Response) => {
  res.send({ pageTitle: "Join" });
};

export const postJoin = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password, password2, location } = req.body;

    await User.findOneAndRemove({ name: "test" });

    if (password == password2) {
      await User.create({
        name,
        username,
        email,
        password: await bcrypt.hash(password, 5),
        location,
      });
      // {
      //   email: 'test@test.com',
      //   username: 'test_user',
      //   password: '$2b$05$e9jcQKvVdA.Tcj4DdaXS6OtQnZS50h35QlOYrLTJBobCiyav8958.',
      //   name: 'test',
      //   location: 'test',
      //   _id: new ObjectId("621f17f41daca48ccbe5b02d"),
      //   __v: 0
      // }

      return res.send({ status: 200 });
    } else {
      return res.send({ status: 500, errorMsg: "Password confirmation does not match." });
    }
  } catch (error) {
    console.log(error);
    return res.send({ status: 500, errorMsg: "This username/email is already taken." });
  }
};

export const edit = (req: Request, res: Response) => res.send("Edit User");
export const remove = (req: Request, res: Response) => res.send("Remove User");
export const getLogin = (req: Request, res: Response) => res.send("Login");
export const postLogin = async (req: Request, res: Response) => {
  // console.log(req.body);
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  // console.log("user : ", user);

  if (!user) {
    return res.send({ status: 400, errorMsg: "An account with this username does not exists." });
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.send({ status: 400, errorMsg: "Wrong password" });
  }

  return res.send({ status: 200 });
};
export const logout = (req: Request, res: Response) => res.send("Log out");
export const see = (req: Request, res: Response) => res.send("See User");