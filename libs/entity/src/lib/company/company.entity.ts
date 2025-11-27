import { Company } from '@lv/common';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';

import { CompanyTypeEntity } from '../company-type/company-type.entity';

import { AddressEntity } from '../address/address.entity';
import { MissionEntity } from '../mission/mission.entity';

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

	@Field(() => Int, { nullable: true })
	@Virtual()
	invoiceCount?: number;

	@Field({ nullable: true })
	@Prop()
	taxNumber?: string;

	@Field()
	@Prop()
	trigram: string;

	@Field(() => CompanyTypeEntity)
	@Prop({ type: () => String, ref: () => CompanyTypeEntity })
	type: CompanyTypeEntity;

	// FIXME: Add addressId and make address virtual ?
	@Field(() => AddressEntity, { nullable: true })
	@Prop({ type: () => String, ref: () => AddressEntity })
	address?: AddressEntity;

	@Field(() => [MissionEntity], { defaultValue: [] })
	@Virtual()
	missions: MissionEntity[];
}

@InputType()
export class CompanyCreate {
	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	identifier: string;

	@Field({ nullable: true })
	@Prop()
	taxNumber?: string;

	@Field()
	@Prop()
	trigram: string;

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

	@Field({ nullable: true })
	@Prop()
	taxNumber?: string;

	@Field()
	@Prop()
	trigram: string;

	@Field()
	@Prop()
	type: string;

	@Field({ nullable: true })
	@Prop()
	address?: string;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
