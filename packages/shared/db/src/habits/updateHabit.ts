import { Habit } from "@prisma/client";
import prisma from "../prisma";

export const updateHabit = async (
  habitId: string,
  updates: Partial<Omit<Habit, "id" | "createdAt" | "updatedAt">>
) => {
  const updatedHabit = await prisma.habit.update({
    where: {
      id: habitId,
    },
    data: updates,
  });

  return updatedHabit;
};
