import { Account } from '@lv/common';
import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

	@Field()
	@Prop({ type: String })
	roleId: string;
}

@InputType()
export class AccountCreateEntity extends PickType(
	AccountEntity,
	['username', 'password', 'email', 'enabled', 'creationDate', 'roleId'],
	InputType
) { }

@InputType()
export class AccountPatchEntity extends PartialType(
	AccountEntity,
	InputType
) {
	@Field()
	override _id: string;
}

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
