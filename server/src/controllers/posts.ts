import { Request, Response } from "express";
import { prisma } from "../app";

export const createPost = async (req: Request, res: Response) => {
  const { content, image, user } = req.body;
  const newPost = await prisma.post.create({
    data: {
      image,
      content,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  res.status(201).json(newPost);
};

export const uploadImage = async () => {};

export const updatePost = async () => {};

export const deletePost = async () => {};
