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

export const see = (req: Request, res: Response) => {
  return res.send(`watch ${req.params.id}`);
};
export const edit = (req: Request, res: Response) => res.send("Edit");
export const search = (req: Request, res: Response) => res.send("Search");
export const upload = (req: Request, res: Response) => res.send("Upload");
export const deleteVideo = (req: Request, res: Response) => res.send("Delete Video");

export const postUpload = async (req: Request, res: Response) => {
  try {
    const { title, description, hashtags } = req.body;
    const video = await Video.create({
      title: title,
      description: description,
      hashtags: hashtags.split(",").map((word: string) => `#${word}`),
      meta: {
        views: 0,
        rating: 0,
      },
    });

    console.log(video);

    return res.send("uploaded");
  } catch (error) {
    console.log(error);
    return res.send({
      errorMsg: error,
    });
  }
};
