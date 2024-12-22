import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { EntityId } from '../entity/entity.type';

@InputType("AddressInput")
@ObjectType()
@Schema()
export class Address implements EntityId {
	@Field(_ => String)
	_id: ObjectId;

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
