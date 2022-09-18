import jwt, { JwtPayload } from "jsonwebtoken";

export async function verifyJwt(token: string) {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET env variable not set.");
  }

  return new Promise<false | JwtPayload>((resolve) => {
    jwt.verify(token, JWT_SECRET, (_, decoded) => {
      if (decoded && typeof decoded !== "string") resolve(decoded);
      resolve(false);
    });
  });
}
