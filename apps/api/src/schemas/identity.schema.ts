import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IIdentity, IUserDetail } from "@bitmetro/identity";

@Schema({ collection: 'identities', timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })
export class Identity implements IIdentity<Object> {
  @Prop({ type: Object })
  details: Record<IUserDetail, string>;

  @Prop({ type: Object })
  data?: Object;

  @Prop()
  propertyId: string;

  @Prop({ type: String, trim: true })
  email?: string;

  @Prop({ type: String, trim: true })
  username?: string;

  @Prop({ type: String, select: false })
  hashedPassword?: string;

  @Prop({ type: Date })
  createdOn: Date;

  @Prop({ type: Date })
  updatedOn: Date;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);
