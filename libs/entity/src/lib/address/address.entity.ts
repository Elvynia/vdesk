import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@InputType("AddressInput")
@ObjectType()
@Schema()
export class Address {
	@Field(_ => String)
	_id: ObjectId;
	id: string;

	@Field()
	@Prop()
	city: string;

	@Field({ nullable: true })
	@Prop()
	firstname: string;

	@Field()
	@Prop()
	lastname: string;

	@Field()
	@Prop()
	line1: string;

	@Field({ nullable: true })
	@Prop()
	line2: string;

	@Field({ nullable: true })
	@Prop()
	siren: string;

	@Field()
	@Prop()
	zip: string;

}
export const AddressSchema = SchemaFactory.createForClass(Address);
