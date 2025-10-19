import {
	Args,
	Mutation,
	Query,
	Resolver
} from '@nestjs/graphql';
import { MissionCreate, MissionEntity, MissionUpdate } from './mission.entity';
import { MissionRepository } from './mission.repository';

@Resolver(() => MissionEntity)
export class MissionResolver {
	constructor(private readonly missionRepository: MissionRepository) { }

	@Mutation(() => MissionEntity)
	createMission(
		@Args('createMissionInput') createMissionInput: MissionCreate
	) {
		return this.missionRepository.create(createMissionInput);
	}

	@Query(() => [MissionEntity], { name: 'mission' })
	findAll() {
		return this.missionRepository.findAll();
	}

	@Query(() => [MissionEntity], { name: 'missionActive' })
	findAllActive() {
		const now = new Date();
		return this.missionRepository.findAll({
			start: { $lt: now },
			$or: [{
				end: {
					$eq: null
				}
			}, {
				end: {
					$gt: now
				}
			}]
		});
	}

	@Query(() => MissionEntity, { name: 'missionId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.missionRepository.findOne(id);
	}

	@Mutation(() => MissionEntity)
	updateMission(
		@Args('updateMissionInput') updateMissionInput: MissionUpdate
	) {
		return this.missionRepository.update(
			updateMissionInput._id,
			updateMissionInput
		);
	}

	@Mutation(() => MissionEntity)
	removeMission(@Args('id', { type: () => String }) id: string) {
		return this.missionRepository.remove(id);
	}
}
