import z from "zod";

import { UserSchema } from "../UserSchema";

const NewUserSchema = UserSchema.omit({ id: true });

export const isNewUser = (
  obj: unknown
): obj is z.infer<typeof NewUserSchema> => {
  return NewUserSchema.safeParse(obj).success;
};
