import { HasMissionPubSub, mapEntityEntry, MissionActive, missionIsActive } from '@lv/common';
import {
	Args,
	Mutation,
	Query,
	Resolver,
	Subscription
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { MissionCreateEntity, MissionEntity, MissionEntityEntry, MissionPatchEntity } from './mission.entity';
import { MissionRepository } from './mission.repository';

@Resolver(() => MissionEntity)
export class MissionResolver {

	constructor(
		private readonly missionRepository: MissionRepository,
		private pubSub: PubSub<HasMissionPubSub>
	) { }

	@Mutation(() => MissionEntity)
	async createMission(
		@Args('createMissionInput') createMissionInput: MissionCreateEntity
	) {
		const mission = await this.missionRepository.create(createMissionInput);
		this.publishIfActive(mission);
		return mission;
	}

	@Query(() => [MissionEntity], { name: 'mission' })
	findAll() {
		return this.missionRepository.findAll();
	}

	@Subscription(() => [MissionEntityEntry], {
		name: 'missionActive'
	})
	async *listenActive(): AsyncGenerator<HasMissionPubSub> {
		const initialMissions = await this.missionRepository.findAllActive();
		yield { missionActive: initialMissions.map(mapEntityEntry) };

		const it = this.pubSub.asyncIterableIterator('missionActive') as
			AsyncIterableIterator<HasMissionPubSub['missionActive']>;
		try {
			for await (const payload of it) {
				yield { missionActive: payload };
			}
		} finally {
			if (it.return) {
				await it.return();
			}
		}
	}

	@Query(() => MissionEntity, { name: 'missionId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.missionRepository.findOne(id);
	}

	async publishIfActive(mission: string | MissionEntity, remove: boolean = false) {
		let payload = null;
		if (!remove) {
			const isActive = typeof mission === 'string'
				? await this.missionRepository.isActive(mission)
				: missionIsActive(mission);
			if (isActive) {
				payload = typeof mission === 'string' ? await this.findOne(mission) : mission;
			}
		}
		this.pubSub.publish('missionActive', [{
			key: typeof mission === 'string' ? mission : mission._id,
			value: payload as MissionActive
		}]);
	}

	@Mutation(() => MissionEntity)
	async patchMission(
		@Args('patchMissionInput') patchMissionInput: MissionPatchEntity
	) {
		const wasActive = await this.missionRepository.isActive(patchMissionInput._id) || false;
		const mission = await this.missionRepository.patch(
			patchMissionInput._id,
			patchMissionInput
		);
		this.publishIfActive(
			mission,
			wasActive && !missionIsActive(mission)
		);
		return mission;
	}

	@Mutation(() => MissionEntity)
	async removeMission(@Args('id', { type: () => String }) id: string) {
		const mission = await this.missionRepository.remove(id);
		this.publishIfActive(id, true);
		return mission;
	}
}
