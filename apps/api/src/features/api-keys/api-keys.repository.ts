import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ApiKey } from "schemas/api-key.schema";

@Injectable()
export class ApiKeysRepository {
  constructor(
    @InjectModel(ApiKey.name) private readonly apiKeysModel: Model<ApiKey>,
  ) {}

  async getForOwner(ownerId: string) {
    return await this.apiKeysModel.find({ ownerId });
  }

  async getForOwnerWithHashedKey(ownerId: string) {
    return await this.apiKeysModel.find({ ownerId }).select("+hashedKey");
  }

  async create(ownerId: string, name: string, hashedKey: string) {
    return await this.apiKeysModel.create({ ownerId, name, hashedKey });
  }

  async delete(id: string) {
    await this.apiKeysModel.findOneAndDelete({ _id: id });
  }
}
