import prisma from "../prisma";

export const deleteHabitLog = async (id: string) => {
  const habitLog = await prisma.habitLog.delete({
    where: {
      id,
    },
  });

  return habitLog;
};
