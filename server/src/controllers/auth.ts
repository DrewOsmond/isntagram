import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";
import { prisma } from "../app";

const emailPattern: RegExp = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const secret: string = process.env.JWT_SECRET!;
const inProduction: boolean = process.env.NODE_ENV === "prudction";

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

const signJWT = (req: Request, res: Response) => {
  const { user } = req.body;

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    secret,
    {
      expiresIn: 1000 * 60 * 60 * 24 * 7 * 52,
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: inProduction && "lax",
    secure: inProduction,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52,
  });
};

export const login = (req: Request, res: Response) => {};

export const restore = (req: Request, res: Response) => {};

export const register = async (req: Request, res: Response) => {
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
      res.status(201).json(user);
    }
  }
};
