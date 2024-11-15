import prisma from "../prisma";

export const getHabitLogs = async (habitId: string) => {
  const habitLogs = await prisma.habitLog.findMany({
    where: {
      habitId,
    },
  });

  return habitLogs;
};
