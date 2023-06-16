import { IIdentity, WithId } from "@bitmetro/identity";
import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PropertyDto } from "dtos";
import { AuthGuard } from "features/auth/auth.guard";
import { Principal } from "features/auth/principal.decorator";
import { Roles } from "features/auth/roles.decorator";
import { PropertiesService } from "features/properties/properties.service";

@Controller('properties')
@UseGuards(AuthGuard)
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
  ) {}

  @Post()
  @Roles('dashboard-user')
  async create(
    @Principal() user: WithId<IIdentity>,
    @Body() property: PropertyDto,
  ) {
    const res = await this.propertiesService.create(user._id, property);

    if (res === "exists") {
      throw new ConflictException(`Property with unique ID '${property.uniqueId}' already exists`);
    }

    return res;
  }

  @Get('by-unique-id/:id')
  @Roles('all')
  async getByUniqueId(
    @Param('id') uniqueId: string
  ) {
    return await this.propertiesService.getByUniqueId(uniqueId);
  }

  @Get('by-owner-id')
  @Roles('dashboard-user')
  async getByOwnerId(
    @Principal() user: WithId<IIdentity>,
  ) {
    return await this.propertiesService.getByOwnerId(user._id);
  }

  @Get('with-credentials/:id')
  async getByIdWithCredentials(
    @Param('id') id: string
  ) {
    return await this.propertiesService.getByIdWithCredentials(id);
  }

  @Get(':id')
  @Roles('all')
  async getById(
    @Param('id') id: string
  ) {
    return await this.propertiesService.getById(id);
  }

  @Patch(':id')
  @Roles('dashboard-user')
  async update(
    @Param('id') id: string,
    @Body() property: PropertyDto,
  ) {
    const res = await this.propertiesService.update(id, property);

    if (res === "exists") {
      throw new ConflictException(`Property with unique ID '${property.uniqueId}' already exists`);
    }

    return res;
  }

  @Delete(':id')
  @Roles('dashboard-user')
  async delete(
    @Param('id') id: string
  ) {
    await this.propertiesService.delete(id);    
  }
}
