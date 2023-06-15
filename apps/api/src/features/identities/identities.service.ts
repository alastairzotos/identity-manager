import { IIdentity, ILoginResponseDto, IUserDetail } from "@bitmetro/identity";
import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

import { IdentitiesRepository } from "features/identities/identities.repository";
import { Identity } from "schemas/identity.schema";
import { EnvironmentService } from "environment/environment.service";
import { PropertiesService } from "features/properties/properties.service";
import { mapRecord } from "utils/misc";
import { Document } from "mongoose";
import { CryptoService } from "features/crypto/crypto.service";
import { ApiKeysService } from "features/api-keys/api-keys.services";

@Injectable()
export class IdentitiesService {
  constructor(
    private readonly envService: EnvironmentService,
    private readonly propertiesService: PropertiesService,
    private readonly cryptoService: CryptoService,
    private readonly apiKeysService: ApiKeysService,
    private readonly identitiesRepo: IdentitiesRepository,
  ) { }

  async verifyIdentity(accessToken: string): Promise<IIdentity | "invalid-token" | "no-identity"> {
    let payload: IIdentity;

    try {
      payload = jwt.verify(
        accessToken,
        this.envService.get().jwtSigningKey,
      ) as IIdentity;
    } catch {
      return "invalid-token";
    }

    const identity = await this.identitiesRepo.getByEmail(payload.propertyId, payload.email);

    if (!identity) {
      return "no-identity";
    }

    return identity;
  }

  async verifyPassword(identityId: string, password: string) {
    const identity = await this.identitiesRepo.getByIdWithPassword(identityId);

    if (!identity) {
      return false;
    }

    return await this.cryptoService.comparePasswords(password, identity.hashedPassword);
  }

  async registerWithEmailAndPassword(propertyId: string, details: IIdentity['details'], email: string, password: string): Promise<ILoginResponseDto | "no-property" | "existing-user"> {
    const property = await this.propertiesService.getById(propertyId);

    if (!property) {
      return "no-property";
    }

    const hashedPassword = await this.cryptoService.hashPassword(password);

    const identity = await this.identitiesRepo.getByEmail(propertyId, email);

    if (!!identity) {
      return "existing-user";
    }

    const created = await this.identitiesRepo.create({
      propertyId,
      data: property.defaultUserData,
      details: mapRecord(details as Record<IUserDetail, string>, (value) => value.trim()),
      email,
      hashedPassword
    });

    return {
      accessToken: this.generateAccessToken(created)
    }
  }

  async loginWithEmailAndPassword(propertyId: string, email: string, password: string): Promise<ILoginResponseDto | "no-property" | "no-identity" | "wrong-password"> {
    const property = await this.propertiesService.getById(propertyId);

    if (!property) {
      return "no-property";
    }

    const identity = await this.identitiesRepo.getByEmailWithPassword(propertyId, email);

    if (!identity) {
      return "no-identity";
    }

    const pwCheck = await this.cryptoService.comparePasswords(password, identity.hashedPassword);

    if (!pwCheck) {
      return "wrong-password";
    }

    return {
      accessToken: this.generateAccessToken(identity)
    }
  }

  async getIdentityForApiKey(key: string): Promise<IIdentity | null> {
    const identities = await this.identitiesRepo.getAll();

    for (const identity of identities.map(id => id.toObject())) {
      const apiKey = await this.apiKeysService.matchKeyToOwner(identity._id.toString(), key);

      if (!!apiKey) {
        return identity;
      }
    }

    return null;
  }

  async getById(id: string) {
    await this.identitiesRepo.getById(id);
  }

  async update(id: string, identity: Partial<IIdentity>) {
    return await this.identitiesRepo.update(id, identity);
  }

  async delete(id: string) {
    return this.identitiesRepo.delete(id);
  }

  async deleteForPropertyId(propertyId: string) {
    await this.identitiesRepo.deleteForPropertyId(propertyId);
  }

  private generateAccessToken(identity: Document<unknown, {}, Identity>) {
    return jwt.sign(
      identity.toObject(),
      this.envService.get().jwtSigningKey,
    );
  }
}
