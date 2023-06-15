import { z } from "zod";

export const userDetailSchema = z.enum(["first_name", "last_name", "display_name"])

export type IUserDetail = z.infer<typeof userDetailSchema>;

export const loginModeSchema = z.enum([
  "email_and_password",
  "google",
  "facebook"
]);

export type ILoginMode = z.infer<typeof loginModeSchema>;

export const formTheme = z.enum(["light", "dark"]);

export type IFormTheme = z.infer<typeof formTheme>;

export const propertySchema = z.object({
  ownerId: z.string().optional(),
  name: z.string().trim(),
  uniqueId: z.string().refine(uniqueId => /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]*[a-zA-Z0-9]+$/gm.test(uniqueId), "Invalid ID"),
  userDetails: z.array(userDetailSchema),
  defaultUserData: z.any().optional(),
  loginModes: z.array(loginModeSchema),
  formTheme: formTheme,
  logo: z.string().url().trim(),
})

export type IProperty = z.infer<typeof propertySchema>;
