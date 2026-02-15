import { HasMissionPubSub, missionIsActive } from '@lv/common';
import {
	Args,
	Mutation,
	Query,
	Resolver,
	Subscription
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { MissionCreate, MissionEntity, MissionUpdate } from './mission.entity';
import { MissionRepository } from './mission.repository';

@Resolver(() => MissionEntity)
export class MissionResolver {

	constructor(
		private readonly missionRepository: MissionRepository,
		private pubSub: PubSub<HasMissionPubSub>
	) { }

	@Mutation(() => MissionEntity)
	async createMission(
		@Args('createMissionInput') createMissionInput: MissionCreate
	) {
		const mission = await this.missionRepository.create(createMissionInput);
		this.publishIfActive(mission);
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
		for await (const payload of this.pubSub.asyncIterableIterator('listenActive')) {
			yield { listenActive: payload._id ? [payload] : payload };
		}
	}

	@Query(() => MissionEntity, { name: 'missionId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.missionRepository.findOne(id);
	}

	async publishIfActive(mission: string | MissionEntity) {
		const isActive = typeof mission === 'string'
			? await this.missionRepository.isActive(mission)
			: missionIsActive(mission);
		if (isActive) {
			const payload = typeof mission === 'string' ? await this.findOne(mission) : mission;
			this.pubSub.publish('listenActive', payload!);
		}
	}

	@Mutation(() => MissionEntity)
	async updateMission(
		@Args('updateMissionInput') updateMissionInput: MissionUpdate
	) {
		const wasActive = await this.missionRepository.isActive(updateMissionInput._id);
		const mission = await this.missionRepository.update(
			updateMissionInput._id,
			updateMissionInput
		);
		if (wasActive && mission) {
			this.publishIfActive(mission);
		}
		return mission;
	}

	@Mutation(() => MissionEntity)
	async removeMission(@Args('id', { type: () => String }) id: string) {
		const mission = await this.missionRepository.remove(id);
		mission && this.publishIfActive(id);
		return mission;
	}
}
