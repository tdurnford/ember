import { Habit } from "@prisma/client";

import prisma from "../prisma";

export const createHabit = async (
  habit: Omit<Habit, "id" | "createdAt" | "updatedAt">
) => {
  const newHabit = await prisma.habit.create({
    data: habit,
  });

  return newHabit;
};
