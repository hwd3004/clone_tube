import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const filterPublicOnly = (resolver: any) => {
  return (req: Request, res: Response) => {
    const loggedIn: boolean = JSON.parse(req.headers.loggedin as string);

    if (loggedIn) {
      return res.send({ status: 403, errorMsg: "Public Only" });
    }

    return resolver(req, res);
  };
};

export const filterUnauthorized = (resolver: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token: string = JSON.parse(req.headers.user as string);
    const loggedIn: string = JSON.parse(req.headers.loggedin as string);

    if (!loggedIn) {
      return res.send({ status: 401, errorMsg: "It need Log In." });
    }

    const user = jwt.verify(token, process.env.SECRET_KEY as string);

    return resolver(req, res, next, { user });
  };
};
