import prisma from "../prisma";

export const getHabitLog = async (id: string) => {
  const habitLog = await prisma.habitLog.findUnique({
    where: {
      id,
    },
  });

  return habitLog;
};
