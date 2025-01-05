import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@InputType('AccountInput')
@ObjectType()
@Schema()
export class Account {
	@Field((_) => String)
	_id: ObjectId;
	id: string;

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
	creationDate: string;

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

export const AccountSchema = SchemaFactory.createForClass(Account);
