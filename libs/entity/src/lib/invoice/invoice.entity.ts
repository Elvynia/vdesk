import { Invoice } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { InvoiceLineEntity } from '../invoice-line/invoice-line.entity';
import { MissionEntity } from '../mission/mission.entity';

@InputType('InvoiceInput')
@ObjectType()
@Schema()
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

	@Field()
	@Prop({ type: () => String, ref: () => MissionEntity })
	missionId: string;

	@Field(() => [InvoiceLineEntity])
	@Prop({ type: () => String, ref: () => [InvoiceLineEntity] })
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

	@Field()
	@Prop({ type: () => String, ref: () => MissionEntity })
	missionId: string;

	@Field(() => [InvoiceLineEntity])
	@Prop({ type: () => String, ref: () => [InvoiceLineEntity] })
	lines: InvoiceLineEntity[];
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

	@Field(() => [InvoiceLineEntity])
	@Prop({ type: () => String, ref: () => [InvoiceLineEntity] })
	lines: InvoiceLineEntity[];
}

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);
