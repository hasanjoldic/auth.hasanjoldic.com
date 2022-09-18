import { connectDB } from "./client";

interface IUser {
  id: string;
  email: string;
  password: string;
  salt: string;
}

export async function findUserByEmail(email: string) {
  const client = await connectDB();

  const userQuery = await client.query<IUser>(
    `
      SELECT *
      FROM users
      WHERE email = $1;
    `,
    [email]
  );

  return userQuery.rows[0];
}
