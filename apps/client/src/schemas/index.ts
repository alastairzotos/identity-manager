import { identityDetailsSchema } from "@bitmetro/identity";
import { z } from "zod";

export const registerEmailPasswordSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().nonempty().optional(),
  password: z.string().min(8),
  repeatPassword: z.string().min(8),
  details: identityDetailsSchema.optional(),
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  path: ['repeatPassword'],
  message: "Passwords must match"
});

export type IRegisterEmailPasswordSchema = z.infer<typeof registerEmailPasswordSchema>;

export const loginEmailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type ILoginEmailPasswordSchema = z.infer<typeof loginEmailPasswordSchema>;
