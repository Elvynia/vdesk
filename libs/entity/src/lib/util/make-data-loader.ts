import { IEntity } from "@lv/common";
import DataLoader from "dataloader";
import { UpdateQuery } from "mongoose";
import { EntityRepository } from "../entity.repository";


export function makeDataloader<
	Entity extends IEntity,
	CreateEntity = Entity,
	UpdateEntity extends UpdateQuery<Entity> = UpdateQuery<Entity>,
>(
	repository: EntityRepository<Entity, CreateEntity, UpdateEntity>
) {
	return new DataLoader<string, Entity>(
		async (keys) => {
			const results = await repository.getMapByIds(keys);
			return keys.map((k) => results[k] || new Error(`${k} not found`));
		}
	);
}
