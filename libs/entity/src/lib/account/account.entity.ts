import { Account } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleEntity } from '../role/role.entity';

@InputType('AccountInput')
@ObjectType()
@Schema()
export class AccountEntity implements Account {
	@Field()
	_id: string;

	@Field({ nullable: true })
	@Prop()
	creationDate: string;

	@Field()
	@Prop()
	password: string;

	@Field({ nullable: true })
	@Prop()
	email: string;

	@Field({ nullable: true })
	@Prop()
	username: string;

	@Field({ nullable: true })
	@Prop()
	lastLogon: string;

	@Field({ nullable: true })
	@Prop()
	enabled: boolean;

	@Field({ nullable: true })
	@Prop()
	verified: boolean;

	@Field(() => RoleEntity)
	@Prop({ type: String, ref: RoleEntity.name })
	role: RoleEntity;
}

@InputType()
export class AccountCreate {

	@Field({ nullable: true })
	creationDate: string;

	@Field({ nullable: true })
	email: string;

	@Field({ nullable: true })
	enabled: boolean;

	@Field()
	password: string;

	@Field()
	role: string;

	@Field()
	username: string;
}

@InputType()
export class AccountUpdate {
	@Field()
	_id: string;

	@Field({ nullable: true })
	email: string;

	@Field({ nullable: true })
	enabled: boolean;

	@Field()
	role: string;
}

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
