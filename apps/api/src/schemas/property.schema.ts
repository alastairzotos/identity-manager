import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IFormTheme, ILoginMode, IProperty, IPropertyCredentials, IUserDetail } from "@bitmetro/identity"

@Schema({ collection: 'properties' })
export class Property implements IProperty {
  @Prop({ type: String })
  ownerId?: string;

  @Prop({ type: String, trim: true })
  name: string;

  @Prop({ type: String, trim: true, unique: true })
  uniqueId: string;

  @Prop({ type: Array })
  userDetails: IUserDetail[];

  @Prop({ type: Object })
  defaultUserData?: any;

  @Prop({ type: Array })
  loginModes: ILoginMode[];

  @Prop({ type: String })
  formTheme: IFormTheme;

  @Prop({ type: String })
  logo: string;
  
  @Prop({ type: Object })
  credentials?: IPropertyCredentials;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
