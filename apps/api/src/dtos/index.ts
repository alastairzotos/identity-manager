import { createApiKeyDto } from "@bitmetro/dashboard-models";
import { identitySchema, loginResponseDto, loginWithEmailAndPasswordDto, propertySchema, registerWithEmailAndPasswordDto, verifyPasswordDto } from "@bitmetro/identity";
import { createZodDto } from "nestjs-zod";

export class PropertyDto extends createZodDto(propertySchema) {}

export class IdentityDto extends createZodDto(identitySchema) {}
export class RegisterWithEmailAndPasswordDto extends createZodDto(registerWithEmailAndPasswordDto) {}
export class LoginWithEmailAndPasswordDto extends createZodDto(loginWithEmailAndPasswordDto) {}

export class LoginResponseDto extends createZodDto(loginResponseDto) {}
export class VerifyPasswordDto extends createZodDto(verifyPasswordDto) {}

export class CreateApiKeyDto extends createZodDto(createApiKeyDto) {}
