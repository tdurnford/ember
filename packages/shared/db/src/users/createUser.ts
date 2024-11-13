import { User } from "@prisma/client";

import prisma from "../prisma";

export const createUser = async (user: Omit<User, "id" | "createdAt">) => {
  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
};
