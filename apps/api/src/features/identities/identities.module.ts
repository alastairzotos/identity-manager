import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EnvironmentModule } from "environment/environment.module";
import { ApiKeysModule } from "features/api-keys/api-keys.module";
import { CryptoModule } from "features/crypto/crypto.module";
import { IdentitiesController } from "features/identities/identities.controller";
import { IdentitiesRepository } from "features/identities/identities.repository";
import { IdentitiesService } from "features/identities/identities.service";
import { PropertiesModule } from "features/properties/properties.module";
import { FacebookOAuthModule } from "integrations/facebook-oauth/facebook-oauth.module";
import { GoogleOAuthModule } from "integrations/google-oauth/google-oauth.module";
import { Identity, IdentitySchema } from "schemas/identity.schema";

@Module({
  imports: [
    EnvironmentModule,
    forwardRef(() => PropertiesModule),
    CryptoModule,
    forwardRef(() => ApiKeysModule),
    FacebookOAuthModule,
    GoogleOAuthModule,
    MongooseModule.forFeature([
      { name: Identity.name, schema: IdentitySchema },
    ])
  ],
  controllers: [IdentitiesController],
  providers: [IdentitiesService, IdentitiesRepository],
  exports: [IdentitiesService],
})
export class IdentitiesModule {}
