import { Role } from '@lv/common';
import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class RoleEntity implements Role {
	@Field()
	_id: string;

	@Field()
	@Prop()
	name: string;
}

@InputType()
export class RoleCreateEntity extends OmitType(
	RoleEntity,
	['_id'],
	InputType
) { }

@InputType()
export class RolePatchEntity extends OmitType(
	RoleEntity,
	['_id'],
	InputType
) {
	@Field()
	_id: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
