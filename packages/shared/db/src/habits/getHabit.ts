import prisma from "../prisma";

export const getHabit = async (id: string) => {
  const habit = await prisma.habit.findUnique({
    where: {
      id,
    },
  });

  return habit;
};
