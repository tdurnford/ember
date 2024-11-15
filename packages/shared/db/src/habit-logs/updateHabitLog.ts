import { HabitLog } from "@prisma/client";
import prisma from "../prisma";

export const updateHabitLog = async (
  habitId: string,
  updates: Partial<Omit<HabitLog, "id" | "createdAt" | "updatedAt">>
) => {
  const updatedHabit = await prisma.habitLog.update({
    where: {
      id: habitId,
    },
    data: updates,
  });

  return updatedHabit;
};
