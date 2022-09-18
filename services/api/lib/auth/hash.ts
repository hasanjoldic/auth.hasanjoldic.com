import crypto from "crypto";

export async function hash(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
}

export async function validate(password: string, salt: string, hash: string) {
  const inputHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const isMatch = hash === inputHash;
  return isMatch;
}
