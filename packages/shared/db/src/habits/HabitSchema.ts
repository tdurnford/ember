import { z } from "zod";
import { HabitFrequency, GoalType, Habit } from "@prisma/client";

export const HabitSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  startDate: z.date(),
  goalType: z.enum([GoalType.Count, GoalType.Duration, GoalType.Completion]),
  goalValue: z.number().nullable(),
  frequency: z.enum([
    HabitFrequency.Daily,
    HabitFrequency.Weekly,
    HabitFrequency.Monthly,
  ]),
  createdAt: z.date(),
  updatedAt: z.date(),
});
