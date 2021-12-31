import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const secret: string = process.env.JWT_SECRET!;
const inProduction: boolean = process.env.NODE_ENV === "prudction";

export const signJWT = (req: Request, res: Response) => {
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
