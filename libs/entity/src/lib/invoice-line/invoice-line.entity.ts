import { InvoiceLine } from "@lv/common";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { ChunkEntity } from "../chunk/chunk.entity";

@InputType('InvoiceLineInput')
@ObjectType()
@Schema({
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	}
})
export class InvoiceLineEntity implements InvoiceLine {

	@Field({ defaultValue: 1 })
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

	@Field()
	@Virtual({
		get: function (this: InvoiceLineEntity) {
			return (this.count || 1) * (this.price || 0);
		}
	})
	total: number;
}

@InputType('InvoiceLineInputSave')
export class InvoiceLineEntitySave {

	@Field({ defaultValue: 1 })
	@Prop()
	count: number;

	@Field()
	@Prop()
	desc: string;

	@Field()
	@Prop()
	price: number;

	@Field(() => [String])
	@Prop({ type: () => [String], ref: () => [ChunkEntity] })
	chunkIds: string[];

}

export const InvoiceLineSchema = SchemaFactory.createForClass(InvoiceLineEntity);
