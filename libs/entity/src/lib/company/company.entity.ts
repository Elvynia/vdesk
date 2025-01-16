import { Company } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CompanyTypeEntity } from '../company-type/company-type.entity';

import { AddressEntity } from '../address/address.entity';

@InputType('CompanyInput')
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

	@Field(() => CompanyTypeEntity)
	@Prop({ type: String, ref: CompanyTypeEntity.name })
	@Prop()
	type: CompanyTypeEntity;

	@Field(() => AddressEntity, { nullable: true })
	@Prop({ type: String, ref: AddressEntity.name })
	@Prop()
	address?: AddressEntity;
}

@InputType()
export class CompanyCreate {
	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	identifier: string;

	@Field()
	@Prop()
	type: string;

	@Field({ nullable: true })
	@Prop()
	address?: string;
}

@InputType()
export class CompanyUpdate {
	@Field()
	_id: string;

	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	identifier: string;

	@Field()
	@Prop()
	type: string;

	@Field({ nullable: true })
	@Prop()
	address?: string;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
