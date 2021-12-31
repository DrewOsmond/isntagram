import { Request, Response } from "express";
import bycrpt from "bcrypt";
import { prisma } from "../app";
import { signJWT } from "../util/auth";

const emailPattern: RegExp = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export interface Post {
  id: number;
  content: string;
  image: string;
  userId: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  picture?: string | null;
  posts: Post[];
}

export const login = (req: Request, res: Response) => {};

export const restore = (req: Request, res: Response) => {
  console.log(req);
};

export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (!email.toLowerCase().match(emailPattern)) {
    res.status(400).json({ error: "must provide a valid email" });
  } else {
    const hashedPassword = await bycrpt.hash(password, 12);

    const user: User | void = await prisma.user
      .create({
        data: {
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
          picture: true,
          posts: true,
        },
      })
      .catch((error) => console.log(error));

    if (user) {
      req.body.user = user;
      signJWT(req, res);
      res.status(201).json(user);
    }
  }
};

console.log("");
