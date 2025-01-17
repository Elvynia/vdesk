import { Role } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@InputType('RoleInput')
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
export class RoleCreate {
	@Field()
	@Prop()
	name: string;
}

@InputType()
export class RoleUpdate {
	@Field()
	_id: string;

	@Field()
	@Prop()
	name: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
