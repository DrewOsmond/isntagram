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

export const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;

  const user = await prisma.user
    .findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        picture: true,
        posts: true,
        followedBy: {
          select: {
            following: {
              select: {
                username: true,
              },
            },
          },
        },
        following: {
          select: {
            follower: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    })
    .catch(console.log);

  if (!user) {
    res.sendStatus(404);
  } else {
    res.status(200).json(user);
  }
};

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
      req.body.user = user;
      signJWT(req, res);
      res.status(201).json(user);
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      picture: true,
      password: true,
      posts: {
        select: {
          id: true,
          image: true,
          content: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      Likes: true,
    },
  });

  if (user && bycrpt.compareSync(password, user.password)) {
    user.password = "";
    req.body.user = user;
    signJWT(req, res);
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: "email or password are incorrect" });
  }
};

export const restore = async (req: Request, res: Response) => {
  const { user } = req.body;

  const userToSend = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      picture: true,
      posts: {
        select: {
          id: true,
          image: true,
          content: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      Likes: true,
    },
  });

  res.status(200).json(userToSend);
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.sendStatus(200);
};
