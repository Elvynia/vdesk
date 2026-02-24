import { Invoice } from '@lv/common';
import { Field, InputType, IntersectionType, ObjectType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { CompanyEntity } from '../company/company.entity';
import { InvoiceLineEntity, InvoiceLineEntitySave, InvoiceLineSchema } from '../invoice-line/invoice-line.entity';
import { MissionEntity } from '../mission/mission.entity';
import { makeEntityEntry } from '../util/make-entity-entry';

@InputType('InvoiceInput')
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

	@Field(() => CompanyEntity, { nullable: true })
	@Virtual({
		options: {
			foreignField: '_id',
			localField: 'companyId',
			justOne: true,
			ref: () => CompanyEntity
		}
	})
	company?: CompanyEntity;

	@Field(() => String)
	@Prop({ type: () => String, ref: () => CompanyEntity })
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

	@Field(() => [InvoiceLineEntity])
	@Prop([InvoiceLineSchema])
	lines: InvoiceLineEntity[];

	@Field(() => [MissionEntity], { defaultValue: [] })
	@Virtual()
	missions?: MissionEntity[];

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
export class InvoiceCreateEntity {

	@Field()
	amount: number;

	@Field(() => String)
	@Prop({ type: () => String, ref: () => CompanyEntity })
	companyId: string;

	@Field()
	createdOn: Date;

	@Field()
	estimate: boolean;

	@Field()
	execStart: Date;

	@Field()
	execEnd: Date;

	@Field(() => [InvoiceLineEntitySave])
	lines: InvoiceLineEntitySave[];

	@Field(() => [String])
	missionIds: string[];

	@Field()
	name: string;

	@Field({ nullable: true })
	paid: boolean;

	@Field()
	paymentLimit: Date;

	@Field()
	sent: boolean;

	@Field({ nullable: true })
	tax: boolean;

	@Field({ nullable: true })
	taxMultiplier?: number;
}

@InputType()
export class InvoiceUpdateEntity {
	@Field()
	_id: string;

	@Field()
	amount: number;

	@Field(() => String)
	companyId: string;

	@Field()
	createdOn: Date;

	@Field()
	estimate: boolean;

	@Field()
	execStart: Date;

	@Field()
	execEnd: Date;

	@Field(() => [InvoiceLineEntitySave])
	lines: InvoiceLineEntitySave[];

	@Field(() => [String])
	missionIds: string[];

	@Field()
	name: string;

	@Field({ nullable: true })
	paid: boolean;

	@Field()
	paymentLimit: Date;

	@Field()
	sent: boolean;

	@Field({ nullable: true })
	tax: boolean;

	@Field({ nullable: true })
	taxMultiplier?: number;
}

@InputType()
export class InvoicePatchEntity extends IntersectionType(
	PickType(InvoiceUpdateEntity, ['_id'] as const),
	PartialType(OmitType(InvoiceUpdateEntity, ['_id'] as const))
) { };

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);
export const InvoiceEntityEntry = makeEntityEntry(InvoiceEntity);
