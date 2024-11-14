import z from "zod";

import { HabitSchema } from "../HabitSchema";

export const isHabit = (obj: unknown): obj is z.infer<typeof HabitSchema> => {
  return HabitSchema.safeParse(obj).success;
};
