import z from "zod";

import { UserSchema } from "../UserSchema";

export const isUser = (obj: unknown): obj is z.infer<typeof UserSchema> => {
  return UserSchema.safeParse(obj).success;
};
