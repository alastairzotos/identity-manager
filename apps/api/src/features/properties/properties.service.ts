import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { PropertiesRepository } from "features/properties/properties.repository";
import { IProperty, WithId } from "@bitmetro/identity"
import { IdentitiesService } from "features/identities/identities.service";

@Injectable()
export class PropertiesService {
  constructor(
    @Inject(forwardRef(() => IdentitiesService))
    private readonly identitiesService: IdentitiesService,
    private readonly propertiesRepo: PropertiesRepository,
  ) { }

  async create(ownerId: string, property: IProperty): Promise<WithId<IProperty> | "exists"> {
    try {
      return (await this.propertiesRepo.create({
        ...property,
        ownerId,
      })).toObject();
    } catch (e) {
      if (e.keyPattern.uniqueId === 1) {
        return "exists"
      }
    }
  }

  async getByUniqueId(name: string) {
    return await this.propertiesRepo.getByUniqueId(name.trim());
  }

  async getById(id: string) {
    return await this.propertiesRepo.getById(id);
  }

  async getByOwnerId(ownerId: string) {
    return await this.propertiesRepo.getByOwnerId(ownerId);
  }

  async update(id: string, property: Partial<IProperty>): Promise<WithId<IProperty> | "exists"> {
    // Update connected identities

    try {
      return (await this.propertiesRepo.update(id, property)).toObject();
    } catch (e) {
      if (e.keyPattern.uniqueId === 1) {
        return "exists"
      }
    }
  }

  async delete(id: string) {
    await this.identitiesService.deleteForPropertyId(id);
    await this.propertiesRepo.delete(id);
  }
}
