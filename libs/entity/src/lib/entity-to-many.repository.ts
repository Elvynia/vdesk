import { IEntity } from "@lv/common";
import { UpdateQuery } from "mongoose";
import { EntityRepository } from "./entity.repository";

export interface EntityToManyRepository<
	Entity extends IEntity,
	CreateEntity = Entity,
	UpdateEntity extends UpdateQuery<Entity> = UpdateQuery<Entity>
> extends EntityRepository<Entity, CreateEntity, UpdateEntity> {
	findByParentIds(ids: readonly string[]): Promise<Entity[]>;
}
