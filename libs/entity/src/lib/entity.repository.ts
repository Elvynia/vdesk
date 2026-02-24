import { IEntity } from "@lv/common";
import { AnyKeys, Model, RootFilterQuery, UpdateQuery } from "mongoose";

export abstract class EntityRepository<
	Entity extends IEntity,
	CreateEntity = Entity,
	UpdateEntity extends UpdateQuery<Entity> = UpdateQuery<Entity>
> {

	protected abstract model: Model<Entity>;

	create(editEntity: CreateEntity) {
		return this.model.create(editEntity);
	}

	findAll(filter?: RootFilterQuery<Entity>) {
		let query;
		if (filter) {
			query = this.model
				.find(filter);
		} else {
			query = this.model
				.find();
		}
		return query
			.orFail()
			.exec();
	}

	findAllByIds(ids: string[]) {
		return this.model
			.find({
				_id: { $in: ids }
			})
			.orFail()
			.exec();
	}

	findOne(_id: string) {
		return this.model
			.findOne({ _id })
			// .orFail()
			.exec();
	}

	patch(_id: string, entity: AnyKeys<Entity>) {
		return this.model
			.findByIdAndUpdate(
				{ _id },
				{ $set: entity },
				{ new: true })
			.orFail()
			.exec();
	}

	update(_id: string, editEntity: UpdateEntity) {
		return this.model
			.findByIdAndUpdate({ _id }, editEntity, { new: true })
			.orFail()
			.exec();
	}

	remove(_id: string) {
		return this.model
			.findByIdAndDelete({ _id })
			.orFail()
			.exec();
	}
}
