import prisma from "../prisma";

export const deleteHabit = async (id: string) => {
  const habit = await prisma.habit.delete({
    where: {
      id,
    },
  });

  return habit;
};
