import prisma from "@/libs/prisma";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: username,
        password: await hash(password, 10),
      },
    });
    if (!user) {
      return res.status(405).end();
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}
