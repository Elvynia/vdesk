import { CompanyType, CompanyTypeCreate, CompanyTypePatch } from '@lv/common';
import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
export class CompanyTypeCreateEntity extends OmitType(
	CompanyTypeEntity,
	['_id'],
	InputType
) implements CompanyTypeCreate { }

@InputType()
export class CompanyTypePatchEntity extends PartialType(
	CompanyTypeEntity,
	InputType
) implements CompanyTypePatch {
	@Field()
	override _id: string;
}

export const CompanyTypeSchema =
	SchemaFactory.createForClass(CompanyTypeEntity);
