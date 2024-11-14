import prisma from "../prisma";

export const getHabits = async (userId: string) => {
  const habits = await prisma.habit.findMany({
    where: {
      userId,
    },
  });

  return habits;
};
