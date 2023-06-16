import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentModule } from 'environment/environment.module';
import { EnvironmentService } from 'environment/environment.service';
import { ApiKeysModule } from 'features/api-keys/api-keys.module';
import { AuthModule } from 'features/auth/auth.module';
import { CryptoModule } from 'features/crypto/crypto.module';
import { HealthModule } from 'features/health/health.module';
import { FacebookOAuthModule } from 'integrations/facebook-oauth/facebook-oauth.module';
import { IdentitiesModule } from 'features/identities/identities.module';
import { PropertiesModule } from 'features/properties/properties.module';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    NestConfigModule.forRoot(),
    EnvironmentModule,
    HealthModule,
    PropertiesModule,
    IdentitiesModule,
    AuthModule,
    CryptoModule,
    ApiKeysModule,
    FacebookOAuthModule,
    MongooseModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: async (envService: EnvironmentService) => ({
        uri: envService.get().dbConnectionString,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    }
  ]
})
export class AppModule { }
