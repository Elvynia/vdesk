import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";

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
}
