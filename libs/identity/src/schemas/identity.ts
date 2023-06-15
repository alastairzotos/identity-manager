import { z } from "zod";
import { userDetailSchema } from "./property";

export const timestamps = {
  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
}

export const identityDetailsSchema = z.record(userDetailSchema, z.string());

export const identitySchema = z.object({
  propertyId: z.string(),
  details: z.record(userDetailSchema, z.string()),
  data: z.any().optional(),
  email: z.string().email().optional(),
  username: z.string().nonempty().optional(),
  hashedPassword: z.string().optional(),
  ...timestamps,
})

export interface IIdentity<T = Object> extends z.infer<typeof identitySchema> {
  data?: T;
}
