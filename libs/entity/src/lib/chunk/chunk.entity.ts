import { Chunk } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@InputType('ChunkInput')
@ObjectType()
@Schema()
export class ChunkEntity implements Chunk {
	@Field()
	_id: string;

	@Field()
	@Prop()
	count: number;

	@Field()
	@Prop()
	date: Date;

	@Field()
	@Prop()
	desc: string;

	@Field()
	@Prop()
	invoiced: boolean;

	@Field()
	@Prop()
	paid: boolean;
}

@InputType()
export class ChunkCreate {
	@Field()
	@Prop()
	count: number;

	@Field()
	@Prop()
	date: Date;

	@Field()
	@Prop()
	desc: string;

	@Field()
	@Prop()
	invoiced: boolean;

	@Field()
	@Prop()
	paid: boolean;
}

@InputType()
export class ChunkUpdate {
	@Field()
	_id: string;

	@Field()
	@Prop()
	count: number;

	@Field()
	@Prop()
	date: Date;

	@Field()
	@Prop()
	desc: string;

	@Field()
	@Prop()
	invoiced: boolean;

	@Field()
	@Prop()
	paid: boolean;
}

export const ChunkSchema = SchemaFactory.createForClass(ChunkEntity);
