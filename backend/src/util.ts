import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import fileUpload from "express-fileupload";
import { existsSync, mkdirSync, unlink } from "fs";
import User from "./models/Users";

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
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = JSON.parse(req.headers.user as string);
      const loggedIn: string = JSON.parse(req.headers.loggedin as string);

      if (!loggedIn) {
        return res.send({ status: 401, errorMsg: "It need Log In." });
      }

      const user: any = jwt.verify(token, process.env.SECRET_KEY as string);
      const { id } = user;

      const userObj = await User.exists({ _id: id });

      if (!userObj) {
        return res.send({ status: 0, errorMsg: "Authorization Error" });
      }

      return resolver(req, res, next, { id });
    } catch (error) {
      console.log(error);
      return res.send({ status: 400, errorMsg: "error" });
    }
  };
};

export const avatarFileUpload = async (req_files: fileUpload.FileArray, id: any) => {
  try {
    if (!req_files || Object.keys(req_files).length == 0) {
      return {
        status: false,
      };
    }

    const key = Object.keys(req_files)[0];
    const file: any = req_files[key];
    const mimetype: string = file.mimetype;

    if (mimetype.split("/")[0] != "image") {
      return {
        status: false,
        errorMsg: "File is not Image.",
      };
    }

    if (mimetype == "image/gif") {
      return {
        status: false,
        errorMsg: "It cannot upload gif file.",
      };
    }

    const uploadPath = `${process.cwd()}/uploads/avatar/${id}`;

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    file.mv(`${uploadPath}/${file.name}`);

    const avatarUrl = `/uploads/avatar/${id}/${file.name}`;

    const userObj = await User.findById(id);

    // 이전 파일 삭제
    unlink(`${process.cwd()}/${userObj.avatarUrl}`, (error: any) => {
      console.log(error);
    });

    return {
      status: true,
      avatarUrl,
    };
  } catch (error) {
    console.log("file error");
    console.log(error);
    return {
      status: false,
      errorMsg: "error",
    };
  }
};

export const videoFileUpload = async (req_files: fileUpload.FileArray, id: any, title: any) => {
  try {
    if (!req_files || Object.keys(req_files).length == 0) {
      return {
        status: false,
        errorMsg: "Video File is empty.",
      };
    }

    const key = Object.keys(req_files)[0];
    const file: any = req_files[key];
    const mimetype: string = file.mimetype;

    if (mimetype.split("/")[0] != "video") {
      return {
        status: false,
        errorMsg: "File is not Video.",
      };
    }

    const dateNow = Date.now();

    const uploadPath = `${process.cwd()}/uploads/video/${id}/${title}/${dateNow}`;

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    file.mv(`${uploadPath}/${file.name}`);

    const fileUrl = `/uploads/video/${id}/${title}/${dateNow}`;

    return {
      status: true,
      fileUrl,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      errorMsg: "error",
    };
  }
};
