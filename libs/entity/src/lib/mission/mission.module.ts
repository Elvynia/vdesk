import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionEntity, MissionSchema } from './mission.entity';
import { MissionResolver } from './mission.resolver';
import { MissionService } from './mission.service';

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
