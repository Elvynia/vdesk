import {
	Args,
	Mutation,
	Query,
	Resolver,
	Subscription
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { MissionCreate, MissionEntity, MissionUpdate } from './mission.entity';
import { HasMissionPubSub } from './mission.pubsub';
import { MissionRepository } from './mission.repository';

@Resolver(() => MissionEntity)
export class MissionResolver {
	readonly topicActive = 'listenActive';

	constructor(
		private readonly missionRepository: MissionRepository,
		private pubSub: PubSub<HasMissionPubSub>
	) { }

	@Mutation(() => MissionEntity)
	async createMission(
		@Args('createMissionInput') createMissionInput: MissionCreate
	) {
		const mission = await this.missionRepository.create(createMissionInput);
		// if (isActive) {
		this.pubSub.publish(this.topicActive, await this.findAllActive());
		// }
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
	async *listenActive() {
		const initialMissions = await this.missionRepository.findAllActive();
		yield { listenActive: initialMissions };

		// @ts-expect-error - graphql-subscriptions has incorrect throw() signature
		yield* this.pubSub.asyncIterableIterator(this.topicActive);
	}

	@Query(() => MissionEntity, { name: 'missionId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.missionRepository.findOne(id);
	}

	@Mutation(() => MissionEntity)
	async updateMission(
		@Args('updateMissionInput') updateMissionInput: MissionUpdate
	) {
		const mission = await this.missionRepository.update(
			updateMissionInput._id,
			updateMissionInput
		);
		// if (wasActive || isActive) {
		this.pubSub.publish(this.topicActive, await this.findAllActive());
		// }
		return mission;
	}

	@Mutation(() => MissionEntity)
	async removeMission(@Args('id', { type: () => String }) id: string) {
		const isActive = await this.missionRepository.isActive(id);
		const removed = this.missionRepository.remove(id);
		if (isActive) {
			this.pubSub.publish(this.topicActive, await this.findAllActive());
		}
		return removed;
	}
}
