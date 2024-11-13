import { User } from "@prisma/client";

import prisma from "../prisma";

export const updateUser = async (id: User["id"], user: Partial<User>) => {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: user,
  });

  return updatedUser;
};
