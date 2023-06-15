import { IIdentity, WithId } from "@bitmetro/identity";
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateApiKeyDto } from "dtos";
import { ApiKeysService } from "features/api-keys/api-keys.services";
import { AuthGuard } from "features/auth/auth.guard";
import { Principal } from "features/auth/principal.decorator";

@Controller('api-keys')
@UseGuards(AuthGuard)
export class ApiKeysController {
  constructor(
    private readonly apiKeysService: ApiKeysService,
  ) {}

  @Get()
  async getForOwner(
    @Principal() user: WithId<IIdentity>
  ) {
    return await this.apiKeysService.getForOwner(user._id);
  }

  @Post()
  async create(
    @Principal() user: WithId<IIdentity>,
    @Body() { name }: CreateApiKeyDto
  ) {
    return await this.apiKeysService.create(user._id, name);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ) {
    return await this.apiKeysService.delete(id);
  }
}
