import { Request, Response } from "express";

export const trending = (req: Request, res: Response) => res.send("videos");
export const see = (req: Request, res: Response) => {
  return res.send(`watch ${req.params.id}`);
};
export const edit = (req: Request, res: Response) => res.send("Edit");
export const search = (req: Request, res: Response) => res.send("Search");
export const upload = (req: Request, res: Response) => res.send("Upload");
export const deleteVideo = (req: Request, res: Response) => res.send("Delete Video");
