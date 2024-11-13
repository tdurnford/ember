import { User } from "@prisma/client";

import prisma from "../prisma";

export const getUser = async (id: User["id"]) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
