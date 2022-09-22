import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";
import Cookies from "cookies";

import { findUserByEmail, validate } from "../../lib";

const cookieOptions: Cookies.SetOption = {
  maxAge: 31536000000,
  // httpOnly: true,
  sameSite: "strict",
  overwrite: true,
};

if (process.env.NODE_ENV === "production") {
  cookieOptions.domain = ".hasanjoldic.com";
  cookieOptions.secure = true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      res.status(401).send("Unauthorized");
    }

    const isValidPassword = await validate(password, user.salt, user.password);

    if (!isValidPassword) {
      res.status(401).send("Unauthorized");
    }

    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET env variable not set.");
    }

    var token = jwt.sign(
      {
        iss: "hasanjoldic.com",
        sub: user.id,
      },
      JWT_SECRET,
      {
        expiresIn: "30 days",
      }
    );

    const cookies = new Cookies(req, res, { secure: true });

    cookies.set("access_token", token, cookieOptions);

    res.status(200).send("OK");
    return;
  }

  res.status(404).send("Not found.");
}
