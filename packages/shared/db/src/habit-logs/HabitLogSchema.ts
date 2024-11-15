import { z } from "zod";
import { LogStatus } from "@prisma/client";

export const HabitLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: z.enum([LogStatus.Completed, LogStatus.Skipped, LogStatus.Failed]),
  habitId: z.string(),
  date: z.date(),
  createdAt: z.date(),
});
