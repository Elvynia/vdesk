import { InvoiceLine } from "@lv/common";
import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";

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

	@Field()
	@Prop({ default: 1 })
	count: number;

	@Field()
	@Prop()
	desc: string;

	@Field()
	@Prop()
	price: number;

	@Field(() => [String])
	@Prop([String])
	chunkIds: string[];

	@Field()
	@Virtual({
		get: function (this: InvoiceLineEntity) {
			console.log('debug: line', this.count, this.price)
			return (this.count || 1) * (this.price || 0);
		}
	})
	total: number;
}

@InputType()
export class InvoiceLineCreateEntity extends OmitType(
	InvoiceLineEntity,
	['total'],
	InputType
) { }

export const InvoiceLineSchema = SchemaFactory.createForClass(InvoiceLineEntity);
