import { Chunk, ChunkCreate, ChunkPatch } from '@lv/common';
import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

	@Field({ nullable: true })
	@Prop()
	desc?: string;

	@Field()
	@Prop({ default: false })
	invoiced: boolean;

	@Field()
	@Prop({ default: false })
	paid: boolean;

	@Field()
	@Prop()
	missionId: string;
}

@InputType()
export class ChunkCreateEntity extends OmitType(
	ChunkEntity,
	['_id', 'invoiced', 'paid'],
	InputType
) implements ChunkCreate { }

@InputType()
export class ChunkPatchEntity extends PartialType(
	ChunkEntity,
	InputType
) implements ChunkPatch {
	@Field()
	override _id: string;
}

export const ChunkSchema = SchemaFactory.createForClass(ChunkEntity);
