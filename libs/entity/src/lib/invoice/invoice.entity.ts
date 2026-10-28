import { Invoice, InvoiceCreate, InvoicePatch } from '@lv/common';
import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { InvoiceLineCreateEntity, InvoiceLineEntity, InvoiceLineSchema } from '../invoice-line/invoice-line.entity';
import { makeEntityEntry } from '../util/make-entity-entry';

@ObjectType()
@Schema({
	toJSON: {
		virtuals: true,
	},
	toObject: {
		virtuals: true
	}
})
export class InvoiceEntity implements Invoice {

	@Field()
	_id: string;

	@Field()
	@Prop()
	amount: number;

	@Field()
	@Prop()
	companyId: string;

	@Field()
	@Prop()
	createdOn: Date;

	@Field()
	@Prop()
	estimate: boolean;

	@Field()
	@Prop()
	execStart: Date;

	@Field()
	@Prop()
	execEnd: Date;

	/**
	 * InvoiceLineSchema in Prop decorator makes virtuals work on embedded entities.
	 */
	@Field(() => [InvoiceLineEntity])
	@Prop([InvoiceLineSchema])
	lines: InvoiceLineEntity[];

	@Field(() => [String])
	@Prop()
	missionIds: string[];

	@Field()
	@Prop()
	name: string;

	@Field({ nullable: true })
	@Prop()
	paid: boolean;

	@Field()
	@Prop()
	paymentLimit: Date;

	@Field()
	@Prop()
	sent: boolean;

	@Field({ nullable: true })
	@Prop()
	tax: boolean;

	@Field({ nullable: true })
	@Prop()
	taxMultiplier?: number;
}

@InputType()
export class InvoiceCreateEntity extends OmitType(
	InvoiceEntity,
	['_id', 'lines'],
	InputType
) implements InvoiceCreate {

	@Field(() => [InvoiceLineCreateEntity])
	lines: InvoiceLineCreateEntity[];
}

@InputType()
export class InvoicePatchEntity extends PartialType(
	InvoiceCreateEntity,
	InputType
) implements InvoicePatch {
	@Field()
	_id: string;
};

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);
export const InvoiceEntityEntry = makeEntityEntry(InvoiceEntity);
