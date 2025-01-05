import { Account } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Entity } from '../entity.type';

@InputType('AccountInput')
@ObjectType()
@Schema()
export class AccountEntity extends Entity implements Account {
	@Field((_) => String)
	_id: ObjectId;

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

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
