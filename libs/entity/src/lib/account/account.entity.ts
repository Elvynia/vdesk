import { Account } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@InputType('AccountInput')
@ObjectType()
@Schema()
export class AccountEntity implements Account {
	@Field((_) => String)
	_id: string;

	@Field({ nullable: true })
	@Prop()
	creationDate: string;

	@Field()
	@Prop()
	password?: string;

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
}

@InputType('AccountCreate')
export class AccountCreate {

	@Field()
	password?: string;

	@Field({ nullable: true })
	email: string;

	@Field({ nullable: true })
	username: string;
}

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
