import { BadRequestException, Body, ConflictException, Controller, ForbiddenException, NotFoundException, Post, Put, UseGuards } from "@nestjs/common";
import { LoginResponseDto, LoginWithEmailAndPasswordDto, LoginWithOAuthDto, RegisterWithEmailAndPasswordDto, VerifyPasswordDto } from "dtos";
import { AuthGuard } from "features/auth/auth.guard";
import { Roles } from "features/auth/roles.decorator";
import { IdentitiesService } from "features/identities/identities.service";

@Controller('identities')
@UseGuards(AuthGuard)
export class IdentitiesController {
  constructor(
    private readonly identitiesService: IdentitiesService,
  ) {}

  @Post('verify')
  async verifyIdentity(
    @Body() data: LoginResponseDto
  ) {
    const result = await this.identitiesService.verifyIdentity(data.accessToken);

    if (result === "invalid-token") {
      throw new BadRequestException("Invalid token");
    }

    if (result === "no-identity") {
      throw new NotFoundException("Cannot find identity");
    }

    return result;
  }

  @Post('verify-password')
  async verifyPassword(
    @Body() data: VerifyPasswordDto
  ) {
    return await this.identitiesService.verifyPassword(data.identityId, data.password);
  }

  @Put('email-and-password')
  @Roles('all')
  async registerEmailAndPassword(
    @Body() data: RegisterWithEmailAndPasswordDto
  ) {
    const result = await this.identitiesService.registerWithEmailAndPassword(data.propertyId, data.details, data.email, data.password);

    if (result === "no-property") {
      throw new NotFoundException(`Cannot find property with id ${data.propertyId}`);
    }

    if (result === "existing-user") {
      throw new ConflictException("User already exists");
    }

    return result;
  }

  @Post('email-and-password')
  @Roles('all')
  async loginWithEmailAndPassword(
    @Body() data: LoginWithEmailAndPasswordDto
  ) {
    const result = await this.identitiesService.loginWithEmailAndPassword(data.propertyId, data.email, data.password);

    if (result === "no-property") {
      throw new NotFoundException(`Cannot find property with id ${data.propertyId}`);
    }

    if (result === "no-identity") {
      throw new NotFoundException("Cannot find identity");
    }
    
    if (result === "wrong-password") {
      throw new ForbiddenException("Password mismatch");
    }

    return result;
  }

  @Post('oauth/facebook')
  @Roles('all')
  async loginWithFacebook(
    @Body() { propertyId, accessToken, email, userDetails }: LoginWithOAuthDto
  ) {
    const result = await this.identitiesService.loginWithFacebook(propertyId, accessToken, email, userDetails);

    if (result === "invalid-token") {
      throw new ForbiddenException();
    }

    return result;
  }
}
