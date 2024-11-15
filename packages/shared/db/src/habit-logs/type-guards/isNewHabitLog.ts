import z from "zod";

import { HabitLogSchema } from "../HabitLogSchema";

const NewHabitLogSchema = HabitLogSchema.omit({
  id: true,
  createdAt: true,
});

export const isNewHabitLog = (
  obj: unknown
): obj is z.infer<typeof NewHabitLogSchema> => {
  return NewHabitLogSchema.safeParse(obj).success;
};
