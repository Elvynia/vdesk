import { CompanyType } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@InputType('CompanyTypeInput')
@ObjectType()
@Schema()
export class CompanyTypeEntity implements CompanyType {
	@Field()
	_id: string;

	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	identifierLabel: string;

	@Field()
	@Prop()
	currency: string;
}

@InputType()
export class CompanyTypeCreateEntity {
	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	identifierLabel: string;

	@Field()
	@Prop()
	currency: string;
}

@InputType()
export class CompanyTypeUpdateEntity {
	@Field()
	_id: string;

	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	identifierLabel: string;

	@Field()
	@Prop()
	currency: string;
}

export const CompanyTypeSchema =
	SchemaFactory.createForClass(CompanyTypeEntity);
