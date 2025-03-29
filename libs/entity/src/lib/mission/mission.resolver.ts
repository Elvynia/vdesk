import {
	Resolver,
	Query,
	Mutation,
	Args,
	Parent,
	ResolveField,
} from '@nestjs/graphql';
import { MissionService } from './mission.service';
import { MissionEntity, MissionCreate, MissionUpdate } from './mission.entity';

@Resolver(() => MissionEntity)
export class MissionResolver {
	constructor(private readonly missionService: MissionService) {}

	@Mutation(() => MissionEntity)
	createMission(
		@Args('createMissionInput') createMissionInput: MissionCreate
	) {
		return this.missionService.create(createMissionInput);
	}

	@Query(() => [MissionEntity], { name: 'mission' })
	findAll() {
		return this.missionService.findAll();
	}

	@Query(() => MissionEntity, { name: 'missionId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.missionService.findOne(id);
	}

	@Mutation(() => MissionEntity)
	updateMission(
		@Args('updateMissionInput') updateMissionInput: MissionUpdate
	) {
		return this.missionService.update(
			updateMissionInput._id,
			updateMissionInput
		);
	}

	@Mutation(() => MissionEntity)
	removeMission(@Args('id', { type: () => String }) id: string) {
		return this.missionService.remove(id);
	}
}
