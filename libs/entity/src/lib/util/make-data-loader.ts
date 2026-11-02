import { IEntity, reduceMapArray, StringKeys } from "@lv/common";
import DataLoader from "dataloader";
import { UpdateQuery } from "mongoose";
import { EntityToManyRepository } from "../entity-to-many.repository";
import { EntityRepository } from "../entity.repository";
import { EntityOf } from "./entity-of";


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

export function makeDataloaderToMany<
	Repository extends EntityToManyRepository<any>,
	ParentKey extends StringKeys<EntityOf<Repository>> = StringKeys<EntityOf<Repository>>,
>(
	repository: Repository,
	parentIdKey: ParentKey,
	defaultValue: any = []
) {
	return new DataLoader<string, Record<ParentKey, string>[]>(
		async (keys) => {
			const results = (await repository.findByParentIds(keys)).reduce(
				reduceMapArray(parentIdKey),
				new Map<string, Record<ParentKey, string>[]>()
			);
			return keys.map((k) => results.get(k) || defaultValue);
		},
		{
			cache: false
		}
	)
}
