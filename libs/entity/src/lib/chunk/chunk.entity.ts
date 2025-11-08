import { Chunk } from '@lv/common';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { MissionEntity } from '../mission/mission.entity';

@InputType('ChunkInput')
@ObjectType()
@Schema({
	toJSON: {
		virtuals: true,
	},
	toObject: {
		virtuals: true
	}
})
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
	desc: string;

	@Field({ defaultValue: false })
	@Prop()
	invoiced: boolean;

	@Field({ defaultValue: false })
	@Prop()
	paid: boolean;

	@Field(() => MissionEntity)
	@Virtual()
	mission?: MissionEntity;

	@Field()
	@Prop({ type: () => String, ref: () => MissionEntity })
	missionId: string;
}

@InputType()
export class ChunkCreate {
	@Field()
	@Prop()
	count: number;

	@Field()
	@Prop()
	date: Date;

	@Field({ nullable: true })
	@Prop()
	desc: string;

	@Field({ defaultValue: false })
	@Prop()
	invoiced: boolean;

	@Field({ defaultValue: false })
	@Prop()
	paid: boolean;

	@Field()
	@Prop({ type: () => String, ref: () => MissionEntity })
	missionId: string;
}

@InputType()
export class ChunkUpdate {
	@Field()
	_id: string;

	@Field()
	@Prop()
	count: number;

	@Field()
	@Prop()
	date: Date;

	@Field()
	@Prop()
	desc: string;

	@Field({ defaultValue: false })
	@Prop()
	invoiced: boolean;

	@Field({ defaultValue: false })
	@Prop()
	paid: boolean;

	@Field()
	@Prop({ type: () => String, ref: () => MissionEntity })
	missionId: string;
}

export const ChunkSchema = SchemaFactory.createForClass(ChunkEntity);
