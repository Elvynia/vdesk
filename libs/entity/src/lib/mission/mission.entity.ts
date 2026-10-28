import { Mission } from '@lv/common';
import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { makeEntityEntry } from '../util/make-entity-entry';

@ObjectType()
@Schema()
export class MissionEntity implements Mission {
	@Field()
	_id: string;

	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	rate: number;

	@Field()
	@Prop({ default: false })
	byDay: boolean;

	@Field({ nullable: true })
	@Prop({ default: 7 })
	dayLength?: number;

	@Field({ nullable: true })
	@Prop()
	start?: Date;

	@Field({ nullable: true })
	@Prop()
	end?: Date;

	@Field({ nullable: true })
	@Prop()
	desc?: string;

	@Field()
	@Prop()
	companyId: string;

}

@InputType()
export class MissionCreateEntity extends OmitType(
	MissionEntity,
	['_id'],
	InputType
) { }

@InputType()
export class MissionPatchEntity extends PartialType(
	MissionCreateEntity,
	InputType
) {

	@Field()
	_id: string;
}

export const MissionSchema = SchemaFactory.createForClass(MissionEntity);
export const MissionEntityEntry = makeEntityEntry(MissionEntity);
