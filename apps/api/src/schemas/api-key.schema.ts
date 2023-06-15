import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IApiKeySchema } from "@bitmetro/dashboard-models";

@Schema({ collection: 'apiKeys', timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })
export class ApiKey implements IApiKeySchema {
  @Prop({ type: String })
  ownerId: string;

  @Prop({ type: String, trim: true })
  name: string;

  @Prop({ type: String, select: false })
  hashedKey?: string;

  @Prop({ type: Date })
  createdOn: Date;

  @Prop({ type: Date })
  updatedOn: Date;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
