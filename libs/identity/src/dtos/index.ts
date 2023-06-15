import { z } from "zod";
import { identityDetailsSchema } from "../schemas";

export const loginResponseDto = z.object({
  accessToken: z.string(),
});

export type ILoginResponseDto = z.infer<typeof loginResponseDto>;

export const verifyPasswordDto = z.object({
  identityId: z.string(),
  password: z.string(),
})

export type IVerifyPasswordDto = z.infer<typeof verifyPasswordDto>;

export const registerWithEmailAndPasswordDto = z.object({
  propertyId: z.string(),
  details: identityDetailsSchema,
  email: z.string().trim().toLowerCase(),
  password: z.string().trim(),
})

export type IRegisterWithEmailAndPasswordDto = z.infer<typeof registerWithEmailAndPasswordDto>;

export const loginWithEmailAndPasswordDto = z.object({
  propertyId: z.string(),
  email: z.string().trim().toLowerCase(),
  password: z.string().trim(),
})

export type ILoginWithEmailAndPasswordDto = z.infer<typeof loginWithEmailAndPasswordDto>;
