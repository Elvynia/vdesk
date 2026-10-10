import { Address } from '@lv/common';
import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class AddressEntity implements Address {
	@Field()
	_id: string;

	@Field()
	@Prop()
	city: string;

	@Field({ nullable: true })
	@Prop()
	firstname?: string;

	@Field()
	@Prop()
	lastname: string;

	@Field()
	@Prop()
	line1: string;

	@Field({ nullable: true })
	@Prop()
	line2?: string;

	@Field()
	@Prop()
	zip: string;
}

@InputType()
export class AddressCreateEntity extends OmitType(
	AddressEntity,
	['_id'],
	InputType
) { }

@InputType()
export class AddressPatchEntity extends PartialType(
	AddressEntity,
	InputType
) {
	@Field()
	override _id: string;
}

export const AddressSchema = SchemaFactory.createForClass(AddressEntity);
