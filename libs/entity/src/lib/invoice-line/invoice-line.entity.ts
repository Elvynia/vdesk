import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, Virtual } from "@nestjs/mongoose";
import { ChunkEntity } from "../chunk/chunk.entity";

@InputType('InvoiceLineInput')
@ObjectType()
@Schema()
export class InvoiceLineEntity {

	@Field({ nullable: true })
	@Prop()
	count: number;

	@Field()
	@Prop()
	desc: string;

	@Field()
	@Prop()
	price: number;

	@Field(() => [ChunkEntity], { defaultValue: [] })
	@Virtual()
	chunks?: ChunkEntity[];

	@Field(() => [String])
	@Prop({ type: () => [String], ref: () => [ChunkEntity] })
	chunkIds: string[];
}
