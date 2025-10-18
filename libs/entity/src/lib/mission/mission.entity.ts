import { Mission } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { ChunkEntity } from '../chunk/chunk.entity';
import { CompanyTypeEntity } from '../company-type/company-type.entity';

@InputType('MissionInput')
@ObjectType()
@Schema({
	toJSON: {
		virtuals: true,
	},
	toObject: {
		virtuals: true
	}
})
export class MissionEntity implements Mission {
	@Field()
	_id: string;

	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	rate: number;

	@Field({ nullable: true })
	@Prop()
	byDay?: boolean;

	@Field({ nullable: true })
	@Prop({ default: 7 })
	dayLength?: number;

	@Field({ nullable: true })
	@Prop()
	start?: Date;

	@Field({ nullable: true })
	@Prop()
	end?: Date;

	@Field({ nullable: true })
	@Prop()
	desc?: string;

	@Field(() => [ChunkEntity], { defaultValue: [] })
	@Virtual()
	chunks: ChunkEntity[];
}

@InputType()
export class MissionCreate {
	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	rate: number;

	@Field({ nullable: true })
	@Prop()
	byDay?: boolean;

	@Field({ nullable: true })
	@Prop()
	dayLength?: number;

	@Field({ nullable: true })
	@Prop()
	start?: Date;

	@Field({ nullable: true })
	@Prop()
	end?: Date;

	@Field({ nullable: true })
	@Prop()
	desc?: string;
}

@InputType()
export class MissionUpdate {
	@Field()
	_id: string;

	@Field()
	@Prop()
	name: string;

	@Field()
	@Prop()
	rate: number;

	@Field({ nullable: true })
	@Prop()
	byDay?: boolean;

	@Field({ nullable: true })
	@Prop()
	dayLength?: number;

	@Field({ nullable: true })
	@Prop()
	start?: Date;

	@Field({ nullable: true })
	@Prop()
	end?: Date;

	@Field({ nullable: true })
	@Prop()
	desc?: string;
}

export const MissionSchema = SchemaFactory.createForClass(MissionEntity);
