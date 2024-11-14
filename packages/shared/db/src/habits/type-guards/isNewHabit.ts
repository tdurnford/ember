import z from "zod";

import { HabitSchema } from "../HabitSchema";

const NewHabitSchema = HabitSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const isNewHabit = (
  obj: unknown
): obj is z.infer<typeof NewHabitSchema> => {
  return NewHabitSchema.safeParse(obj).success;
};
