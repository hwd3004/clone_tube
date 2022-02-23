import { Request, Response } from "express";

export const join = (req: Request, res: Response) => res.send("Join");
export const edit = (req: Request, res: Response) => res.send("Edit User");
export const remove = (req: Request, res: Response) => res.send("Remove User");
export const login = (req: Request, res: Response) => res.send("Login");
export const logout = (req: Request, res: Response) => res.send("Log out");
export const see = (req: Request, res: Response) => res.send("See User");
