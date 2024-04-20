import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<ClientModel>;

@Schema({ versionKey: false, timestamps: true })
export class ClientModel {
  @Prop({ required: true })
  uuid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  redirectUri: string;

  @Prop({ required: true })
  scope: string[];
}

export const ClientSchema = SchemaFactory.createForClass(ClientModel);
