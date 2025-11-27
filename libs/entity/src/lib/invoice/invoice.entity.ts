import { Invoice } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { CompanyEntity } from '../company/company.entity';
import { InvoiceLineEntity, InvoiceLineEntitySave, InvoiceLineSchema } from '../invoice-line/invoice-line.entity';
import { MissionEntity } from '../mission/mission.entity';

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
	name: string;

	@Field()
	@Prop()
	date: Date;

	@Field()
	@Prop()
	estimate: boolean;

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
	company?: CompanyEntity[];

	@Field(() => String)
	@Prop({ type: () => String, ref: () => CompanyEntity })
	companyId: string;

	@Field()
	@Prop()
	currency: string;

	@Field()
	@Prop()
	execStart: Date;

	@Field()
	@Prop()
	execEnd: Date;

	@Field()
	@Prop()
	sent: boolean;

	@Field({ nullable: true })
	@Prop()
	paid: boolean;

	@Field({ nullable: true })
	@Prop()
	tax: boolean;

	@Field({ nullable: true })
	@Prop()
	taxMultiplier?: number;

	@Field(() => [MissionEntity], { defaultValue: [] })
	@Virtual()
	missions?: MissionEntity[];

	@Field(() => [String])
	@Prop()
	missionIds: string[];

	@Field(() => [InvoiceLineEntity])
	@Prop([InvoiceLineSchema])
	lines: InvoiceLineEntity[];
}

@InputType()
export class InvoiceCreate {
	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	date: Date;

	@Field()
	@Prop()
	estimate: boolean;

	@Field()
	@Prop()
	amount: number;

	@Field(() => String)
	@Prop({ type: () => String, ref: () => CompanyEntity })
	companyId: number;

	@Field()
	@Prop()
	currency: string;

	@Field()
	@Prop()
	execStart: Date;

	@Field()
	@Prop()
	execEnd: Date;

	@Field()
	@Prop()
	sent: boolean;

	@Field({ nullable: true })
	@Prop()
	paid?: boolean;

	@Field({ nullable: true })
	@Prop()
	tax: boolean;

	@Field({ nullable: true })
	@Prop()
	taxMultiplier?: number;

	@Field(() => [String])
	@Prop({ type: () => [String], ref: () => [MissionEntity] })
	missionIds: string[];

	@Field(() => [InvoiceLineEntitySave])
	@Prop(() => [InvoiceLineEntitySave])
	lines: InvoiceLineEntitySave[];
}

@InputType()
export class InvoiceUpdate {
	@Field()
	_id: string;

	@Field()
	@Prop()
	estimate: boolean;

	@Field()
	@Prop()
	amount: number;

	@Field()
	@Prop()
	currency: string;

	@Field()
	@Prop()
	execStart: Date;

	@Field()
	@Prop()
	execEnd: Date;

	@Field()
	@Prop()
	sent: boolean;

	@Field({ nullable: true })
	@Prop()
	paid?: boolean;

	@Field({ nullable: true })
	@Prop()
	tax: boolean;

	@Field({ nullable: true })
	@Prop()
	taxMultiplier?: number;

	@Field(() => [InvoiceLineEntitySave])
	@Prop(() => [InvoiceLineEntitySave])
	lines: InvoiceLineEntitySave[];
}

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);
