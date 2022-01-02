import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;
const inProduction: boolean = process.env.NODE_ENV === "prudction";

export const signJWT = (req: Request, res: Response) => {
  const { user } = req.body;

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
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

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.cookie) {
    res.sendStatus(401);
  } else {
    const jwtArr = req.headers.cookie?.split("=");
    const [_type, token] = jwtArr;

    jwt.verify(token, secret, undefined, async (err, payload: any) => {
      if (err) {
        return res.status(403).json({
          error: "not authorized",
        });
      } else {
        const { id, username, email } = payload;
        //@ts-ignore
        req.user = { id, username, email };
        req.body.user = { id, username, email };
        return next();
      }
    });
  }
};
