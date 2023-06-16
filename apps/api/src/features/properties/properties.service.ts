import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { PropertiesRepository } from "features/properties/properties.repository";
import { IProperty, IPropertyCredentials, WithId } from "@bitmetro/identity"
import { IdentitiesService } from "features/identities/identities.service";
import { CryptoService } from "features/crypto/crypto.service";

@Injectable()
export class PropertiesService {
  constructor(
    @Inject(forwardRef(() => IdentitiesService))
    private readonly identitiesService: IdentitiesService,
    private readonly cryptoService: CryptoService,
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

  async getByIdWithCredentials(id: string): Promise<IProperty> {
    const property = (await this.propertiesRepo.getById(id)).toObject();

    return this.withDecyrptedCredentials(property);
  }

  async getByOwnerId(ownerId: string) {
    return await this.propertiesRepo.getByOwnerId(ownerId);
  }

  async update(id: string, property: Partial<IProperty>): Promise<WithId<IProperty> | "exists"> {
    // Update connected identities

    try {
      return (await this.propertiesRepo.update(id, this.withEncyrptedCredentials(property))).toObject();
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

  private withEncyrptedCredentials(property: Partial<IProperty>): Partial<IProperty> {
    const creds = property.credentials;

    const encryptedCredentials = creds ?
      {
        ...creds,
        fbAppSecret: creds.fbAppId ? this.cryptoService.encrypt(creds.fbAppSecret) : undefined,
        googleClientSecret: creds.googleClientSecret ? this.cryptoService.encrypt(creds.googleClientSecret) : undefined,
      } as IPropertyCredentials
      : undefined;

    return { ...property, credentials: encryptedCredentials };
  }

  private withDecyrptedCredentials(property: IProperty): IProperty {
    const creds = property.credentials;

    const decryptedCredentials = creds ?
      {
        ...creds,
        fbAppSecret: creds.fbAppId ? this.cryptoService.decrypt(creds.fbAppSecret) : undefined,
        googleClientSecret: creds.googleClientSecret ? this.cryptoService.decrypt(creds.googleClientSecret) : undefined,
      } as IPropertyCredentials
      : undefined;

    return { ...property, credentials: decryptedCredentials };
  }
}
