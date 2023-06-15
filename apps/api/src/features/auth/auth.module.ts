import { Module } from '@nestjs/common';
import { EnvironmentModule } from 'environment/environment.module';

import { AuthGuard } from 'features/auth/auth.guard';
import { IdentitiesModule } from 'features/identities/identities.module';

@Module({
  imports: [EnvironmentModule, IdentitiesModule],
  providers: [AuthGuard],
  exports: [IdentitiesModule, AuthGuard],
  controllers: [],
})
export class AuthModule {}
