import { ICreatedApiKeyDto, IGetApiKeyDto } from "@bitmetro/dashboard-models";
import { Injectable } from "@nestjs/common";
import { ApiKeysRepository } from "features/api-keys/api-keys.repository";
import { CryptoService } from "features/crypto/crypto.service";

@Injectable()
export class ApiKeysService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly apiKeysRepo: ApiKeysRepository,
  ) { }

  async getForOwner(ownerId: string): Promise<IGetApiKeyDto[]> {
    return (await this.apiKeysRepo.getForOwner(ownerId)).map(k => k.toObject());
  }

  async matchKeyToOwner(ownerId: string, key: string) {
    const apiKeysForOwner = await this.apiKeysRepo.getForOwnerWithHashedKey(ownerId);

    for (const apiKey of apiKeysForOwner) {
      if (await this.cryptoService.comparePasswords(key, apiKey.hashedKey)) {
        return apiKey;
      }
    }

    return null;
  }

  async create(ownerId: string, name: string): Promise<ICreatedApiKeyDto> {
    const key = `bmid_${this.cryptoService.randomHex(32)}`;
    const hashedKey = await this.cryptoService.hashPassword(key);

    const { _id } = await this.apiKeysRepo.create(ownerId, name, hashedKey);

    return {
      _id: _id.toString(),
      ownerId,
      name,
      key,
    }
  }

  async delete(id: string) {
    return await this.apiKeysRepo.delete(id);
  }
}
