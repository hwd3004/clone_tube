import { Request, Response } from "express";
import Video from "../models/Videos";

// export const home = (req: Request, res: Response) => {
//   Video.find({}, (error, result) => {
//     console.log("error : ", error);
//     console.log("result : ", result);
//   });
//   return res.send({ pageTitle: "home" });
// };

export const home = async (req: Request, res: Response) => {
  const videos = await Video.find({});
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
    console.log("postEdit");
    const {
      params: { id },
    } = req;

    const { title, description, hashtags }: { title: string; description: string; hashtags: string } = req.body;

    /*
    // mongoose로 데이터를 불러와서 수정하고 저장하는 방법 1
    const video = await Video.findById(id);
    ...
    await video.save();
    */

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

    return res.send(200);
  } catch (error) {
    return res.send({ status: 500, errorMsg: "Internal Server Error" });
  }
};

export const search = (req: Request, res: Response) => res.send("Search");
export const deleteVideo = (req: Request, res: Response) => res.send("Delete Video");

export const getUpload = (req: Request, res: Response) => res.send("Upload");
export const postUpload = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { title, description, hashtags } = req.body;
    const video = await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word: string) => `#${word}`),
      meta: {
        views: 0,
        rating: 0,
      },
    });

    console.log(video);

    return res.send(200);
  } catch (error) {
    console.log(error);
    return res.send({
      errorMsg: error,
    });
  }
};
