import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

import { findUserByEmail, validate } from "../../lib";

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

    res.status(200).send({
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken: token,
    });

    return;
  }

  res.status(404).send("Not found.");
}
