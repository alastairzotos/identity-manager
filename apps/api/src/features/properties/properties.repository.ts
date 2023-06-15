import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IProperty } from "@bitmetro/identity"
import { Model } from "mongoose";
import { Property } from "schemas/property.schema";

@Injectable()
export class PropertiesRepository {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<Property>,
  ) {}

  async create(property: IProperty) {
    return await this.propertyModel.create(property);
  }

  async getById(id: string) {
    return await this.propertyModel.findById(id);
  }

  async getByUniqueId(uniqueId: string) {
    return await this.propertyModel.findOne({ uniqueId });
  }

  async getByOwnerId(ownerId: string){ 
    return await this.propertyModel.find({ ownerId });
  }

  async update(id: string, property: Partial<IProperty>) {
    return await this.propertyModel.findOneAndUpdate({ _id: id }, property, { new: true });
  }

  async delete(id: string) {
    await this.propertyModel.deleteOne({ _id: id });
  }
}
