import { Request, Response } from "express";
import Video from "../models/Videos";

export const home = async (req: Request, res: Response) => {
  // https://mongoosejs.com/docs/api.html#query_Query-sort
  const videos = await Video.find({}).sort({ createdAt: "desc" });

  return res.send({ pageTitle: "home", videos });
};

export const watch = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;

    const video = await Video.findById(id);
    // console.log(video);

    return res.send({
      status: 200,
      pageTitle: video.title,
      video,
    });
  } catch (error) {
    // console.log(error);
    return res.send({
      status: 404,
      pageTitle: "Video not found.",
    });
    // return res.send(404);
  }
};

export const getEdit = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;

    const video = await Video.findById(id);

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

export const postEdit = async (req: Request, res: Response) => {
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

export const search = async (req: Request, res: Response) => {
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

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;

    await Video.findByIdAndDelete(id);

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

export const getUpload = (req: Request, res: Response) => res.send("Upload");
export const postUpload = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);

    const { title, description, hashtags } = req.body;
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word: string) => `#${word.trim()}`),
      meta: {
        views: 0,
        rating: 0,
      },
    });

    return res.send({ status: 200 });
  } catch (error) {
    console.error(error);
    return res.send({
      status: 400,
      errorMsg: "Cannot Upload Video.",
    });
  }
};
