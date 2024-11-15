import z from "zod";

import { HabitLogSchema } from "../HabitLogSchema";

export const isHabitLog = (
  obj: unknown
): obj is z.infer<typeof HabitLogSchema> => {
  return HabitLogSchema.safeParse(obj).success;
};
