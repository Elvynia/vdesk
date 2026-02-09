import {
	Args,
	Context,
	Mutation,
	Query,
	Resolver,
	Subscription
} from '@nestjs/graphql';
import { PubSub } from 'mercurius';
import { MissionCreate, MissionEntity, MissionUpdate } from './mission.entity';
import { MissionRepository } from './mission.repository';

@Resolver(() => MissionEntity)
export class MissionResolver {
	readonly topicActive = 'activeMissions';

	constructor(private readonly missionRepository: MissionRepository) { }

	@Mutation(() => MissionEntity)
	async createMission(
		@Context('pubsub') pubSub: PubSub,
		@Args('createMissionInput') createMissionInput: MissionCreate
	) {
		const mission = await this.missionRepository.create(createMissionInput);
		pubSub.publish({
			topic: this.topicActive,
			payload: {
				listenActive: [mission]
			}
		});
		return mission;
	}

	@Query(() => [MissionEntity], { name: 'mission' })
	findAll() {
		return this.missionRepository.findAll();
	}

	@Query(() => [MissionEntity], { name: 'missionActive' })
	findAllActive() {
		return this.missionRepository.findAllActive();
	}

	@Subscription(() => [MissionEntity])
	async listenActive(
		@Context('pubsub') pubSub: PubSub
	) {
		const missions = await this.missionRepository.findAllActive();
		process.nextTick(() => pubSub.publish({
			topic: this.topicActive,
			payload: {
				listenActive: missions
			}
		}));

		return pubSub.subscribe(this.topicActive);
	}

	@Query(() => MissionEntity, { name: 'missionId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.missionRepository.findOne(id);
	}

	@Mutation(() => MissionEntity)
	async updateMission(
		@Context('pubsub') pubSub: PubSub,
		@Args('updateMissionInput') updateMissionInput: MissionUpdate
	) {
		const mission = await this.missionRepository.update(
			updateMissionInput._id,
			updateMissionInput
		);
		pubSub.publish({
			topic: this.topicActive,
			payload: {
				listenActive: [mission]
			}
		});
		return mission;
	}

	@Mutation(() => MissionEntity)
	removeMission(@Args('id', { type: () => String }) id: string) {
		return this.missionRepository.remove(id);
	}
}
