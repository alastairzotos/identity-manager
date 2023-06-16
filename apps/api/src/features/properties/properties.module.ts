import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EnvironmentModule } from "environment/environment.module";
import { AuthModule } from "features/auth/auth.module";
import { CryptoModule } from "features/crypto/crypto.module";
import { IdentitiesModule } from "features/identities/identities.module";
import { PropertiesController } from "features/properties/properties.controller";
import { PropertiesRepository } from "features/properties/properties.repository";
import { PropertiesService } from "features/properties/properties.service";
import { Property, PropertySchema } from "schemas/property.schema";

@Module({
  imports: [
    EnvironmentModule,
    forwardRef(() => AuthModule),
    forwardRef(() => IdentitiesModule),
    CryptoModule,
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
    ])
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, PropertiesRepository],
  exports: [PropertiesService],
})
export class PropertiesModule { }
