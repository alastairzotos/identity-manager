import { IIdentity } from "@bitmetro/identity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Identity } from "schemas/identity.schema";

@Injectable()
export class IdentitiesRepository {
  constructor(
    @InjectModel(Identity.name) private readonly identityModel: Model<Identity>,
  ) {}

  async create(identity: IIdentity) {
    return await this.identityModel.create(identity);
  }

  async getAll() {
    return await this.identityModel.find();
  }

  async getById(id: string) {
    return await this.identityModel.findById(id);
  }

  async getByIdWithPassword(id: string) {
    return await this.identityModel.findById(id).select("+hashedPassword");
  }

  async getByEmail(propertyId: string, email: string) {
    return await this.identityModel.findOne({ propertyId, email, })
  }

  async getByEmailWithPassword(propertyId: string, email: string) {
    return await this.identityModel.findOne({ propertyId, email }).select('+hashedPassword')
  }

  async update(id: string, identity: Partial<IIdentity>) {
    return await this.identityModel.findOneAndUpdate({ _id: id }, identity, { new: true });
  }

  async delete(id: string) {
    return this.identityModel.deleteOne({ _id: id });
  }

  async deleteForPropertyId(propertyId: string) {
    await this.identityModel.deleteMany({ propertyId });
  }
}
