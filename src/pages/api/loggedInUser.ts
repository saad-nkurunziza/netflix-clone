import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prisma";
import { authOptions } from "@/libs/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method !== "GET") {
      return res.status(405).end();
    }
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return res.status(405).end();
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email!,
      },
    });
    if (!user) {
      return res.status(405).end();
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
