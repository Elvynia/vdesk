import { Company, CompanyCreate, CompanyPatch } from '@lv/common';
import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class CompanyEntity implements Company {
	@Field()
	_id: string;

	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	identifier: string;

	@Field({ nullable: true })
	@Prop()
	shortName?: string;

	@Field({ nullable: true })
	@Prop()
	taxNumber?: string;

	@Field()
	@Prop()
	trigram: string;

	@Field()
	@Prop()
	typeId: string;

	@Field({ nullable: true })
	@Prop()
	addressId?: string;
}

@InputType()
export class CompanyCreateEntity extends OmitType(
	CompanyEntity,
	['_id'],
	InputType
) implements CompanyCreate { }

@InputType()
export class CompanyPatchEntity extends PartialType(
	CompanyCreateEntity,
	InputType
) implements CompanyPatch {
	@Field()
	_id: string;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
