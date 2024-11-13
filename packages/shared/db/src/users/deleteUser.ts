import { User } from "@prisma/client";

import prisma from "../prisma";

export const deleteUser = async (id: User["id"]) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  return deletedUser;
};
