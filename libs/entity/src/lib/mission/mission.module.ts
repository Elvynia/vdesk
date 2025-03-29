import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionResolver } from './mission.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionEntity, MissionSchema } from './mission.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: MissionEntity.name,
				schema: MissionSchema,
				collection: 'mission',
			},
		]),
	],
	providers: [MissionResolver, MissionService],
	exports: [MissionResolver, MissionService],
})
export class MissionModule {}
