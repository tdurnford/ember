import { HabitLog } from "@prisma/client";

import prisma from "../prisma";

export const createHabitLog = async (
  habitLog: Omit<HabitLog, "id" | "createdAt" | "updatedAt">
) => {
  const newHabitLog = await prisma.habitLog.create({
    data: habitLog,
  });

  return newHabitLog;
};
