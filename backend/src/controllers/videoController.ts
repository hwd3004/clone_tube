import { Request, Response, NextFunction } from "express";
import Video from "../models/Videos";
import { filterUnauthorized, videoFileUpload } from "../util";
import User from "../models/Users";
import jwt from "jsonwebtoken";
import { unlink, rm, rmdirSync } from "fs";

const home = async (req: Request, res: Response) => {
  // https://mongoosejs.com/docs/api.html#query_Query-sort
  const videos = await Video.find({}).sort({ createdAt: "desc" });

  return res.send({ pageTitle: "home", videos });
};

const watch = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;

    // const video = await Video.findById(id);
    // const onwer = await User.findById(video.owner);
    // 하나로 줄임
    const video = await Video.findById(id).populate("owner");

    const token: string = JSON.parse(req.headers.user as string);
    const loggedIn: string = JSON.parse(req.headers.loggedin as string);

    let currentUserId: any = null;

    if (loggedIn) {
      const user: any = jwt.verify(token, process.env.SECRET_KEY as string);
      currentUserId = user.id;
    }

    return res.send({
      status: 200,
      pageTitle: video.title,
      video,
      currentUserId,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 404,
      pageTitle: "Video not found.",
    });
  }
};

const getEdit = async (req: Request, res: Response, next: NextFunction, payload: any) => {
  try {
    const {
      params: { id },
    } = req;

    const video = await Video.findById(id);

    if (video.owner.toString() != payload.id) {
      return res.send({ status: 403, errorMsg: "you are not owner." });
    }

    return res.send({
      status: 200,
      video,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 404,
    });
  }
};

const postEdit = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;

    const { title, description, hashtags }: { title: string; description: string; hashtags: string } = req.body;

    // mongoose로 데이터를 불러와서 수정하고 저장하는 방법 1
    // const video = await Video.findById(id);

    // if (!video) {
    //   return res.send({ status: 404, errorMsg: "Video not found." });
    // }

    // video.title = title;
    // video.description = description;
    // // video.hashtags = hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word.trim()}`));

    // // middleware에서 pre 사용
    // // video.hashtags = hashtags;

    // await video.save();

    //
    //
    //

    // mongoose로 데이터를 불러와서 수정하고 저장하는 방법 2
    const video = await Video.exists({ _id: id });
    if (!video) {
      return res.send({ status: 404, errorMsg: "Video not found." });
    }

    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: hashtags.split(",").map((word) => {
        if (word.startsWith("#")) {
          return word;
        } else {
          return `#${word.trim()}`;
        }
      }),
    });

    return res.send({ status: 200 });
  } catch (error) {
    return res.send({ status: 400, errorMsg: "Error" });
  }
};

const search = async (req: Request, res: Response) => {
  // console.log(req.query.keyword);

  // https://stackoverflow.com/questions/63538665/how-to-type-request-query-in-express-using-typescript
  // express 타입스크립트에서 url 쿼리 스트링을 문자열로 받기
  const keyword: string = req.query.keyword as string;

  // https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find
  const $regex = new RegExp(keyword, "i");

  let videos = [];

  if (keyword) {
    videos = await Video.find({ title: { $regex } });
  }

  return res.send({ pageTitle: "Search", videos });
};

const deleteVideo = async (req: Request, res: Response, next: NextFunction, payload: any) => {
  try {
    const {
      params: { id },
    } = req;

    const video = await Video.findById(id);

    const owner = video.owner.toString();
    const currentUserId = payload.id;

    if (owner != currentUserId) {
      return res.send({ status: 403, errorMsg: "you are not owner." });
    }

    let errorState = false;

    // console.log(process.cwd());
    // console.log(video.fileUrl);

    // unlink(`${process.cwd()}/${video.fileUrl}`, (error: any) => {
    //   if (error) {
    //     errorState = true;
    //   }
    // });

    const fileUrl: string = video.fileUrl;
    console.log(fileUrl);

    const fileUrlStringArray = fileUrl.split("/");
    console.log(fileUrlStringArray);

    console.log(fileUrlStringArray[0]);
    console.log(fileUrlStringArray[1]);
    console.log(fileUrlStringArray[2]);

    rmdirSync(
      `${process.cwd()}/${fileUrlStringArray[1]}/${fileUrlStringArray[2]}/${fileUrlStringArray[3]}/${
        fileUrlStringArray[4]
      }`,
      { recursive: true }
    );

    if (errorState) {
      return res.send({ status: 400, errorMsg: "Cannot Delete Video." });
    }

    await Video.findByIdAndDelete(id);

    const user = await User.findById(payload.id);

    user.videos.splice(video.owner);

    user.save();

    // Model.findOneAndDelete()
    // Model.findOneAndRemove()
    // 이 둘은 정말 약간의 차이가 있는데 대부분의 상황에서 타당한 이유가 없는 한 delete를 사용하라고 되어 있음.
    // https://www.zerocho.com/category/MongoDB/post/579ecb1fc097d015000404dd
    // 몽고 db는 롤백이 안되서 remove를 하면 다시 되돌릴 수 없기에 remove보다 delete를 사용하라고 권장하는듯

    return res.send({ status: 200 });
  } catch (error) {
    console.log(error);
    return res.send({ status: 400, errorMsg: "Cannot Delete Video." });
  }
};

const getUpload = (req: Request, res: Response) => res.send("Upload");
const postUpload = async (req: Request, res: Response, next: NextFunction, payload: any) => {
  try {
    const { title, description, hashtags } = req.body;

    const { id } = payload;

    const file: any = req.files;

    const { status, errorMsg, fileUrl } = await videoFileUpload(file, id, title);

    if (errorMsg) {
      return res.send({
        status: 400,
        errorMsg,
      });
    }

    const newVideo = await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word: string) => `#${word.trim()}`),
      meta: {
        views: 0,
        rating: 0,
      },
      fileUrl,
      owner: id,
    });

    const user = await User.findById(id);
    user.videos.push(newVideo._id);
    user.save();

    return res.send({ status: 200 });
  } catch (error) {
    console.error(error);
    return res.send({
      status: 400,
      errorMsg: "Cannot Upload Video.",
    });
  }
};

export default {
  getUpload,
  postUpload: filterUnauthorized(postUpload),
  deleteVideo: filterUnauthorized(deleteVideo),
  search,
  getEdit: filterUnauthorized(getEdit),
  postEdit: filterUnauthorized(postEdit),
  watch,
  home,
};
